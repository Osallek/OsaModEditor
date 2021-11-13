package fr.osallek.osamodeditor.service;

import fr.osallek.clausewitzparser.model.ClausewitzObject;
import fr.osallek.clausewitzparser.parser.ClausewitzParser;
import fr.osallek.eu4parser.common.Eu4Utils;
import fr.osallek.eu4parser.common.ModNotFoundException;
import fr.osallek.eu4parser.common.ZipUtils;
import fr.osallek.eu4parser.model.Mod;
import fr.osallek.eu4parser.model.ModType;
import fr.osallek.eu4parser.model.game.FileNode;
import fr.osallek.eu4parser.model.game.Game;
import fr.osallek.eu4parser.model.game.Nodded;
import fr.osallek.osamodeditor.common.Constants;
import fr.osallek.osamodeditor.common.exception.DescriptorFileFoundException;
import fr.osallek.osamodeditor.config.OsaModEditorConfig;
import fr.osallek.osamodeditor.config.properties.ApplicationProperties;
import fr.osallek.osamodeditor.dto.GameDTO;
import fr.osallek.osamodeditor.dto.GameInitDTO;
import fr.osallek.osamodeditor.dto.ModDTO;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.text.Normalizer;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.SortedSet;
import java.util.TreeSet;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class GameService {

    private static final Logger LOGGER = LoggerFactory.getLogger(GameService.class);

    private static final AtomicInteger GAME_PROGRESS = new AtomicInteger(0);

    private static final int MAX_PROGRESS = 98;

    private final ApplicationProperties properties;

    private Game game = null;

    private Path tmpModPath = null;

    public GameService(ApplicationProperties properties) {
        this.properties = properties;
    }

    public Game getGame() {
        return game;
    }

    public Mod getMod() {
        return this.game.getMods().get(0);
    }

    public Path getTmpModPath() {
        return tmpModPath;
    }

    public GameInitDTO getInit() {
        return new GameInitDTO(Eu4Utils.detectInstallationFolder().map(File::getAbsolutePath).orElse(null),
                               Eu4Utils.detectMods().stream().map(ModDTO::new).collect(Collectors.toCollection(TreeSet::new)),
                               this.properties.getVersion());
    }

    public GameInitDTO copyMod(String modFileName) throws IOException {
        List<Mod> mods = Eu4Utils.detectMods();

        if (StringUtils.isBlank(modFileName) || CollectionUtils.isEmpty(mods)) {
            throw new ModNotFoundException(modFileName);
        }

        Optional<Mod> optionalMod = mods.stream().filter(m -> modFileName.equals(m.getFile().getName())).findFirst();

        if (optionalMod.isEmpty() || ModType.LOCAL.equals(optionalMod.get().getType())) {
            throw new ModNotFoundException(modFileName);
        }

        Mod mod = optionalMod.get();

        String fileName = Normalizer.normalize(mod.getName(), Normalizer.Form.NFD)
                                    .replaceAll("[^\\p{ASCII}]", "")
                                    .replaceAll("[^a-zA-Z0-9.-]", "_")
                                    .toLowerCase(Locale.ENGLISH);
        Path newFolder = Eu4Utils.MODS_FOLDER.toPath().resolve(fileName);
        Path newModFile = Eu4Utils.MODS_FOLDER.toPath().resolve(fileName + ".mod");

        FileUtils.forceMkdir(newFolder.toFile());
        FileUtils.cleanDirectory(newFolder.toFile());

        if (mod.getType() == ModType.STEAM) {
            FileUtils.copyDirectory(mod.getPath().toFile(), newFolder.toFile(), false);
        } else if (mod.getType() == ModType.PDX) {
            ZipUtils.unzip(mod.getArchive(), newFolder);
        }

        AtomicReference<File> descriptorFile = new AtomicReference<>(newFolder.resolve(Eu4Utils.DESCRIPTOR_FILE).toFile());

        if (!descriptorFile.get().exists()) {
            try (Stream<Path> stream = Files.list(newFolder)) {
                stream.filter(file -> file.toFile().canRead())
                      .filter(file -> !file.toFile().isDirectory())
                      .filter(file -> file.getFileName().toString().endsWith(".mod"))
                      .findFirst()
                      .ifPresentOrElse(path -> descriptorFile.set(path.toFile()), () -> descriptorFile.set(null));
            }
        }

        if (descriptorFile.get() == null) {
            throw new DescriptorFileFoundException(modFileName);
        }

        FileUtils.copyFile(descriptorFile.get(), newModFile.toFile());

        Mod newMod = new Mod(newModFile.toFile(), ClausewitzParser.parse(newModFile.toFile(), 0));
        newMod.setPath("mod/" + fileName);
        newMod.save();

        return new GameInitDTO(Eu4Utils.detectInstallationFolder().map(File::getAbsolutePath).orElse(null),
                               Eu4Utils.detectMods().stream().map(ModDTO::new).collect(Collectors.toCollection(TreeSet::new)),
                               this.properties.getVersion());
    }

    public GameDTO parseGame(String installFolder, String mod) throws IOException {
        GAME_PROGRESS.set(0);
        this.game = new Game(installFolder, List.of(mod), GAME_PROGRESS::getAndIncrement);

        this.tmpModPath = Constants.EDITOR_DOCUMENTS_FOLDER.resolve(FilenameUtils.removeExtension(getMod().getFile().getName())).toAbsolutePath();
        FileUtils.forceMkdir(this.tmpModPath.toFile());
        OsaModEditorConfig.addPathToDelete(this.tmpModPath);

        GameDTO gameDTO = new GameDTO(this.game, this.tmpModPath.getFileName().toString(), GAME_PROGRESS::getAndIncrement);

        this.game.convertImages(this.tmpModPath, Eu4Utils.FLAGS_GFX, Eu4Utils.MISSIONS_GFX, Eu4Utils.ADVISORS_GFX);
        GAME_PROGRESS.getAndIncrement();

        GAME_PROGRESS.set(MAX_PROGRESS);

        return gameDTO;
    }

    public GameDTO changeDefines(Map<String, Map<String, String>> defines) throws IOException {
        defines.forEach((category, values) -> values.forEach((key, value) -> this.game.changeDefine(getMod(), category, key, value)));
        this.game.saveDefines(getMod());

        return new GameDTO(this.game, this.tmpModPath.getFileName().toString());
    }

    public int getGameProgress() {
        return GAME_PROGRESS.get() * 100 / MAX_PROGRESS;
    }

    public void writeNodded(Set<? extends Nodded> modified, Collection<? extends Nodded> all) throws IOException {
        writeNodded(modified, all, null);
    }

    public void writeNodded(Set<? extends Nodded> modified, Collection<? extends Nodded> all, Collection<ClausewitzObject> after) throws IOException {
        if (CollectionUtils.isEmpty(modified)) {
            return;
        }

        Set<FileNode> fileModified = modified.stream().map(Nodded::getFileNode).collect(Collectors.toSet());
        Set<Nodded> toWrite = all.stream().filter(nodded -> fileModified.contains(nodded.getFileNode())).collect(Collectors.toSet());
        toWrite.addAll(modified);

        Map<FileNode, SortedSet<Nodded>> nodes = toWrite.stream()
                                                        .collect(Collectors.groupingBy(Nodded::getFileNode, Collectors.toCollection(TreeSet::new)));

        nodes.keySet().forEach(fileNode -> {
            if (!getMod().equals(fileNode.getMod())) {
                fileNode.setMod(getMod());
            }
        });

        for (Map.Entry<FileNode, SortedSet<Nodded>> entry : nodes.entrySet()) {
            FileUtils.forceMkdirParent(entry.getKey().getPath().toFile());

            try (BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(entry.getKey().getPath().toFile()))) {
                for (Nodded nodded : entry.getValue()) {
                    nodded.write(bufferedWriter);
                    bufferedWriter.newLine();
                    bufferedWriter.newLine();
                }

                if (CollectionUtils.isNotEmpty(after)) {
                    for (ClausewitzObject object : after) {
                        object.write(bufferedWriter, 0, new HashMap<>());
                        bufferedWriter.newLine();
                        bufferedWriter.newLine();
                    }
                }
            } catch (IOException e) {
                LOGGER.error("An error occurred while writing nodes to {}: {}!", entry.getKey(), e.getMessage(), e);
                throw e;
            }
        }
    }
}

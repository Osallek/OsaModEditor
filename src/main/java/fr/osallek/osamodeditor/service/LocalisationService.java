package fr.osallek.osamodeditor.service;

import fr.osallek.eu4parser.common.Eu4Utils;
import fr.osallek.eu4parser.model.game.FileNode;
import fr.osallek.eu4parser.model.game.Game;
import fr.osallek.eu4parser.model.game.localisation.Eu4Language;
import fr.osallek.eu4parser.model.game.localisation.Localisation;
import fr.osallek.osamodeditor.common.exception.LocalisationNotFoundException;
import fr.osallek.osamodeditor.dto.GameDTO;
import fr.osallek.osamodeditor.dto.LocalisedDTO;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Collection;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.SortedSet;
import java.util.TreeSet;
import java.util.stream.Collectors;

@Service
public class LocalisationService {

    private static final Logger LOGGER = LoggerFactory.getLogger(LocalisationService.class);

    private final GameService gameService;

    public LocalisationService(GameService gameService) {
        this.gameService = gameService;
    }

    public GameDTO missing() throws IOException {
        Game game = this.gameService.getGame();

        Map<Eu4Language, List<String>> missingKeys = new EnumMap<>(Eu4Language.class);
        for (Eu4Language language : Eu4Language.values()) {
            missingKeys.put(language, new ArrayList<>());
        }

        game.getLocalisations().forEach((key, languages) -> {
            for (Eu4Language language : Eu4Language.values()) {
                if (!languages.containsKey(language)) {
                    missingKeys.get(language).add(key);
                }
            }
        });

        for (Map.Entry<Eu4Language, List<String>> entry : missingKeys.entrySet()) {
            LOGGER.info("{}: {}", entry.getKey(), entry.getValue().size());

            writeLocalisations(new FileNode(this.gameService.getMod(),
                                            Path.of(Eu4Utils.LOCALISATION_FOLDER_PATH, "ome_missing" + "_" + entry.getKey().fileEndWith + ".yml")),
                               entry.getKey(),
                               entry.getValue()
                                    .stream()
                                    .map(key -> new Localisation(key, entry.getKey(), "0", ""))
                                    .sorted()
                                    .toList());
        }

        return new GameDTO(game, this.gameService.getTmpModPath().getFileName().toString());
    }

    public GameDTO edit(String key, LocalisedDTO body) throws IOException {
        Game game = this.gameService.getGame();

        Map<Eu4Language, Localisation> localisationMap = game.getLocalisations().get(key);

        if (localisationMap == null) {
            throw new LocalisationNotFoundException(key);
        }

        Map<Eu4Language, Localisation> modified = new EnumMap<>(Eu4Language.class);

        if (localisationMap.containsKey(Eu4Language.ENGLISH)) {
            if (!StringUtils.equals(localisationMap.get(Eu4Language.ENGLISH).getValue(), body.getEnglish())) {
                localisationMap.get(Eu4Language.ENGLISH).setValue(StringUtils.defaultIfBlank(body.getEnglish(), ""));
                modified.put(Eu4Language.ENGLISH, localisationMap.get(Eu4Language.ENGLISH));
            }
        } else if (StringUtils.isNotBlank(body.getEnglish())) {
            FileNode fileNode;
            String fileName;

            if (localisationMap.containsKey(Eu4Language.FRENCH)) {
                fileNode = localisationMap.get(Eu4Language.FRENCH).getFileNode();
                fileName = fileNode.getRelativePath().getFileName().toString().replace(Eu4Language.FRENCH.fileEndWith, Eu4Language.ENGLISH.fileEndWith);
            } else if (localisationMap.containsKey(Eu4Language.SPANISH)) {
                fileNode = localisationMap.get(Eu4Language.SPANISH).getFileNode();
                fileName = fileNode.getRelativePath().getFileName().toString().replace(Eu4Language.SPANISH.fileEndWith, Eu4Language.ENGLISH.fileEndWith);
            } else {
                fileNode = localisationMap.get(Eu4Language.GERMAN).getFileNode();
                fileName = fileNode.getRelativePath().getFileName().toString().replace(Eu4Language.GERMAN.fileEndWith, Eu4Language.ENGLISH.fileEndWith);
            }

            FileNode other;

            if (fileNode.getMod() != null) {
                other = new FileNode(fileNode.getMod(),
                                     fileNode.getRelativePath()
                                             .subpath(0, fileNode.getRelativePath().getNameCount() - 1)
                                             .resolve(fileName));
            } else {
                other = new FileNode(game.getLauncherSettings().getGameFolderPath(),
                                     fileNode.getRelativePath()
                                             .subpath(0, fileNode.getRelativePath().getNameCount() - 1)
                                             .resolve(fileName));
            }

            modified.put(Eu4Language.ENGLISH, new Localisation(other, key, Eu4Language.ENGLISH, "0", body.getEnglish()));
        }

        if (localisationMap.containsKey(Eu4Language.FRENCH)) {
            if (!StringUtils.equals(localisationMap.get(Eu4Language.FRENCH).getValue(), body.getFrench())) {
                localisationMap.get(Eu4Language.FRENCH).setValue(StringUtils.defaultIfBlank(body.getFrench(), ""));
                modified.put(Eu4Language.FRENCH, localisationMap.get(Eu4Language.FRENCH));
            }
        } else if (StringUtils.isNotBlank(body.getFrench())) {
            FileNode fileNode;
            String fileName;

            if (localisationMap.containsKey(Eu4Language.ENGLISH)) {
                fileNode = localisationMap.get(Eu4Language.ENGLISH).getFileNode();
                fileName = fileNode.getRelativePath().getFileName().toString().replace(Eu4Language.ENGLISH.fileEndWith, Eu4Language.FRENCH.fileEndWith);
            } else if (localisationMap.containsKey(Eu4Language.SPANISH)) {
                fileNode = localisationMap.get(Eu4Language.SPANISH).getFileNode();
                fileName = fileNode.getRelativePath().getFileName().toString().replace(Eu4Language.SPANISH.fileEndWith, Eu4Language.FRENCH.fileEndWith);
            } else {
                fileNode = localisationMap.get(Eu4Language.GERMAN).getFileNode();
                fileName = fileNode.getRelativePath().getFileName().toString().replace(Eu4Language.GERMAN.fileEndWith, Eu4Language.FRENCH.fileEndWith);
            }

            FileNode other;

            if (fileNode.getMod() != null) {
                other = new FileNode(fileNode.getMod(),
                                     fileNode.getRelativePath()
                                             .subpath(0, fileNode.getRelativePath().getNameCount() - 1)
                                             .resolve(fileName));
            } else {
                other = new FileNode(game.getLauncherSettings().getGameFolderPath(),
                                     fileNode.getRelativePath()
                                             .subpath(0, fileNode.getRelativePath().getNameCount() - 1)
                                             .resolve(fileName));
            }

            modified.put(Eu4Language.FRENCH, new Localisation(other, key, Eu4Language.FRENCH, "0", body.getFrench()));
        }

        if (localisationMap.containsKey(Eu4Language.SPANISH)) {
            if (!StringUtils.equals(localisationMap.get(Eu4Language.SPANISH).getValue(), body.getSpanish())) {
                localisationMap.get(Eu4Language.SPANISH).setValue(StringUtils.defaultIfBlank(body.getSpanish(), ""));
                modified.put(Eu4Language.SPANISH, localisationMap.get(Eu4Language.SPANISH));
            }
        } else if (StringUtils.isNotBlank(body.getSpanish())) {
            FileNode fileNode;
            String fileName;

            if (localisationMap.containsKey(Eu4Language.FRENCH)) {
                fileNode = localisationMap.get(Eu4Language.FRENCH).getFileNode();
                fileName = fileNode.getRelativePath().getFileName().toString().replace(Eu4Language.FRENCH.fileEndWith, Eu4Language.SPANISH.fileEndWith);
            } else if (localisationMap.containsKey(Eu4Language.ENGLISH)) {
                fileNode = localisationMap.get(Eu4Language.ENGLISH).getFileNode();
                fileName = fileNode.getRelativePath().getFileName().toString().replace(Eu4Language.ENGLISH.fileEndWith, Eu4Language.SPANISH.fileEndWith);
            } else {
                fileNode = localisationMap.get(Eu4Language.GERMAN).getFileNode();
                fileName = fileNode.getRelativePath().getFileName().toString().replace(Eu4Language.GERMAN.fileEndWith, Eu4Language.SPANISH.fileEndWith);
            }

            FileNode other;

            if (fileNode.getMod() != null) {
                other = new FileNode(fileNode.getMod(),
                                     fileNode.getRelativePath()
                                             .subpath(0, fileNode.getRelativePath().getNameCount() - 1)
                                             .resolve(fileName));
            } else {
                other = new FileNode(game.getLauncherSettings().getGameFolderPath(),
                                     fileNode.getRelativePath()
                                             .subpath(0, fileNode.getRelativePath().getNameCount() - 1)
                                             .resolve(fileName));
            }

            modified.put(Eu4Language.SPANISH, new Localisation(other, key, Eu4Language.SPANISH, "0", body.getSpanish()));
        }

        if (localisationMap.containsKey(Eu4Language.GERMAN)) {
            if (!StringUtils.equals(localisationMap.get(Eu4Language.GERMAN).getValue(), body.getGerman())) {
                localisationMap.get(Eu4Language.GERMAN).setValue(StringUtils.defaultIfBlank(body.getGerman(), ""));
                modified.put(Eu4Language.GERMAN, localisationMap.get(Eu4Language.GERMAN));
            }
        } else if (StringUtils.isNotBlank(body.getGerman())) {
            FileNode fileNode;
            String fileName;

            if (localisationMap.containsKey(Eu4Language.FRENCH)) {
                fileNode = localisationMap.get(Eu4Language.FRENCH).getFileNode();
                fileName = fileNode.getRelativePath().getFileName().toString().replace(Eu4Language.FRENCH.fileEndWith, Eu4Language.GERMAN.fileEndWith);
            } else if (localisationMap.containsKey(Eu4Language.ENGLISH)) {
                fileNode = localisationMap.get(Eu4Language.ENGLISH).getFileNode();
                fileName = fileNode.getRelativePath().getFileName().toString().replace(Eu4Language.ENGLISH.fileEndWith, Eu4Language.GERMAN.fileEndWith);
            } else {
                fileNode = localisationMap.get(Eu4Language.SPANISH).getFileNode();
                fileName = fileNode.getRelativePath().getFileName().toString().replace(Eu4Language.SPANISH.fileEndWith, Eu4Language.GERMAN.fileEndWith);
            }

            FileNode other;

            if (fileNode.getMod() != null) {
                other = new FileNode(fileNode.getMod(),
                                     fileNode.getRelativePath()
                                             .subpath(0, fileNode.getRelativePath().getNameCount() - 1)
                                             .resolve(fileName));
            } else {
                other = new FileNode(game.getLauncherSettings().getGameFolderPath(),
                                     fileNode.getRelativePath()
                                             .subpath(0, fileNode.getRelativePath().getNameCount() - 1)
                                             .resolve(fileName));
            }

            modified.put(Eu4Language.GERMAN, new Localisation(other, key, Eu4Language.GERMAN, "0", body.getGerman()));
        }

        modified.values().forEach(localisation -> {
            if (!this.gameService.getMod().equals(localisation.getFileNode().getMod())) {
                localisation.setFileNode(new FileNode(this.gameService.getMod(),
                                                      localisation.getFileNode().getRelativePath()
                                                                  .subpath(0, localisation.getFileNode().getRelativePath().getNameCount() - 1)
                                                                  .resolve(game.getNativeLocalisations().contains(key) ? "replace" : "")
                                                                  .resolve(localisation.getFileNode().getRelativePath().getFileName())));
            }
        });

        writeLocalisations(modified.values(), game.getAllLocalisations());

        return new GameDTO(game, this.gameService.getTmpModPath().getFileName().toString());
    }

    private void writeLocalisations(Collection<Localisation> modified, List<Localisation> all) throws IOException {
        if (CollectionUtils.isEmpty(modified)) {
            return;
        }

        Set<FileNode> fileModified = modified.stream().map(Localisation::getFileNode).collect(Collectors.toSet());
        Set<Localisation> toWrite = all.stream().filter(nodded -> fileModified.contains(nodded.getFileNode())).collect(Collectors.toSet());
        toWrite.addAll(modified);

        Map<FileNode, SortedSet<Localisation>> nodes = toWrite.stream()
                                                              .collect(Collectors.groupingBy(Localisation::getFileNode, Collectors.toCollection(TreeSet::new)));

        nodes.keySet().forEach(fileNode -> {
            if (!this.gameService.getMod().equals(fileNode.getMod())) {
                fileNode.setMod(this.gameService.getMod());
            }
        });

        for (Map.Entry<FileNode, SortedSet<Localisation>> entry : nodes.entrySet()) {
            writeLocalisations(entry.getKey(), entry.getValue().first().getEu4Language(), entry.getValue().stream().sorted().collect(Collectors.toList()));
        }
    }

    private void writeLocalisations(FileNode fileNode, Eu4Language language, List<Localisation> localisations) throws IOException {
        if (CollectionUtils.isNotEmpty(localisations)) {
            FileUtils.forceMkdirParent(fileNode.getPath().toFile());
            try (BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(fileNode.getPath().toFile()))) {
                bufferedWriter.write('\ufeff');
                bufferedWriter.write(language.fileEndWith + ":");
                bufferedWriter.newLine();

                for (Localisation localisation : localisations) {
                    localisation.write(bufferedWriter);
                    bufferedWriter.newLine();
                }
            } catch (IOException e) {
                LOGGER.error("An error occurred while writing localisations to {}: {}!", fileNode, e.getMessage(), e);
                throw e;
            }
        }

        localisations.forEach(localisation -> this.gameService.getGame().addLocalisation(localisation));
    }
}

package fr.osallek.osamodeditor.service;

import fr.osallek.eu4parser.common.Eu4Utils;
import fr.osallek.eu4parser.model.game.FileNode;
import fr.osallek.eu4parser.model.game.Game;
import fr.osallek.eu4parser.model.game.localisation.Eu4Language;
import fr.osallek.eu4parser.model.game.localisation.Localisation;
import fr.osallek.osamodeditor.common.exception.LocalisationNotFoundException;
import fr.osallek.osamodeditor.dto.GameDTO;
import fr.osallek.osamodeditor.dto.LocalisedDTO;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.SortedSet;
import java.util.TreeSet;
import java.util.stream.Collectors;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

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

            writeLocalisations("ome_missing", false, entry.getKey(),
                               entry.getValue().stream()
                                    .map(key -> new Localisation(key, entry.getKey(), "0", ""))
                                    .sorted()
                                    .collect(Collectors.toList()));
        }

        return new GameDTO(game, this.gameService.getTmpModPath().getFileName().toString());
    }

    public GameDTO edit(String key, LocalisedDTO body) {
        Game game = this.gameService.getGame();

        if (!game.getLocalisations().containsKey(key)) {
            throw new LocalisationNotFoundException(key);
        }

        return new GameDTO(game, this.gameService.getTmpModPath().getFileName().toString());
    }

    private void writeLocalisations(List<Localisation> modified, List<Localisation> all) throws IOException {
        if (CollectionUtils.isEmpty(modified)) {
            return;
        }

        Set<FileNode> fileModified = modified.stream().map(Localisation::getFileNode).collect(Collectors.toSet());
        List<Localisation> toWrite = all.stream().filter(nodded -> fileModified.contains(nodded.getFileNode())).collect(Collectors.toList());

        Map<FileNode, SortedSet<Localisation>> nodes = toWrite.stream()
                                                              .collect(Collectors.groupingBy(Localisation::getFileNode, Collectors.toCollection(TreeSet::new)));
    }

    private void writeLocalisations(String fileName, boolean replace, Eu4Language language, List<Localisation> localisations) throws IOException {
        if (CollectionUtils.isNotEmpty(localisations)) {
            FileNode fileNode = new FileNode(this.gameService.getMod(), Path.of(Eu4Utils.LOCALISATION_FOLDER_PATH, replace ? "replace" : "",
                                                                                fileName + "_" + language.fileEndWith + ".yml"));

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

    }
}

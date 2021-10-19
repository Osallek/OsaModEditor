package fr.osallek.osamodeditor.service;

import fr.osallek.eu4parser.model.game.Country;
import fr.osallek.eu4parser.model.game.Game;
import fr.osallek.osamodeditor.common.exception.CountryNotFoundException;
import fr.osallek.osamodeditor.common.exception.GraphicalCultureNotFoundException;
import fr.osallek.osamodeditor.common.exception.IdeaGroupNotFoundException;
import fr.osallek.osamodeditor.common.exception.InvalidFileException;
import fr.osallek.osamodeditor.dto.CountryEditDTO;
import fr.osallek.osamodeditor.dto.FileDTO;
import fr.osallek.osamodeditor.dto.GameDTO;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.awt.Color;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;

@Service
public class CountryService {

    private static final Logger LOGGER = LoggerFactory.getLogger(CountryService.class);

    private final GameService gameService;

    public CountryService(GameService gameService) {
        this.gameService = gameService;
    }

    public FileDTO flag(String tag, MultipartFile file) throws IOException {
        Game game = this.gameService.getGame();

        if (game.getCountry(tag) == null) {
            throw new CountryNotFoundException(tag);
        }

        if (!"tga".equalsIgnoreCase(FilenameUtils.getExtension(file.getOriginalFilename()))) {
            throw new InvalidFileException(file.getOriginalFilename());
        }

        Path flagPath = Path.of(game.getCountry(tag).getFlagPath("tga"));
        Path newPath = this.gameService.getTmpModPath().resolve(flagPath);

        file.transferTo(newPath);

        flagPath = game.convertImage(this.gameService.getTmpModPath().toString(), flagPath.subpath(0, flagPath.getNameCount() - 1).toString(),
                                     FilenameUtils.removeExtension(flagPath.getFileName().toString()) + "_tmp", newPath);

        return new FileDTO(flagPath.toString());
    }

    public GameDTO edit(String tag, MultipartFile flagFile, CountryEditDTO body) throws IOException {
        Game game = this.gameService.getGame();

        if (game.getCountry(tag) == null) {
            throw new CountryNotFoundException(tag);
        }

        if (flagFile != null && !"tga".equalsIgnoreCase(FilenameUtils.getExtension(flagFile.getOriginalFilename()))) {
            throw new InvalidFileException(flagFile.getOriginalFilename());
        }

        if (body != null) {
            if (body.getHistoricalIdeaGroups().stream().anyMatch(s -> game.getIdeaGroup(s) == null)) {
                throw new IdeaGroupNotFoundException();
            }

            if (!game.getGraphicalCultures().contains(body.getGraphicalCulture())) {
                throw new GraphicalCultureNotFoundException(body.getGraphicalCulture());
            }

            if (body.getHistoricalScore() != null && body.getHistoricalScore() < 0) {
                body.setHistoricalScore(null);
            }

            Country country = game.getCountry(tag);

            country.setGraphicalCulture(body.getGraphicalCulture());
            country.setHistoricalCouncil(body.getHistoricalCouncil());
            country.setHistoricalScore(body.getHistoricalScore());
            country.setHistoricalIdeaGroups(body.getHistoricalIdeaGroups());
            country.setMonarchNames(body.getMonarchNames());
            country.setArmyNames(body.getArmyNames());
            country.setFleetNames(body.getFleetNames());
            country.setShipNames(body.getShipNames());
            country.setLeaderNames(body.getLeaderNames());
            country.setColor(Color.decode(body.getColor()));

            if (!this.gameService.getMod().equals(country.getCommonFileNode().getMod())) {
                country.getCommonFileNode().setMod(this.gameService.getMod());
            }

            FileUtils.forceMkdirParent(country.getCommonFileNode().getPath().toFile());
            try (BufferedWriter bufferedWriter = new BufferedWriter(
                    new FileWriter(country.getCommonFileNode().getPath().toFile(), StandardCharsets.ISO_8859_1))) {
                country.writeCommon(bufferedWriter);
            } catch (IOException e) {
                LOGGER.error("An error occurred while writing common of {} to {}: {}!", country, country.getHistoryFileNode().getPath(), e.getMessage(), e);
            }
        }

        if (flagFile != null) {
            Path destFile = this.gameService.getMod().getPath().toPath().resolve(Path.of(game.getCountry(tag).getFlagPath("tga")));
            FileUtils.forceMkdirParent(destFile.toFile());
            flagFile.transferTo(destFile);

            Path flagPath = Path.of(game.getCountry(tag).getFlagPath("tga"));
            Path newPath = this.gameService.getTmpModPath().resolve(flagPath);
            game.convertImage(this.gameService.getTmpModPath().toString(), flagPath.subpath(0, flagPath.getNameCount() - 1).toString(),
                              FilenameUtils.removeExtension(flagPath.getFileName().toString()), newPath);
        }

        return new GameDTO(game, this.gameService.getTmpModPath().getFileName().toString());
    }
}

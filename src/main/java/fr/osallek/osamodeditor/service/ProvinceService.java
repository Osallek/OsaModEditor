package fr.osallek.osamodeditor.service;

import fr.osallek.eu4parser.model.game.Game;
import fr.osallek.eu4parser.model.game.Province;
import fr.osallek.eu4parser.model.game.ProvinceHistoryItem;
import fr.osallek.osamodeditor.common.exception.CountryNotFoundException;
import fr.osallek.osamodeditor.common.exception.CultureNotFoundException;
import fr.osallek.osamodeditor.common.exception.ProvinceNotFoundException;
import fr.osallek.osamodeditor.common.exception.ReligionNotFoundException;
import fr.osallek.osamodeditor.common.exception.TradeGoodNotFoundException;
import fr.osallek.osamodeditor.dto.GameDTO;
import fr.osallek.osamodeditor.form.MapActionForm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.function.Consumer;

@Service
public class ProvinceService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ProvinceService.class);

    private final GameService gameService;

    public ProvinceService(GameService gameService) {
        this.gameService = gameService;
    }

    public GameDTO changeOwner(MapActionForm form) throws IOException {
        LOGGER.info("Trying to change owner to {} at {} for {}", form.getTarget(), form.getDate(), form.getProvinces());

        Game game = this.gameService.getGame();

        if (game.getCountry(form.getTarget()) == null) {
            throw new CountryNotFoundException(form.getTarget());
        }

        changeProvinceHistory(form, provinceHistoryItem -> provinceHistoryItem.setOwner(form.getTarget()));

        return new GameDTO(game);
    }

    public GameDTO changeController(MapActionForm form) throws IOException {
        LOGGER.info("Trying to change controller to {} at {} for {}", form.getTarget(), form.getDate(), form.getProvinces());

        Game game = this.gameService.getGame();

        if (game.getCountry(form.getTarget()) == null) {
            throw new CountryNotFoundException(form.getTarget());
        }

        changeProvinceHistory(form, provinceHistoryItem -> provinceHistoryItem.setController(form.getTarget()));

        return new GameDTO(game);
    }

    public GameDTO changeOwnerAndController(MapActionForm form) throws IOException {
        LOGGER.info("Trying to change owner and controller to {} at {} for {}", form.getTarget(), form.getDate(), form.getProvinces());

        Game game = this.gameService.getGame();

        if (game.getCountry(form.getTarget()) == null) {
            throw new CountryNotFoundException(form.getTarget());
        }

        changeProvinceHistory(form, provinceHistoryItem -> {
            provinceHistoryItem.setController(form.getTarget());
            provinceHistoryItem.setOwner(form.getTarget());
        });

        return new GameDTO(game);
    }

    public GameDTO changeOwnerAndControllerAndCore(MapActionForm form) throws IOException {
        LOGGER.info("Trying to change owner and controller and core to {} at {} for {}", form.getTarget(), form.getDate(), form.getProvinces());

        Game game = this.gameService.getGame();

        if (game.getCountry(form.getTarget()) == null) {
            throw new CountryNotFoundException(form.getTarget());
        }

        changeProvinceHistory(form, provinceHistoryItem -> {
            provinceHistoryItem.setController(form.getTarget());
            provinceHistoryItem.setOwner(form.getTarget());

            if (provinceHistoryItem.getAddCores().stream().noneMatch(country -> country.getTag().equals(form.getTarget()))) {
                provinceHistoryItem.addAddCore(form.getTarget());
            }

            if (provinceHistoryItem.getRemoveCores().stream().anyMatch(country -> country.getTag().equals(form.getTarget()))) {
                provinceHistoryItem.removeRemoveCore(form.getTarget());
            }
        });

        return new GameDTO(game);
    }

    public GameDTO addToHre(MapActionForm form) throws IOException {
        LOGGER.info("Trying to add {} to the hre at {}", form.getProvinces(), form.getDate());

        changeProvinceHistory(form, provinceHistoryItem -> provinceHistoryItem.setHre(true));

        return new GameDTO(this.gameService.getGame());
    }

    public GameDTO removeFromHre(MapActionForm form) throws IOException {
        LOGGER.info("Trying to add {} to the hre at {}", form.getProvinces(), form.getDate());

        changeProvinceHistory(form, provinceHistoryItem -> provinceHistoryItem.setHre(false));

        return new GameDTO(this.gameService.getGame());
    }

    public GameDTO changeTradeGood(MapActionForm form) throws IOException {
        LOGGER.info("Trying to change trade good to {} at {} for {}", form.getTarget(), form.getDate(), form.getProvinces());

        Game game = this.gameService.getGame();

        if (game.getTradeGood(form.getTarget()) == null) {
            throw new TradeGoodNotFoundException(form.getTarget());
        }

        changeProvinceHistory(form, provinceHistoryItem -> provinceHistoryItem.setTradeGood(form.getTarget()));

        return new GameDTO(this.gameService.getGame());
    }

    public GameDTO changeReligion(MapActionForm form) throws IOException {
        LOGGER.info("Trying to change trade good to {} at {} for {}", form.getTarget(), form.getDate(), form.getProvinces());

        Game game = this.gameService.getGame();

        if (game.getReligion(form.getTarget()) == null) {
            throw new ReligionNotFoundException(form.getTarget());
        }

        changeProvinceHistory(form, provinceHistoryItem -> provinceHistoryItem.setReligion(form.getTarget()));

        return new GameDTO(this.gameService.getGame());
    }

    public GameDTO changeCulture(MapActionForm form) throws IOException {
        LOGGER.info("Trying to change trade good to {} at {} for {}", form.getTarget(), form.getDate(), form.getProvinces());

        Game game = this.gameService.getGame();

        if (game.getCulture(form.getTarget()) == null) {
            throw new CultureNotFoundException(form.getTarget());
        }

        changeProvinceHistory(form, provinceHistoryItem -> provinceHistoryItem.setCulture(form.getTarget()));

        return new GameDTO(this.gameService.getGame());
    }

    private void changeProvinceHistory(MapActionForm form, Consumer<ProvinceHistoryItem> consumer) {
        Game game = this.gameService.getGame();

        for (Integer provinceId : form.getProvinces()) {
            if (!game.getProvinces().containsKey(provinceId)) {
                throw new ProvinceNotFoundException(provinceId.toString());
            }
        }

        for (Integer provinceId : form.getProvinces()) {
            Province province = game.getProvince(provinceId);

            if (form.getDate() == null) {
                consumer.accept(province.getDefaultHistoryItem());
            } else {
                ProvinceHistoryItem provinceHistoryItem;

                if (province.getHistoryItems().containsKey(form.getDate())) {
                    provinceHistoryItem = province.getHistoryItems().get(form.getDate());
                } else {
                    provinceHistoryItem = new ProvinceHistoryItem(province, form.getDate());
                    province.getHistoryItems().put(form.getDate(), provinceHistoryItem);
                }

                consumer.accept(provinceHistoryItem);
            }

            writeProvinceHistory(province);
        }
    }

    private void writeProvinceHistory(Province province) {
        if (!this.gameService.getMod().equals(province.getHistoryFileNode().getMod())) {
            province.getHistoryFileNode().setMod(this.gameService.getMod());
        }

        try (BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(province.getHistoryFileNode().getPath().toFile()))) {
            province.getDefaultHistoryItem().write(bufferedWriter);
        } catch (IOException e) {
            LOGGER.error("An error occurred while writing history of {} to {}: {}!", province, province.getHistoryFileNode().getPath(), e.getMessage(), e);
        }
    }
}

package fr.osallek.osamodeditor.service;

import fr.osallek.eu4parser.model.game.Game;
import fr.osallek.eu4parser.model.game.Province;
import fr.osallek.osamodeditor.common.exception.CountryNotFoundException;
import fr.osallek.osamodeditor.common.exception.ProvinceNotFoundException;
import fr.osallek.osamodeditor.dto.GameDTO;
import fr.osallek.osamodeditor.form.MapActionForm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class ProvinceService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ProvinceService.class);

    private final GameService gameService;

    public ProvinceService(GameService gameService) {
        this.gameService = gameService;
    }

    public GameDTO changeOwner(MapActionForm form) throws IOException {
        LOGGER.info("Trying to change owner of to {} at {} for {}", form.getTarget(), form.getDate(), form.getProvinces());

        Game game = this.gameService.getGame();

        if (game.getCountry(form.getTarget()) == null) {
            throw new CountryNotFoundException(form.getTarget());
        }

        for (Integer provinceId : form.getProvinces()) {
            if (!game.getProvinces().containsKey(provinceId)) {
                throw new ProvinceNotFoundException(provinceId.toString());
            }
        }

        for (Integer provinceId : form.getProvinces()) {
            Province province = game.getProvince(provinceId);

            if (form.getDate() == null) {
                province.getDefaultHistoryItem().setOwner(form.getTarget());
            }
        }

        return new GameDTO(game);
    }
}

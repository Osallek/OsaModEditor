package fr.osallek.osamodeditor.service;

import fr.osallek.eu4parser.model.game.Bookmark;
import fr.osallek.eu4parser.model.game.Game;
import fr.osallek.eu4parser.model.game.ModifiersUtils;
import fr.osallek.osamodeditor.common.exception.BookmarkNotFoundException;
import fr.osallek.osamodeditor.common.exception.CountryNotFoundException;
import fr.osallek.osamodeditor.common.exception.ModifierNotFoundException;
import fr.osallek.osamodeditor.common.exception.ProvinceNotFoundException;
import fr.osallek.osamodeditor.dto.BookmarkEdit;
import fr.osallek.osamodeditor.dto.GameDTO;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.collections4.MapUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Set;

@Service
public class BookmarkService {

    private static final Logger LOGGER = LoggerFactory.getLogger(BookmarkService.class);

    private final GameService gameService;

    public BookmarkService(GameService gameService) {
        this.gameService = gameService;
    }

    public GameDTO edit(String name, BookmarkEdit body) throws IOException {
        Game game = this.gameService.getGame();
        Bookmark bookmark = game.getBookmark(name);

        if (bookmark == null) {
            throw new BookmarkNotFoundException(name);
        }

        if (CollectionUtils.isNotEmpty(body.getCountries())) {
            for (String tag : body.getCountries()) {
                if (game.getCountry(tag) == null) {
                    throw new CountryNotFoundException();
                }
            }
        }

        if (CollectionUtils.isNotEmpty(body.getEasyCountries())) {
            for (String tag : body.getEasyCountries()) {
                if (game.getCountry(tag) == null) {
                    throw new CountryNotFoundException();
                }
            }
        }

        if (body.getCenter() != null && game.getProvince(body.getCenter()) == null) {
            throw new ProvinceNotFoundException();
        }

        bookmark.setDefault(body.getDefault());
        bookmark.setCenter(body.getCenter());
        bookmark.setDate(body.getDate());
        bookmark.setCountries(body.getCountries());
        bookmark.setEasyCountries(body.getEasyCountries());

        this.gameService.writeNodded(Set.of(bookmark), game.getBookmarks());

        return new GameDTO(game, this.gameService.getTmpModPath().getFileName().toString());
    }
}

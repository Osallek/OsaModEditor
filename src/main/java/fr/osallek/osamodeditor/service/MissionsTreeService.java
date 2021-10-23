package fr.osallek.osamodeditor.service;

import fr.osallek.eu4parser.model.game.Game;
import fr.osallek.eu4parser.model.game.MissionsTree;
import fr.osallek.osamodeditor.common.exception.MissionsTreeNotFoundException;
import fr.osallek.osamodeditor.dto.GameDTO;
import fr.osallek.osamodeditor.dto.MissionsTreeEditDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Set;

@Service
public class MissionsTreeService {

    private static final Logger LOGGER = LoggerFactory.getLogger(MissionsTreeService.class);

    private final GameService gameService;

    public MissionsTreeService(GameService gameService) {
        this.gameService = gameService;
    }

    public GameDTO edit(String name, MissionsTreeEditDTO body) throws IOException {
        Game game = this.gameService.getGame();
        MissionsTree missionsTree = game.getMissionsTree(name);

        if (missionsTree == null) {
            throw new MissionsTreeNotFoundException(name);
        }

        missionsTree.setSlot(body.getSlot());
        missionsTree.setGeneric(body.getGeneric());
        missionsTree.setAi(body.getAi());
        missionsTree.setHasCountryShield(body.getHasCountryShield());

        if (!this.gameService.getMod().equals(missionsTree.getFileNode().getMod())) {
            missionsTree.getFileNode().setMod(this.gameService.getMod());
        }

        this.gameService.writeNodded(Set.of(missionsTree), game.getMissionsTrees());

        return new GameDTO(game, this.gameService.getTmpModPath().getFileName().toString());
    }
}

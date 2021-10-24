package fr.osallek.osamodeditor.service;

import fr.osallek.eu4parser.model.game.Game;
import fr.osallek.eu4parser.model.game.Mission;
import fr.osallek.osamodeditor.common.exception.MissionNotFoundException;
import fr.osallek.osamodeditor.dto.GameDTO;
import fr.osallek.osamodeditor.dto.MissionEditDTO;
import org.apache.commons.collections4.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Set;

@Service
public class MissionService {

    private static final Logger LOGGER = LoggerFactory.getLogger(MissionService.class);

    private final GameService gameService;

    public MissionService(GameService gameService) {
        this.gameService = gameService;
    }

    public GameDTO edit(String name, MissionEditDTO body) throws IOException {
        Game game = this.gameService.getGame();
        Mission mission = game.getMission(name);

        if (mission == null) {
            throw new MissionNotFoundException(name);
        }

        if (CollectionUtils.isNotEmpty(body.getRequiredMissions())) {
            for (String requiredMission : body.getRequiredMissions()) {
                if (game.getMission(requiredMission) == null) {
                    throw new MissionNotFoundException(requiredMission);
                }
            }

        }

        mission.setPosition(body.getPosition());
        mission.setGeneric(body.getGeneric());
        mission.setCompletedBy(body.getCompletedBy());
        mission.setIcon(body.getIcon());
        mission.setRequiredMissions(body.getRequiredMissions());

        if (!this.gameService.getMod().equals(mission.getFileNode().getMod())) {
            mission.getFileNode().setMod(this.gameService.getMod());
        }

        this.gameService.writeNodded(Set.of(mission), game.getMissions());

        return new GameDTO(game, this.gameService.getTmpModPath().getFileName().toString());
    }
}

package fr.osallek.osamodeditor.service;

import fr.osallek.eu4parser.model.game.Advisor;
import fr.osallek.eu4parser.model.game.Game;
import fr.osallek.eu4parser.model.game.Modifiers;
import fr.osallek.eu4parser.model.game.ModifiersUtils;
import fr.osallek.osamodeditor.common.exception.AdvisorNotFoundException;
import fr.osallek.osamodeditor.common.exception.ModifierNotFoundException;
import fr.osallek.osamodeditor.dto.AdvisorEdit;
import fr.osallek.osamodeditor.dto.GameDTO;
import org.apache.commons.collections4.MapUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Objects;
import java.util.Set;

@Service
public class AdvisorService {

    private static final Logger LOGGER = LoggerFactory.getLogger(AdvisorService.class);

    private final GameService gameService;

    public AdvisorService(GameService gameService) {
        this.gameService = gameService;
    }

    public GameDTO edit(String name, AdvisorEdit body) throws IOException {
        Game game = this.gameService.getGame();
        Advisor advisor = game.getAdvisor(name);

        if (advisor == null) {
            throw new AdvisorNotFoundException(name);
        }

        if (MapUtils.isNotEmpty(body.getModifiers())) {
            for (String modifier : body.getModifiers().keySet()) {
                if (ModifiersUtils.getModifier(modifier) == null) {
                    throw new ModifierNotFoundException();
                }
            }
        }

        if (MapUtils.isNotEmpty(body.getScaledModifiers())) {
            for (String modifier : body.getScaledModifiers().keySet()) {
                if (ModifiersUtils.getModifier(modifier) == null) {
                    throw new ModifierNotFoundException();
                }
            }
        }

        advisor.setPower(body.getPower());
        advisor.setAllowOnlyFemale(body.getAllowOnlyFemale());
        advisor.setAllowOnlyMale(body.getAllowOnlyMale());

        if (!ModifiersUtils.equals(body.getModifiers(), advisor.getModifiers().getModifiers())) {
            advisor.setModifiers(body.getModifiers());
        }

        if (!ModifiersUtils.equals(body.getScaledModifiers(), advisor.getSkillScaledModifier().getModifiers())) {
            advisor.setSkillScaledModifiers(body.getScaledModifiers());
        }

        this.gameService.writeNodded(Set.of(advisor), game.getAdvisors());

        return new GameDTO(game, this.gameService.getTmpModPath().getFileName().toString());
    }
}

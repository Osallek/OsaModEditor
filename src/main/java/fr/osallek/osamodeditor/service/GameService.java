package fr.osallek.osamodeditor.service;

import fr.osallek.eu4parser.common.Eu4Utils;
import fr.osallek.eu4parser.model.Mod;
import fr.osallek.eu4parser.model.game.Game;
import fr.osallek.osamodeditor.dto.GameDTO;
import fr.osallek.osamodeditor.dto.GameInitDTO;
import fr.osallek.osamodeditor.dto.IdName;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class GameService {

    private Game game = null;

    public Game getGame() {
        return game;
    }

    public Mod getMod() {
        return this.game.getMods().get(0);
    }

    public GameInitDTO getInit() {
        return new GameInitDTO(Eu4Utils.detectInstallationFolder().map(File::getAbsolutePath).orElse(null),
                               Eu4Utils.detectOwnMods().stream().map(mod -> IdName.of(mod.getFile().getName(), mod.getName())).collect(Collectors.toList()));
    }

    public GameDTO parseGame(String installFolder, String mod) throws IOException {
        this.game = new Game(installFolder, List.of(mod));
        return new GameDTO(this.game);
    }

    public GameDTO changeDefines(Map<String, Map<String, String>> defines) throws IOException {
        defines.forEach((category, values) -> values.forEach((key, value) -> this.game.changeDefine(this.game.getMods().get(0), category, key, value)));
        this.game.saveDefines(this.game.getMods().get(0));

        return new GameDTO(this.game);
    }
}

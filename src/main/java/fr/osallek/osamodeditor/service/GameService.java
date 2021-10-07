package fr.osallek.osamodeditor.service;

import fr.osallek.eu4parser.common.Eu4Utils;
import fr.osallek.eu4parser.model.Mod;
import fr.osallek.eu4parser.model.game.Game;
import fr.osallek.osamodeditor.common.Constants;
import fr.osallek.osamodeditor.config.OsaModEditorConfig;
import fr.osallek.osamodeditor.dto.GameDTO;
import fr.osallek.osamodeditor.dto.GameInitDTO;
import fr.osallek.osamodeditor.dto.IdName;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class GameService {

    private Game game = null;

    private Path tmpModPath = null;

    public Game getGame() {
        return game;
    }

    public Mod getMod() {
        return this.game.getMods().get(0);
    }

    public Path getTmpModPath() {
        return tmpModPath;
    }

    public GameInitDTO getInit() {
        return new GameInitDTO(Eu4Utils.detectInstallationFolder().map(File::getAbsolutePath).orElse(null),
                               Eu4Utils.detectOwnMods().stream().map(mod -> IdName.of(mod.getFile().getName(), mod.getName())).collect(Collectors.toList()));
    }

    public GameDTO parseGame(String installFolder, String mod) throws IOException {
        this.game = new Game(installFolder, List.of(mod));

        this.tmpModPath = Constants.EDITOR_DOCUMENTS_FOLDER.resolve(FilenameUtils.removeExtension(getMod().getFile().getName())).toAbsolutePath();
        FileUtils.forceMkdir(this.tmpModPath.toFile());
        OsaModEditorConfig.addPathToDelete(this.tmpModPath);
        this.game.convertImages(this.tmpModPath.toString(), Eu4Utils.GFX_FOLDER_PATH + File.separator + "flags");

        return new GameDTO(this.game, this.tmpModPath.getFileName().toString());
    }

    public GameDTO changeDefines(Map<String, Map<String, String>> defines) {
        defines.forEach((category, values) -> values.forEach((key, value) -> this.game.changeDefine(getMod(), category, key, value)));
        this.game.saveDefines(getMod());

        return new GameDTO(this.game, this.tmpModPath.getFileName().toString());
    }
}

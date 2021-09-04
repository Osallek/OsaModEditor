package fr.osallek.osamodeditor.dto;

import fr.osallek.eu4parser.common.Eu4Utils;

import java.util.Comparator;
import java.util.List;

public class GameInitDTO {

    private String installFolder;

    private List<IdName<String, String>> mods;

    public GameInitDTO() {
    }

    public GameInitDTO(String installFolder) {
        this.installFolder = installFolder;
    }

    public GameInitDTO(String installFolder, List<IdName<String, String>> mods) {
        this.installFolder = installFolder;
        this.mods = mods;
        mods.sort(Comparator.comparing(IdName::getName, Eu4Utils.COLLATOR::compare));
    }

    public String getInstallFolder() {
        return installFolder;
    }

    public void setInstallFolder(String installFolder) {
        this.installFolder = installFolder;
    }

    public List<IdName<String, String>> getMods() {
        return mods;
    }

    public void setMods(List<IdName<String, String>> mods) {
        this.mods = mods;
    }
}

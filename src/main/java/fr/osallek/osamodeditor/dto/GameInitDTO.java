package fr.osallek.osamodeditor.dto;

import java.util.SortedSet;

public class GameInitDTO {

    private String installFolder;

    private SortedSet<ModDTO> mods;

    private String version;

    public GameInitDTO() {
    }

    public GameInitDTO(String installFolder) {
        this.installFolder = installFolder;
    }

    public GameInitDTO(String installFolder, SortedSet<ModDTO> mods, String version) {
        this.installFolder = installFolder;
        this.mods = mods;
        this.version = version;
    }

    public String getInstallFolder() {
        return installFolder;
    }

    public void setInstallFolder(String installFolder) {
        this.installFolder = installFolder;
    }

    public SortedSet<ModDTO> getMods() {
        return mods;
    }

    public void setMods(SortedSet<ModDTO> mods) {
        this.mods = mods;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }
}

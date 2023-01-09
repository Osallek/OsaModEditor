package fr.osallek.osamodeditor.dto;

import fr.osallek.eu4parser.model.Mod;
import fr.osallek.eu4parser.model.ModType;

import java.util.Comparator;

public class ModDTO implements Comparable<ModDTO> {

    private String fileName;

    private String name;

    private ModType type;

    public ModDTO(Mod mod) {
        this.fileName = mod.file().getName();
        this.name = mod.getName();
        this.type = mod.getType();
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ModType getType() {
        return type;
    }

    public void setType(ModType type) {
        this.type = type;
    }

    @Override
    public int compareTo(ModDTO o) {
        return Comparator.comparing(ModDTO::getType).thenComparing(ModDTO::getName, String.CASE_INSENSITIVE_ORDER).compare(this, o);
    }
}

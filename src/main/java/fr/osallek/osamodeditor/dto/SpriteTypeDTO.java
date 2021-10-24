package fr.osallek.osamodeditor.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.osallek.clausewitzparser.common.ClausewitzUtils;
import fr.osallek.eu4parser.model.game.SpriteType;

public class SpriteTypeDTO implements MappedDTO<String> {

    private String name;

    private String textureFile;

    private Boolean transparenceCheck;

    private String loadType;

    public SpriteTypeDTO(SpriteType spriteType) {
        this.name = ClausewitzUtils.removeQuotes(spriteType.getName());
        this.textureFile = spriteType.getTextureFilePath("png").toString();
        this.transparenceCheck = spriteType.getTransparenceCheck();
        this.loadType = spriteType.getLoadType();
    }

    @Override
    @JsonIgnore
    public String getKey() {
        return this.name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTextureFile() {
        return textureFile;
    }

    public void setTextureFile(String textureFile) {
        this.textureFile = textureFile;
    }

    public Boolean getTransparenceCheck() {
        return transparenceCheck;
    }

    public void setTransparenceCheck(Boolean transparenceCheck) {
        this.transparenceCheck = transparenceCheck;
    }

    public String getLoadType() {
        return loadType;
    }

    public void setLoadType(String loadType) {
        this.loadType = loadType;
    }

    @Override
    @JsonIgnore
    public String toString() {
        return name;
    }
}

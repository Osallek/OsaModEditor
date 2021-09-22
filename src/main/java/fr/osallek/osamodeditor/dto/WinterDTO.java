package fr.osallek.osamodeditor.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.osallek.eu4parser.common.Eu4MapUtils;
import fr.osallek.eu4parser.model.game.localisation.Eu4Language;

import java.util.Map;

public class WinterDTO extends LocalisedDTO implements MappedDTO<String> {

    private String name;

    private ColorDTO color;

    public WinterDTO(String name, Map<Eu4Language, Map<String, String>> localisations) {
        super(name, localisations);
        this.name = name;
        this.color = new ColorDTO(Eu4MapUtils.winterToColor(name), true);
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

    public ColorDTO getColor() {
        return color;
    }

    public void setColor(ColorDTO color) {
        this.color = color;
    }

    @Override
    @JsonIgnore
    public String toString() {
        return name;
    }
}

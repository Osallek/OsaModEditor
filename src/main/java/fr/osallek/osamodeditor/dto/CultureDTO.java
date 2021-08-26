package fr.osallek.osamodeditor.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.osallek.eu4parser.model.game.Culture;
import fr.osallek.eu4parser.model.game.localisation.Eu4Language;

import java.util.Map;

public class CultureDTO extends LocalisedDTO implements MappedDTO<String> {

    private String name;

    private String group;

    private ColorDTO color;

    public CultureDTO(Culture culture, Map<Eu4Language, Map<String, String>> localisations) {
        super(culture.getName(), localisations);
        this.name = culture.getName();
        this.group = culture.getCultureGroup().getName();
        this.color = new ColorDTO(this.name, true);
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

    public String getGroup() {
        return group;
    }

    public void setGroup(String group) {
        this.group = group;
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

package fr.osallek.osamodeditor.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.osallek.eu4parser.model.game.Religion;
import fr.osallek.eu4parser.model.game.localisation.Eu4Language;
import fr.osallek.eu4parser.model.game.localisation.Localisation;

import java.util.Map;

public class ReligionDTO extends LocalisedDTO implements MappedDTO<String> {

    private String name;

    private String group;

    private ColorDTO color;

    public ReligionDTO(Religion religion, Map<String, Map<Eu4Language, Localisation>> localisations) {
        super(religion.getName(), localisations);
        this.name = religion.getName();
        this.group = religion.getReligionGroup().getName();
        this.color = religion.getColor() == null ? new ColorDTO(this.name, true) : new ColorDTO(religion.getColor());
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

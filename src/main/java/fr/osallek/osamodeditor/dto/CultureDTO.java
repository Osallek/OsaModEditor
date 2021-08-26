package fr.osallek.osamodeditor.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.osallek.eu4parser.model.game.Religion;

public class ReligionDTO implements MappedDTO<String> {

    private String name;

    private String group;

    private ColorDTO color;

    public ReligionDTO(Religion religion) {
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

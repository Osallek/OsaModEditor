package fr.osallek.osamodeditor.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.osallek.eu4parser.model.game.Area;
import fr.osallek.eu4parser.model.game.localisation.Eu4Language;

import java.util.List;
import java.util.Map;

public class AreaDTO extends LocalisedDTO implements MappedDTO<String> {

    private String name;

    private String region;

    private List<Integer> provinces;

    private ColorDTO color;

    public AreaDTO(Area area, Map<Eu4Language, Map<String, String>> localisations) {
        super(area.getName(), localisations);
        this.name = area.getName();
        this.provinces = area.getProvinces();
        this.region = area.getRegion() == null ? null : area.getRegion().getName();
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

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public List<Integer> getProvinces() {
        return provinces;
    }

    public void setProvinces(List<Integer> provinces) {
        this.provinces = provinces;
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

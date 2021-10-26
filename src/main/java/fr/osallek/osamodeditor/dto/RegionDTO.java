package fr.osallek.osamodeditor.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.osallek.eu4parser.model.game.Area;
import fr.osallek.eu4parser.model.game.Region;
import fr.osallek.eu4parser.model.game.localisation.Eu4Language;
import fr.osallek.eu4parser.model.game.localisation.Localisation;
import org.apache.commons.collections4.CollectionUtils;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class RegionDTO extends LocalisedDTO implements MappedDTO<String> {

    private String name;

    private String superRegion;

    private List<String> areas;

    private List<Integer> provinces;

    private ColorDTO color;

    public RegionDTO(Region region, Map<String, Map<Eu4Language, Localisation>> localisations) {
        super(region.getName(), localisations);
        this.name = region.getName();

        if (CollectionUtils.isNotEmpty(region.getAreas())) {
            this.areas = region.getAreas().stream().map(Area::getName).collect(Collectors.toList());
            this.provinces = region.getAreas().stream().map(Area::getProvinces).flatMap(Collection::stream).collect(Collectors.toList());
        } else {
            this.areas = new ArrayList<>();
            this.provinces = new ArrayList<>();
        }

        this.superRegion = region.getSuperRegion() == null ? null : region.getSuperRegion().getName();
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

    public String getSuperRegion() {
        return superRegion;
    }

    public void setSuperRegion(String superRegion) {
        this.superRegion = superRegion;
    }

    public List<String> getAreas() {
        return areas;
    }

    public void setAreas(List<String> areas) {
        this.areas = areas;
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

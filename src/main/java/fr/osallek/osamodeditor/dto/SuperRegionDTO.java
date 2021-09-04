package fr.osallek.osamodeditor.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.osallek.eu4parser.model.game.Area;
import fr.osallek.eu4parser.model.game.Region;
import fr.osallek.eu4parser.model.game.SuperRegion;
import fr.osallek.eu4parser.model.game.localisation.Eu4Language;
import org.apache.commons.collections4.CollectionUtils;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class SuperRegionDTO extends LocalisedDTO implements MappedDTO<String> {

    private String name;

    private List<String> regions;

    private List<Integer> provinces;

    private ColorDTO color;

    public SuperRegionDTO(SuperRegion superRegion, Map<Eu4Language, Map<String, String>> localisations) {
        super(superRegion.getName(), localisations);
        this.name = superRegion.getName();

        if (CollectionUtils.isNotEmpty(superRegion.getRegions())) {
            this.regions = superRegion.getRegions().stream().map(Region::getName).collect(Collectors.toList());
            this.provinces = superRegion.getRegions()
                                        .stream()
                                        .map(Region::getAreas)
                                        .flatMap(Collection::stream)
                                        .map(Area::getProvinces)
                                        .flatMap(Collection::stream)
                                        .collect(Collectors.toList());
        } else {
            this.regions = new ArrayList<>();
            this.provinces = new ArrayList<>();
        }

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

    public List<String> getRegions() {
        return regions;
    }

    public void setRegions(List<String> regions) {
        this.regions = regions;
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

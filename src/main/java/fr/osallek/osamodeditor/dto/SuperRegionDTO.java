package fr.osallek.eu4exporter.objects;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.osallek.eu4exporter.common.Constants;
import fr.osallek.eu4parser.model.game.Area;
import fr.osallek.eu4parser.model.game.Region;
import fr.osallek.eu4parser.model.game.localisation.Eu4Language;
import org.apache.commons.collections4.CollectionUtils;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class SuperRegion extends LocalisedObject {

    private final String id;

    private final List<String> regions;

    private final List<Integer> provinces;

    private final Color color;

    public SuperRegion(fr.osallek.eu4parser.model.game.SuperRegion superRegion, Map<Eu4Language, Map<String, String>> localisations) {
        super(superRegion.getName(), localisations);
        this.id = superRegion.getName();

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

        this.color = Constants.stringToColor(this.id);
    }

    public String getId() {
        return id;
    }

    public List<String> getRegions() {
        return regions;
    }

    public List<Integer> getProvinces() {
        return provinces;
    }

    public Color getColor() {
        return color;
    }

    @Override
    @JsonIgnore
    public String toString() {
        return id;
    }
}

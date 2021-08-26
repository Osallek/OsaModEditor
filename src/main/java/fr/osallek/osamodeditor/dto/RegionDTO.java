package fr.osallek.eu4exporter.objects;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.osallek.eu4exporter.common.Constants;
import fr.osallek.eu4parser.model.game.Area;
import fr.osallek.eu4parser.model.game.localisation.Eu4Language;
import org.apache.commons.collections4.CollectionUtils;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class Region extends LocalisedObject {

    private final String id;

    private final String superRegion;

    private final List<String> areas;

    private final List<Integer> provinces;

    private final Color color;

    public Region(fr.osallek.eu4parser.model.game.Region region, Map<Eu4Language, Map<String, String>> localisations) {
        super(region.getName(), localisations);
        this.id = region.getName();

        if (CollectionUtils.isNotEmpty(region.getAreas())) {
            this.areas = region.getAreas().stream().map(Area::getName).collect(Collectors.toList());
            this.provinces = region.getAreas().stream().map(Area::getProvinces).flatMap(Collection::stream).collect(Collectors.toList());
        } else {
            this.areas = new ArrayList<>();
            this.provinces = new ArrayList<>();
        }

        this.superRegion = region.getSuperRegion() == null ? null : region.getSuperRegion().getName();
        this.color = Constants.stringToColor(this.id);
    }

    public String getId() {
        return id;
    }

    public String getSuperRegion() {
        return superRegion;
    }

    public List<String> getAreas() {
        return areas;
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

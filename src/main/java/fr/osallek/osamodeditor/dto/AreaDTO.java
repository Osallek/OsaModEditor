package fr.osallek.eu4exporter.objects;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.osallek.eu4exporter.common.Constants;
import fr.osallek.eu4parser.model.game.localisation.Eu4Language;

import java.util.List;
import java.util.Map;

public class Area extends LocalisedObject {

    private final String id;

    private final String region;

    private final List<Integer> provinces;

    private final Color color;

    public Area(fr.osallek.eu4parser.model.game.Area area, Map<Eu4Language, Map<String, String>> localisations) {
        super(area.getName(), localisations);
        this.id = area.getName();
        this.provinces = area.getProvinces();
        this.region = area.getRegion() == null ? null : area.getRegion().getName();
        this.color = Constants.stringToColor(this.id);
    }

    public String getId() {
        return id;
    }

    public String getRegion() {
        return region;
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

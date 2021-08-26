package fr.osallek.eu4exporter.objects;

import fr.osallek.eu4parser.model.game.localisation.Eu4Language;

import java.io.Serializable;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;

public class LocalisedObject implements Serializable {

    private final Map<Eu4Language, String> localisations;

    public LocalisedObject(Map<Eu4Language, String> localisations) {
        this.localisations = localisations;
    }

    public LocalisedObject(String key, Map<Eu4Language, Map<String, String>> localisations) {
        this.localisations = new EnumMap<>(Eu4Language.class);
        for (Map.Entry<Eu4Language, Map<String, String>> entry : localisations.entrySet()) {
            this.localisations.put(entry.getKey(), entry.getValue().getOrDefault(key, key));
        }
    }

    public LocalisedObject(Map<Eu4Language, Map<String, String>> localisations, String defaultKey, List<String> keys) {
        this.localisations = new EnumMap<>(Eu4Language.class);
        for (Map.Entry<Eu4Language, Map<String, String>> entry : localisations.entrySet()) {
            String localisation = null;

            for (String key : keys) {
                localisation = entry.getValue().get(key);

                if (localisation != null) {
                    break;
                }
            }

            if (localisation == null) {
                localisation = defaultKey;
            }

            this.localisations.put(entry.getKey(), localisation);
        }
    }

    public Map<Eu4Language, String> getLocalisations() {
        return localisations;
    }
}

package fr.osallek.osamodeditor.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.osallek.eu4parser.model.game.localisation.Eu4Language;
import fr.osallek.eu4parser.model.game.localisation.Localisation;

import java.util.Map;

public class KeyLocalisedDTO extends LocalisedDTO implements MappedDTO<String> {

    private String name;

    public KeyLocalisedDTO(String name, Map<String, Map<Eu4Language, Localisation>> localisations) {
        this(name, localisations, true);
    }

    public KeyLocalisedDTO(String name, Map<String, Map<Eu4Language, Localisation>> localisations, boolean keyAsDefault) {
        super(name, localisations, keyAsDefault);
        this.name = name;
    }

    public KeyLocalisedDTO(String key, String name, Map<String, Map<Eu4Language, Localisation>> localisations) {
        super(key, localisations);
        this.name = name;
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

    @Override
    @JsonIgnore
    public String toString() {
        return name;
    }
}

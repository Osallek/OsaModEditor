package fr.osallek.osamodeditor.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.osallek.eu4parser.model.game.localisation.Eu4Language;

import java.util.List;
import java.util.Map;

public class LocalisedDTO {

    private String english;

    private String french;

    private String german;

    private String spanish;

    public LocalisedDTO(String key, Map<Eu4Language, Map<String, String>> localisations) {
        this.english = localisations.get(Eu4Language.ENGLISH).getOrDefault(key, key);
        this.french = localisations.get(Eu4Language.FRENCH).getOrDefault(key, key);
        this.german = localisations.get(Eu4Language.GERMAN).getOrDefault(key, key);
        this.spanish = localisations.get(Eu4Language.SPANISH).getOrDefault(key, key);
    }

    public LocalisedDTO(Map<Eu4Language, Map<String, String>> localisations, String defaultKey, List<String> keys) {
        String key = null;

        for (String k : keys) {
            key = localisations.get(Eu4Language.ENGLISH).get(k);

            if (key != null) {
                break;
            }
        }

        if (key == null) {
            key = defaultKey;
        }

        this.english = localisations.get(Eu4Language.ENGLISH).getOrDefault(key, key);
        this.french = localisations.get(Eu4Language.FRENCH).getOrDefault(key, key);
        this.german = localisations.get(Eu4Language.GERMAN).getOrDefault(key, key);
        this.spanish = localisations.get(Eu4Language.SPANISH).getOrDefault(key, key);
    }

    @JsonIgnore
    public void addToEndLocalisations(String end) {
        this.english = this.english + end;
        this.french = this.french + end;
        this.german = this.german + end;
        this.spanish = this.spanish + end;
    }

    public String getEnglish() {
        return english;
    }

    public String getFrench() {
        return french;
    }

    public String getGerman() {
        return german;
    }

    public String getSpanish() {
        return spanish;
    }
}

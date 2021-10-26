package fr.osallek.osamodeditor.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.osallek.eu4parser.model.game.localisation.Eu4Language;
import fr.osallek.eu4parser.model.game.localisation.Localisation;
import org.apache.commons.collections4.MapUtils;
import org.apache.commons.lang3.StringUtils;

import java.util.List;
import java.util.Map;

public class LocalisedDTO {

    private String english;

    private String french;

    private String german;

    private String spanish;

    public LocalisedDTO(String key, Map<String, Map<Eu4Language, Localisation>> localisations) {
        build(key, localisations);
    }

    public LocalisedDTO(Map<String, Map<Eu4Language, Localisation>> localisations, String defaultKey, List<String> keys) {
        String key = defaultKey;

        for (String k : keys) {
            Map<Eu4Language, Localisation> map = localisations.get(k);

            if (MapUtils.isNotEmpty(map)) {
                key = k;
                break;
            }
        }

        build(key, localisations);
    }

    private void build(String key, Map<String, Map<Eu4Language, Localisation>> localisations) {
        Map<Eu4Language, Localisation> map = localisations.get(key);

        if (MapUtils.isEmpty(map)) {
            this.english = key;
            this.french = key;
            this.german = key;
            this.spanish = key;
        } else {
            this.english = map.containsKey(Eu4Language.ENGLISH) ? StringUtils.capitalize(map.get(Eu4Language.ENGLISH).getValue()) : key;
            this.french = map.containsKey(Eu4Language.FRENCH) ? StringUtils.capitalize(map.get(Eu4Language.FRENCH).getValue()) : key;
            this.german = map.containsKey(Eu4Language.GERMAN) ? StringUtils.capitalize(map.get(Eu4Language.GERMAN).getValue()) : key;
            this.spanish = map.containsKey(Eu4Language.SPANISH) ? StringUtils.capitalize(map.get(Eu4Language.SPANISH).getValue()) : key;
        }
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

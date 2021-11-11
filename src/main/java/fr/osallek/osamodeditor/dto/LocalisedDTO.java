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

    public LocalisedDTO() {
    }

    public LocalisedDTO(String key, Map<String, Map<Eu4Language, Localisation>> localisations) {
        this(key, localisations, true);
    }

    public LocalisedDTO(String key, Map<String, Map<Eu4Language, Localisation>> localisations, boolean keyAsDefault) {
        build(key, localisations, keyAsDefault);
    }

    public LocalisedDTO(Map<String, Map<Eu4Language, Localisation>> localisations, String defaultKey, List<String> keys) {
        this(localisations, defaultKey, keys, true);
    }

    public LocalisedDTO(Map<String, Map<Eu4Language, Localisation>> localisations, String defaultKey, List<String> keys, boolean keyAsDefault) {
        String key = defaultKey;

        for (String k : keys) {
            Map<Eu4Language, Localisation> map = localisations.get(k);

            if (MapUtils.isNotEmpty(map)) {
                key = k;
                break;
            }
        }

        build(key, localisations, keyAsDefault);
    }

    private void build(String key, Map<String, Map<Eu4Language, Localisation>> localisations, boolean keyAsDefault) {
        Map<Eu4Language, Localisation> map = localisations.get(key);

        if (MapUtils.isEmpty(map)) {
            this.english = keyAsDefault ? key : null;
            this.french = keyAsDefault ? key : null;
            this.german = keyAsDefault ? key : null;
            this.spanish = keyAsDefault ? key : null;
        } else {
            this.english = map.containsKey(Eu4Language.ENGLISH) ? StringUtils.capitalize(map.get(Eu4Language.ENGLISH).getValue()) : keyAsDefault ? key : null;
            this.french = map.containsKey(Eu4Language.FRENCH) ? StringUtils.capitalize(map.get(Eu4Language.FRENCH).getValue()) : keyAsDefault ? key : null;
            this.german = map.containsKey(Eu4Language.GERMAN) ? StringUtils.capitalize(map.get(Eu4Language.GERMAN).getValue()) : keyAsDefault ? key : null;
            this.spanish = map.containsKey(Eu4Language.SPANISH) ? StringUtils.capitalize(map.get(Eu4Language.SPANISH).getValue()) : keyAsDefault ? key : null;
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

    public void setEnglish(String english) {
        this.english = english;
    }

    public void setFrench(String french) {
        this.french = french;
    }

    public void setGerman(String german) {
        this.german = german;
    }

    public void setSpanish(String spanish) {
        this.spanish = spanish;
    }
}

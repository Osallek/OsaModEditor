package fr.osallek.osamodeditor.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.osallek.eu4parser.model.Power;
import fr.osallek.eu4parser.model.game.Advisor;
import fr.osallek.eu4parser.model.game.localisation.Eu4Language;
import fr.osallek.eu4parser.model.game.localisation.Localisation;

import java.util.Map;

public class AdvisorDTO extends LocalisedDTO implements MappedDTO<String> {

    private String name;

    private Power power;

    private Boolean allowOnlyMale;

    private Boolean allowOnlyFemale;

    private String sprite;

    public AdvisorDTO(Advisor advisor, Map<String, Map<Eu4Language, Localisation>> localisations) {
        super(advisor.getName(), localisations);
        this.name = advisor.getName();
        this.power = advisor.getPower();
        this.allowOnlyMale = advisor.allowOnlyMale();
        this.allowOnlyFemale = advisor.allowOnlyFemale();
        this.sprite = advisor.getDefaultSprite().getTextureFilePath("png").toString();
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

    public Power getPower() {
        return power;
    }

    public void setPower(Power power) {
        this.power = power;
    }

    public Boolean getAllowOnlyMale() {
        return allowOnlyMale;
    }

    public void setAllowOnlyMale(Boolean allowOnlyMale) {
        this.allowOnlyMale = allowOnlyMale;
    }

    public Boolean getAllowOnlyFemale() {
        return allowOnlyFemale;
    }

    public void setAllowOnlyFemale(Boolean allowOnlyFemale) {
        this.allowOnlyFemale = allowOnlyFemale;
    }

    public String getSprite() {
        return sprite;
    }

    public void setSprite(String sprite) {
        this.sprite = sprite;
    }

    @Override
    @JsonIgnore
    public String toString() {
        return name;
    }
}

package fr.osallek.osamodeditor.dto;

import fr.osallek.eu4parser.model.Power;

import java.util.Map;

public class AdvisorEdit {

    private Power power;

    private Boolean allowOnlyMale;

    private Boolean allowOnlyFemale;

    private Map<String, Double> modifiers;

    private Map<String, Double> scaledModifiers;

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

    public Map<String, Double> getModifiers() {
        return modifiers;
    }

    public void setModifiers(Map<String, Double> modifiers) {
        this.modifiers = modifiers;
    }

    public Map<String, Double> getScaledModifiers() {
        return scaledModifiers;
    }

    public void setScaledModifiers(Map<String, Double> scaledModifiers) {
        this.scaledModifiers = scaledModifiers;
    }
}

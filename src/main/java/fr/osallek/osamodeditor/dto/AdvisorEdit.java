package fr.osallek.osamodeditor.dto;

import fr.osallek.eu4parser.model.Power;

public class AdvisorEdit {

    private Power power;

    private Boolean allowOnlyMale;

    private Boolean allowOnlyFemale;

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
}

package fr.osallek.osamodeditor.dto;

public class MissionsTreeEditDTO {

    private Integer slot;

    private Boolean isGeneric;

    private Boolean isAi;

    private Boolean hasCountryShield;

    public Integer getSlot() {
        return slot;
    }

    public void setSlot(Integer slot) {
        this.slot = slot;
    }

    public Boolean getGeneric() {
        return isGeneric;
    }

    public void setGeneric(Boolean generic) {
        isGeneric = generic;
    }

    public Boolean getAi() {
        return isAi;
    }

    public void setAi(Boolean ai) {
        isAi = ai;
    }

    public Boolean getHasCountryShield() {
        return hasCountryShield;
    }

    public void setHasCountryShield(Boolean hasCountryShield) {
        this.hasCountryShield = hasCountryShield;
    }
}

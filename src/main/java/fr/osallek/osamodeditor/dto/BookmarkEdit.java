package fr.osallek.osamodeditor.dto;

import java.time.LocalDate;
import java.util.List;

public class BookmarkEdit {

    private LocalDate date;

    private Integer center;

    private Boolean isDefault;

    private List<String> countries;

    private List<String> easyCountries;

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Integer getCenter() {
        return center;
    }

    public void setCenter(Integer center) {
        this.center = center;
    }

    public Boolean getDefault() {
        return isDefault;
    }

    public void setDefault(Boolean aDefault) {
        isDefault = aDefault;
    }

    public List<String> getCountries() {
        return countries;
    }

    public void setCountries(List<String> countries) {
        this.countries = countries;
    }

    public List<String> getEasyCountries() {
        return easyCountries;
    }

    public void setEasyCountries(List<String> easyCountries) {
        this.easyCountries = easyCountries;
    }
}

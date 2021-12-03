package fr.osallek.osamodeditor.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.osallek.clausewitzparser.common.ClausewitzUtils;
import fr.osallek.eu4parser.model.game.Bookmark;
import fr.osallek.eu4parser.model.game.Country;
import fr.osallek.eu4parser.model.game.localisation.Eu4Language;
import fr.osallek.eu4parser.model.game.localisation.Localisation;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class BookmarkDTO extends LocalisedDTO implements MappedDTO<String> {

    private String name;

    private String desc;

    private LocalDate date;

    private Integer center;

    private Boolean isDefault;

    private List<String> countries;

    private List<String> easyCountries;

    public BookmarkDTO(Bookmark bookmark, Map<String, Map<Eu4Language, Localisation>> localisations) {
        super(ClausewitzUtils.removeQuotes(bookmark.getName()), localisations);
        this.name = ClausewitzUtils.removeQuotes(bookmark.getName());
        this.desc = ClausewitzUtils.removeQuotes(bookmark.getDesc());
        this.date = bookmark.getDate();
        this.center = bookmark.getCenter();
        this.isDefault = bookmark.isDefault();
        this.countries = bookmark.getCountries().stream().map(Country::getTag).collect(Collectors.toList());
        this.easyCountries = bookmark.getEasyCountries().stream().map(Country::getTag).collect(Collectors.toList());
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

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

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

    @Override
    @JsonIgnore
    public String toString() {
        return name;
    }
}

package fr.osallek.osamodeditor.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.osallek.eu4parser.model.game.Country;
import fr.osallek.eu4parser.model.game.Culture;
import fr.osallek.eu4parser.model.game.localisation.Eu4Language;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class CountryDTO extends LocalisedDTO implements MappedDTO<String> {

    private String tag;

    private String name;

    private String techGroup;

    private String unitType;

    private String government;

    private Integer governmentRank;

    private String primaryCulture;

    private List<String> addAcceptedCultures;

    private List<String> removeAcceptedCultures;

    private List<String> historicalFriends;

    private List<String> historicalEnemies;

    private String graphicalCulture;

    private ColorDTO color;

    private Boolean elector;

    public CountryDTO(Country country, Map<Eu4Language, Map<String, String>> localisations) {
        super(country.getTag(), localisations);
        this.tag = country.getTag();
        addToEndLocalisations(" (" + this.tag + ")");
        this.name = country.getName();
        this.techGroup = country.getTechnologyGroup().getName();
        this.unitType = country.getUnitType();
        this.government = country.getGovernment() == null ? null : country.getGovernment().getName();
        this.governmentRank = country.getGovernmentLevel();
        this.addAcceptedCultures = country.getAcceptedCultures() == null ? null : country.getAcceptedCultures()
                                                                                         .stream()
                                                                                         .map(Culture::getName)
                                                                                         .collect(Collectors.toList());
        this.removeAcceptedCultures = country.getRemoveAcceptedCultures() == null ? null : country.getRemoveAcceptedCultures()
                                                                                                  .stream()
                                                                                                  .map(Culture::getName)
                                                                                                  .collect(Collectors.toList());
        this.historicalFriends = country.getHistoricalFriends() == null ? null : country.getHistoricalFriends()
                                                                                        .stream()
                                                                                        .map(Country::getTag)
                                                                                        .collect(Collectors.toList());
        this.historicalEnemies = country.getHistoricalEnemies() == null ? null : country.getHistoricalEnemies()
                                                                                        .stream()
                                                                                        .map(Country::getTag)
                                                                                        .collect(Collectors.toList());
        this.graphicalCulture = country.getGraphicalCulture();
        this.color = country.getColor() == null ? new ColorDTO(this.tag, true) : new ColorDTO(country.getColor());
        this.elector = country.getElector();
    }

    @Override
    @JsonIgnore
    public String getKey() {
        return this.tag;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTechGroup() {
        return techGroup;
    }

    public void setTechGroup(String techGroup) {
        this.techGroup = techGroup;
    }

    public String getUnitType() {
        return unitType;
    }

    public void setUnitType(String unitType) {
        this.unitType = unitType;
    }

    public String getGovernment() {
        return government;
    }

    public void setGovernment(String government) {
        this.government = government;
    }

    public Integer getGovernmentRank() {
        return governmentRank;
    }

    public void setGovernmentRank(Integer governmentRank) {
        this.governmentRank = governmentRank;
    }

    public String getPrimaryCulture() {
        return primaryCulture;
    }

    public void setPrimaryCulture(String primaryCulture) {
        this.primaryCulture = primaryCulture;
    }

    public List<String> getAddAcceptedCultures() {
        return addAcceptedCultures;
    }

    public void setAddAcceptedCultures(List<String> addAcceptedCultures) {
        this.addAcceptedCultures = addAcceptedCultures;
    }

    public List<String> getRemoveAcceptedCultures() {
        return removeAcceptedCultures;
    }

    public void setRemoveAcceptedCultures(List<String> removeAcceptedCultures) {
        this.removeAcceptedCultures = removeAcceptedCultures;
    }

    public List<String> getHistoricalFriends() {
        return historicalFriends;
    }

    public void setHistoricalFriends(List<String> historicalFriends) {
        this.historicalFriends = historicalFriends;
    }

    public List<String> getHistoricalEnemies() {
        return historicalEnemies;
    }

    public void setHistoricalEnemies(List<String> historicalEnemies) {
        this.historicalEnemies = historicalEnemies;
    }

    public String getGraphicalCulture() {
        return graphicalCulture;
    }

    public void setGraphicalCulture(String graphicalCulture) {
        this.graphicalCulture = graphicalCulture;
    }

    public ColorDTO getColor() {
        return color;
    }

    public void setColor(ColorDTO color) {
        this.color = color;
    }

    public Boolean getElector() {
        return elector;
    }

    public void setElector(Boolean elector) {
        this.elector = elector;
    }
}

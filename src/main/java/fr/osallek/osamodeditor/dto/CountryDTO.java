package fr.osallek.osamodeditor.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.osallek.eu4parser.model.game.Country;
import fr.osallek.eu4parser.model.game.IdeaGroup;
import fr.osallek.eu4parser.model.game.localisation.Eu4Language;
import org.apache.commons.collections4.CollectionUtils;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class CountryDTO extends LocalisedDTO implements MappedDTO<String> {

    private String tag;

    private String graphicalCulture;

    private ColorDTO color;

    private ColorDTO revolutionaryColors;

    private String historicalCouncil;

    private Integer historicalScore;

    private List<String> historicalIdeaGroups;

    private Map<String, Integer> monarchNames;

    private List<String> historicalUnits;

    private List<String> leaderNames;

    private List<String> shipNames;

    private List<String> armyNames;

    private List<String> fleetNames;

    private List<CountryHistoryDTO> history;

    public CountryDTO(Country country, Map<Eu4Language, Map<String, String>> localisations) {
        super(country.getTag(), localisations);
        this.tag = country.getTag();
        addToEndLocalisations(" (" + this.tag + ")");
        this.graphicalCulture = country.getGraphicalCulture();
        this.color = country.getColor() == null ? new ColorDTO(this.tag, true) : new ColorDTO(country.getColor());
        this.revolutionaryColors = country.getRevolutionaryColor() == null ? new ColorDTO(this.tag, true) : new ColorDTO(country.getRevolutionaryColor());
        this.historicalCouncil = country.getHistoricalCouncil();
        this.historicalScore = country.getHistoricalScore();
        this.historicalIdeaGroups = CollectionUtils.isEmpty(country.getHistoricalIdeaGroups()) ? null : country.getHistoricalIdeaGroups()
                                                                                                               .stream()
                                                                                                               .map(IdeaGroup::getName)
                                                                                                               .collect(Collectors.toList());
        this.monarchNames = country.getMonarchNames();
        this.historicalUnits = country.getArmyNames();
        this.leaderNames = country.getLeaderNames();
        this.shipNames = country.getShipNames();
        this.armyNames = country.getArmyNames();
        this.fleetNames = country.getFleetNames();
        this.history = Stream.concat(Stream.of(new CountryHistoryDTO(null, country.getDefaultHistoryItem())),
                                     country.getHistoryItems().entrySet().stream().map(entry -> new CountryHistoryDTO(entry.getKey(), entry.getValue())))
                             .sorted()
                             .collect(Collectors.toList());
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

    public ColorDTO getRevolutionaryColors() {
        return revolutionaryColors;
    }

    public void setRevolutionaryColors(ColorDTO revolutionaryColors) {
        this.revolutionaryColors = revolutionaryColors;
    }

    public String getHistoricalCouncil() {
        return historicalCouncil;
    }

    public void setHistoricalCouncil(String historicalCouncil) {
        this.historicalCouncil = historicalCouncil;
    }

    public Integer getHistoricalScore() {
        return historicalScore;
    }

    public void setHistoricalScore(Integer historicalScore) {
        this.historicalScore = historicalScore;
    }

    public List<String> getHistoricalIdeaGroups() {
        return historicalIdeaGroups;
    }

    public void setHistoricalIdeaGroups(List<String> historicalIdeaGroups) {
        this.historicalIdeaGroups = historicalIdeaGroups;
    }

    public Map<String, Integer> getMonarchNames() {
        return monarchNames;
    }

    public void setMonarchNames(Map<String, Integer> monarchNames) {
        this.monarchNames = monarchNames;
    }

    public List<String> getHistoricalUnits() {
        return historicalUnits;
    }

    public void setHistoricalUnits(List<String> historicalUnits) {
        this.historicalUnits = historicalUnits;
    }

    public List<String> getLeaderNames() {
        return leaderNames;
    }

    public void setLeaderNames(List<String> leaderNames) {
        this.leaderNames = leaderNames;
    }

    public List<String> getShipNames() {
        return shipNames;
    }

    public void setShipNames(List<String> shipNames) {
        this.shipNames = shipNames;
    }

    public List<String> getArmyNames() {
        return armyNames;
    }

    public void setArmyNames(List<String> armyNames) {
        this.armyNames = armyNames;
    }

    public List<String> getFleetNames() {
        return fleetNames;
    }

    public void setFleetNames(List<String> fleetNames) {
        this.fleetNames = fleetNames;
    }

    public List<CountryHistoryDTO> getHistory() {
        return history;
    }

    public void setHistory(List<CountryHistoryDTO> history) {
        this.history = history;
    }
}

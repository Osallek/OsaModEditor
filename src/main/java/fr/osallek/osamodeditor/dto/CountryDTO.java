package fr.osallek.osamodeditor.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.osallek.clausewitzparser.common.ClausewitzUtils;
import fr.osallek.eu4parser.model.game.Country;
import fr.osallek.eu4parser.model.game.IdeaGroup;
import fr.osallek.eu4parser.model.game.Unit;
import fr.osallek.eu4parser.model.game.localisation.Eu4Language;
import fr.osallek.osamodeditor.common.Constants;
import org.apache.commons.lang3.tuple.Pair;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class CountryDTO extends LocalisedDTO implements MappedDTO<String> {

    private String tag;

    private String flagFile;

    private String graphicalCulture;

    private ColorDTO color;

    private List<Integer> revolutionaryColors;

    private String historicalCouncil;

    private Integer historicalScore;

    private List<String> historicalIdeaGroups;

    private List<Pair<String, Integer>> monarchNames;

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
        this.flagFile = country.getFlagPath("png");
        this.graphicalCulture = country.getGraphicalCulture();
        this.color = country.getColor() == null ? new ColorDTO(this.tag, true) : new ColorDTO(country.getColor());
        this.revolutionaryColors = country.getRevolutionaryColors();
        this.historicalCouncil = country.getHistoricalCouncil();
        this.historicalScore = country.getHistoricalScore();
        this.historicalIdeaGroups = Constants.nullIfEmpty(country.getHistoricalIdeaGroups(), IdeaGroup::getName, true);
        this.monarchNames = country.getMonarchNames()
                                   .stream()
                                   .map(pair -> Pair.of(ClausewitzUtils.removeQuotes(pair.getKey()), pair.getValue()))
                                   .collect(Collectors.toList());
        this.historicalUnits = Constants.nullIfEmpty(country.getHistoricalUnits(), Unit::getName, true);
        this.leaderNames = Constants.nullIfEmpty(country.getLeaderNames(), ClausewitzUtils::removeQuotes);
        this.shipNames = Constants.nullIfEmpty(country.getShipNames(), ClausewitzUtils::removeQuotes);
        this.armyNames = Constants.nullIfEmpty(country.getArmyNames(), ClausewitzUtils::removeQuotes);
        this.fleetNames = Constants.nullIfEmpty(country.getFleetNames(), ClausewitzUtils::removeQuotes);
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

    public String getFlagFile() {
        return flagFile;
    }

    public void setFlagFile(String flagFile) {
        this.flagFile = flagFile;
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

    public List<Integer> getRevolutionaryColors() {
        return revolutionaryColors;
    }

    public void setRevolutionaryColors(List<Integer> revolutionaryColors) {
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

    public List<Pair<String, Integer>> getMonarchNames() {
        return monarchNames;
    }

    public void setMonarchNames(List<Pair<String, Integer>> monarchNames) {
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

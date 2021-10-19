package fr.osallek.osamodeditor.dto;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.tuple.Pair;

import java.util.List;
import java.util.stream.Collectors;

public class CountryEditDTO {

    private String graphicalCulture;

    private String historicalCouncil;

    private Integer historicalScore;

    private String color;

    private List<String> historicalIdeaGroups;

    private List<Pair<String, Integer>> monarchNames;

    private List<String> armyNames;

    private List<String> fleetNames;

    private List<String> shipNames;

    private List<String> leaderNames;

    public String getGraphicalCulture() {
        return graphicalCulture;
    }

    public void setGraphicalCulture(String graphicalCulture) {
        this.graphicalCulture = graphicalCulture;
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

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public List<String> getHistoricalIdeaGroups() {
        return historicalIdeaGroups;
    }

    public void setHistoricalIdeaGroups(List<String> historicalIdeaGroups) {
        if (CollectionUtils.isNotEmpty(historicalIdeaGroups)) {
            this.historicalIdeaGroups = historicalIdeaGroups.stream().filter(StringUtils::isNotBlank).collect(Collectors.toList());
        }
    }

    public List<Pair<String, Integer>> getMonarchNames() {
        return monarchNames;
    }

    public void setMonarchNames(List<Pair<String, Integer>> monarchNames) {
        this.monarchNames = monarchNames;
    }

    public List<String> getArmyNames() {
        return armyNames;
    }

    public void setArmyNames(List<String> armyNames) {
        if (CollectionUtils.isNotEmpty(armyNames)) {
            this.armyNames = armyNames.stream().filter(StringUtils::isNotBlank).collect(Collectors.toList());
        }
    }

    public List<String> getFleetNames() {
        return fleetNames;
    }

    public void setFleetNames(List<String> fleetNames) {
        if (CollectionUtils.isNotEmpty(fleetNames)) {
            this.fleetNames = fleetNames.stream().filter(StringUtils::isNotBlank).collect(Collectors.toList());
        }
    }

    public List<String> getShipNames() {
        return shipNames;
    }

    public void setShipNames(List<String> shipNames) {
        if (CollectionUtils.isNotEmpty(shipNames)) {
            this.shipNames = shipNames.stream().filter(StringUtils::isNotBlank).collect(Collectors.toList());
        }
    }

    public List<String> getLeaderNames() {
        return leaderNames;
    }

    public void setLeaderNames(List<String> leaderNames) {
        if (CollectionUtils.isNotEmpty(leaderNames)) {
            this.leaderNames = leaderNames.stream().filter(StringUtils::isNotBlank).collect(Collectors.toList());
        }
    }
}

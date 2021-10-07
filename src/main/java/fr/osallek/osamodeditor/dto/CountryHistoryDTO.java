package fr.osallek.osamodeditor.dto;

import fr.osallek.eu4parser.model.Power;
import fr.osallek.eu4parser.model.game.Country;
import fr.osallek.eu4parser.model.game.CountryHistoryItem;
import fr.osallek.eu4parser.model.game.Culture;
import fr.osallek.eu4parser.model.game.EstatePrivilege;
import fr.osallek.eu4parser.model.game.RulerPersonality;
import fr.osallek.eu4parser.model.game.todo.GovernmentReform;
import org.apache.commons.collections4.CollectionUtils;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

public class CountryHistoryDTO implements Comparable<CountryHistoryDTO> {

    private LocalDate date;

    private String technologyGroup;

    private String unitType;

    private Integer mercantilism;

    private Integer capital;

    private String changedTagFrom;

    private Integer fixedCapital;

    private String government;

    private String religiousSchool;

    private Power nationalFocus;

    private Integer governmentRank;

    private String primaryCulture;

    private String religion;

    private String joinLeague;

    private Double addArmyProfessionalism;

    private List<String> addAcceptedCulture;

    private List<String> removeAcceptedCulture;

    private List<String> historicalFriend;

    private List<String> historicalRival;

    private Boolean elector;

    private Boolean clearScriptedPersonalities;

    private List<String> addHeirPersonality;

    private List<String> addRulerPersonality;

    private List<String> addQueenPersonality;

    private List<String> setEstatePrivilege;

    private List<String> addGovernmentReform;

    private List<String> setCountryFlag;

    private List<ChangeEstateLandShareDTO> changeEstateLandShare;

    public CountryHistoryDTO(LocalDate date, CountryHistoryItem historyItem) {
        this.date = date;
        this.technologyGroup = historyItem.getTechnologyGroup() != null ? historyItem.getTechnologyGroup().getName() : null;
        this.unitType = historyItem.getUnitType();
        this.mercantilism = historyItem.getMercantilism();
        this.capital = historyItem.getCapital() != null ? historyItem.getCapital().getId() : null;
        this.changedTagFrom = historyItem.getChangedTagFrom() != null ? historyItem.getChangedTagFrom().getTag() : null;
        this.fixedCapital = historyItem.getFixedCapital() != null ? historyItem.getFixedCapital().getId() : null;
        this.government = historyItem.getGovernment() != null ? historyItem.getGovernment().getName() : null;
        this.religiousSchool = historyItem.getReligiousSchool();
        this.nationalFocus = historyItem.getNationalFocus();
        this.governmentRank = historyItem.getGovernmentLevel();
        this.primaryCulture = historyItem.getPrimaryCulture() != null ? historyItem.getPrimaryCulture().getName() : null;
        this.religion = historyItem.getReligion() != null ? historyItem.getReligion().getName() : null;
        this.joinLeague = historyItem.getJoinLeague() != null ? historyItem.getJoinLeague().getName() : null;
        this.addArmyProfessionalism = historyItem.getAddArmyProfessionalism();
        this.addAcceptedCulture = CollectionUtils.isNotEmpty(historyItem.getAddAcceptedCultures()) ? historyItem.getAddAcceptedCultures()
                                                                                                                .stream()
                                                                                                                .map(Culture::getName)
                                                                                                                .collect(Collectors.toList()) : null;
        this.removeAcceptedCulture = CollectionUtils.isNotEmpty(historyItem.getRemoveAcceptedCultures()) ? historyItem.getRemoveAcceptedCultures()
                                                                                                                      .stream()
                                                                                                                      .map(Culture::getName)
                                                                                                                      .collect(Collectors.toList()) : null;
        this.historicalFriend = CollectionUtils.isNotEmpty(historyItem.getHistoricalFriends()) ? historyItem.getHistoricalFriends()
                                                                                                            .stream()
                                                                                                            .map(Country::getTag)
                                                                                                            .collect(Collectors.toList()) : null;
        this.historicalRival = CollectionUtils.isNotEmpty(historyItem.getHistoricalEnemies()) ? historyItem.getHistoricalEnemies()
                                                                                                           .stream()
                                                                                                           .map(Country::getTag)
                                                                                                           .collect(Collectors.toList()) : null;
        this.elector = historyItem.getElector();
        this.clearScriptedPersonalities = historyItem.getClearScriptedPersonalities();
        this.addHeirPersonality = CollectionUtils.isNotEmpty(historyItem.getAddHeirPersonalities()) ? historyItem.getAddHeirPersonalities()
                                                                                                                 .stream()
                                                                                                                 .map(RulerPersonality::getName)
                                                                                                                 .collect(Collectors.toList()) : null;
        this.addRulerPersonality = CollectionUtils.isNotEmpty(historyItem.getAddRulerPersonalities()) ? historyItem.getAddRulerPersonalities()
                                                                                                                   .stream()
                                                                                                                   .map(RulerPersonality::getName)
                                                                                                                   .collect(Collectors.toList()) : null;
        this.addQueenPersonality = CollectionUtils.isNotEmpty(historyItem.getAddQueenPersonalities()) ? historyItem.getAddQueenPersonalities()
                                                                                                                   .stream()
                                                                                                                   .map(RulerPersonality::getName)
                                                                                                                   .collect(Collectors.toList()) : null;
        this.setEstatePrivilege = CollectionUtils.isNotEmpty(historyItem.getSetEstatePrivilege()) ? historyItem.getSetEstatePrivilege()
                                                                                                               .stream()
                                                                                                               .map(EstatePrivilege::getName)
                                                                                                               .collect(Collectors.toList()) : null;
        this.addGovernmentReform = CollectionUtils.isNotEmpty(historyItem.getAddGovernmentReform()) ? historyItem.getAddGovernmentReform()
                                                                                                                 .stream()
                                                                                                                 .map(GovernmentReform::getName)
                                                                                                                 .collect(Collectors.toList()) : null;
        this.setCountryFlag = historyItem.getSetCountryFlag();
        this.changeEstateLandShare = CollectionUtils.isNotEmpty(historyItem.getChangeEstateLandShares()) ? historyItem.getChangeEstateLandShares()
                                                                                                                      .stream()
                                                                                                                      .map(ChangeEstateLandShareDTO::new)
                                                                                                                      .collect(Collectors.toList()) : null;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getTechnologyGroup() {
        return technologyGroup;
    }

    public void setTechnologyGroup(String technologyGroup) {
        this.technologyGroup = technologyGroup;
    }

    public String getUnitType() {
        return unitType;
    }

    public void setUnitType(String unitType) {
        this.unitType = unitType;
    }

    public Integer getMercantilism() {
        return mercantilism;
    }

    public void setMercantilism(Integer mercantilism) {
        this.mercantilism = mercantilism;
    }

    public Integer getCapital() {
        return capital;
    }

    public void setCapital(Integer capital) {
        this.capital = capital;
    }

    public String getChangedTagFrom() {
        return changedTagFrom;
    }

    public void setChangedTagFrom(String changedTagFrom) {
        this.changedTagFrom = changedTagFrom;
    }

    public Integer getFixedCapital() {
        return fixedCapital;
    }

    public void setFixedCapital(Integer fixedCapital) {
        this.fixedCapital = fixedCapital;
    }

    public String getGovernment() {
        return government;
    }

    public void setGovernment(String government) {
        this.government = government;
    }

    public String getReligiousSchool() {
        return religiousSchool;
    }

    public void setReligiousSchool(String religiousSchool) {
        this.religiousSchool = religiousSchool;
    }

    public Power getNationalFocus() {
        return nationalFocus;
    }

    public void setNationalFocus(Power nationalFocus) {
        this.nationalFocus = nationalFocus;
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

    public String getReligion() {
        return religion;
    }

    public void setReligion(String religion) {
        this.religion = religion;
    }

    public String getJoinLeague() {
        return joinLeague;
    }

    public void setJoinLeague(String joinLeague) {
        this.joinLeague = joinLeague;
    }

    public Double getAddArmyProfessionalism() {
        return addArmyProfessionalism;
    }

    public void setAddArmyProfessionalism(Double addArmyProfessionalism) {
        this.addArmyProfessionalism = addArmyProfessionalism;
    }

    public List<String> getAddAcceptedCulture() {
        return addAcceptedCulture;
    }

    public void setAddAcceptedCulture(List<String> addAcceptedCulture) {
        this.addAcceptedCulture = addAcceptedCulture;
    }

    public List<String> getRemoveAcceptedCulture() {
        return removeAcceptedCulture;
    }

    public void setRemoveAcceptedCulture(List<String> removeAcceptedCulture) {
        this.removeAcceptedCulture = removeAcceptedCulture;
    }

    public List<String> getHistoricalFriend() {
        return historicalFriend;
    }

    public void setHistoricalFriend(List<String> historicalFriend) {
        this.historicalFriend = historicalFriend;
    }

    public List<String> getHistoricalRival() {
        return historicalRival;
    }

    public void setHistoricalRival(List<String> historicalRival) {
        this.historicalRival = historicalRival;
    }

    public Boolean getElector() {
        return elector;
    }

    public void setElector(Boolean elector) {
        this.elector = elector;
    }

    public Boolean getClearScriptedPersonalities() {
        return clearScriptedPersonalities;
    }

    public void setClearScriptedPersonalities(Boolean clearScriptedPersonalities) {
        this.clearScriptedPersonalities = clearScriptedPersonalities;
    }

    public List<String> getAddHeirPersonality() {
        return addHeirPersonality;
    }

    public void setAddHeirPersonality(List<String> addHeirPersonality) {
        this.addHeirPersonality = addHeirPersonality;
    }

    public List<String> getAddRulerPersonality() {
        return addRulerPersonality;
    }

    public void setAddRulerPersonality(List<String> addRulerPersonality) {
        this.addRulerPersonality = addRulerPersonality;
    }

    public List<String> getAddQueenPersonality() {
        return addQueenPersonality;
    }

    public void setAddQueenPersonality(List<String> addQueenPersonality) {
        this.addQueenPersonality = addQueenPersonality;
    }

    public List<String> getSetEstatePrivilege() {
        return setEstatePrivilege;
    }

    public void setSetEstatePrivilege(List<String> setEstatePrivilege) {
        this.setEstatePrivilege = setEstatePrivilege;
    }

    public List<String> getAddGovernmentReform() {
        return addGovernmentReform;
    }

    public void setAddGovernmentReform(List<String> addGovernmentReform) {
        this.addGovernmentReform = addGovernmentReform;
    }

    public List<String> getSetCountryFlag() {
        return setCountryFlag;
    }

    public void setSetCountryFlag(List<String> setCountryFlag) {
        this.setCountryFlag = setCountryFlag;
    }

    public List<ChangeEstateLandShareDTO> getChangeEstateLandShare() {
        return changeEstateLandShare;
    }

    public void setChangeEstateLandShare(List<ChangeEstateLandShareDTO> changeEstateLandShare) {
        this.changeEstateLandShare = changeEstateLandShare;
    }

    @Override
    public int compareTo(CountryHistoryDTO o) {
        if (this.date == null) {
            return o.date == null ? 0 : -1;
        } else if (o.date == null) {
            return 1;
        } else {
            return this.date.compareTo(o.date);
        }
    }
}

package fr.osallek.osamodeditor.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.osallek.eu4parser.model.game.Mission;
import fr.osallek.eu4parser.model.game.MissionsTree;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class MissionsTreeDTO implements MappedDTO<String> {

    private String name;

    private Integer slot;

    private Boolean isGeneric;

    private Boolean isAi;

    private Boolean hasCountryShield;

    private List<String> missions;

    public MissionsTreeDTO(MissionsTree missionsTree) {
        this.name = missionsTree.getName();
        this.slot = missionsTree.getSlot();
        this.isGeneric = missionsTree.isGeneric();
        this.isAi = missionsTree.isAi();
        this.hasCountryShield = missionsTree.hasCountryShield();
        this.missions = missionsTree.getMissions().stream().filter(Objects::nonNull).map(Mission::getName).collect(Collectors.toList());
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

    public List<String> getMissions() {
        return missions;
    }

    public void setMissions(List<String> missions) {
        this.missions = missions;
    }

    @Override
    @JsonIgnore
    public String toString() {
        return name;
    }
}

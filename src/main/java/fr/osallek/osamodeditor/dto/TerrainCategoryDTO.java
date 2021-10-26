package fr.osallek.osamodeditor.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.osallek.eu4parser.model.game.TerrainCategory;
import fr.osallek.eu4parser.model.game.localisation.Eu4Language;
import fr.osallek.eu4parser.model.game.localisation.Localisation;

import java.util.List;
import java.util.Map;

public class TerrainCategoryDTO extends LocalisedDTO implements MappedDTO<String> {

    private String name;

    private ColorDTO color;

    private Boolean isWater;

    private String soundType;

    private Boolean inlandSea;

    private Integer defence;

    private Integer allowedNumOfBuildings;

    private Integer supplyLimit;

    private Double movementCost;

    private Double localDevelopmentCost;

    private Double localDefensiveness;

    private List<Integer> provinces;

    public TerrainCategoryDTO(TerrainCategory terrainCategory, Map<String, Map<Eu4Language, Localisation>> localisations) {
        super(terrainCategory.getName(), localisations);
        this.name = terrainCategory.getName();
        this.color = terrainCategory.getColor() == null ? new ColorDTO(this.name, true) : new ColorDTO(terrainCategory.getColor());
        this.isWater = terrainCategory.isWater();
        this.soundType = terrainCategory.getSoundType();
        this.inlandSea = terrainCategory.isInlandSea();
        this.defence = terrainCategory.getDefence();
        this.allowedNumOfBuildings = terrainCategory.getAllowedNumOfBuildings();
        this.supplyLimit = terrainCategory.getSupplyLimit();
        this.movementCost = terrainCategory.getMovementCost();
        this.localDevelopmentCost = terrainCategory.getLocalDevelopmentCost();
        this.localDefensiveness = terrainCategory.getLocalDefensiveness();
        this.provinces = terrainCategory.getProvinces();
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

    public ColorDTO getColor() {
        return color;
    }

    public void setColor(ColorDTO color) {
        this.color = color;
    }

    public Boolean isWater() {
        return isWater;
    }

    public void setWater(Boolean water) {
        this.isWater = water;
    }

    public String getSoundType() {
        return soundType;
    }

    public void setSoundType(String soundType) {
        this.soundType = soundType;
    }

    public Boolean isInlandSea() {
        return inlandSea;
    }

    public void setInlandSea(Boolean inlandSea) {
        this.inlandSea = inlandSea;
    }

    public Integer getDefence() {
        return defence;
    }

    public void setDefence(Integer defence) {
        this.defence = defence;
    }

    public Integer getAllowedNumOfBuildings() {
        return allowedNumOfBuildings;
    }

    public void setAllowedNumOfBuildings(Integer allowedNumOfBuildings) {
        this.allowedNumOfBuildings = allowedNumOfBuildings;
    }

    public Integer getSupplyLimit() {
        return supplyLimit;
    }

    public void setSupplyLimit(Integer supplyLimit) {
        this.supplyLimit = supplyLimit;
    }

    public Double getMovementCost() {
        return movementCost;
    }

    public void setMovementCost(Double movementCost) {
        this.movementCost = movementCost;
    }

    public Double getLocalDevelopmentCost() {
        return localDevelopmentCost;
    }

    public void setLocalDevelopmentCost(Double localDevelopmentCost) {
        this.localDevelopmentCost = localDevelopmentCost;
    }

    public Double getLocalDefensiveness() {
        return localDefensiveness;
    }

    public void setLocalDefensiveness(Double localDefensiveness) {
        this.localDefensiveness = localDefensiveness;
    }

    public List<Integer> getProvinces() {
        return provinces;
    }

    public void setProvinces(List<Integer> provinces) {
        this.provinces = provinces;
    }
}

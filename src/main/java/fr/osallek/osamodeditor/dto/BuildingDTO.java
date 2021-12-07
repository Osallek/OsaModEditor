package fr.osallek.osamodeditor.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.osallek.eu4parser.model.game.Building;
import fr.osallek.eu4parser.model.game.localisation.Eu4Language;
import fr.osallek.eu4parser.model.game.localisation.Localisation;
import org.apache.commons.collections4.CollectionUtils;

import java.util.List;
import java.util.Map;

public class BuildingDTO extends LocalisedDTO implements MappedDTO<String> {

    private String name;

    private String sprite;

    private Integer cost;

    private Integer time;

    private String makeObsolete;

    private Boolean onePerCountry;

    private Boolean allowInGoldProvince;

    private Boolean indestructible;

    private Boolean onMap;

    private Boolean influencingFort;

    private List<String> manufactoryFor;

    private List<String> bonusManufactoryFor;

    private Boolean governmentSpecific;

    private Boolean showSeparate;

    private ModifiersDTO modifiers;

    public BuildingDTO(Building building, Map<String, Map<Eu4Language, Localisation>> localisations) {
        super(localisations, building.getName(), List.of("building_" + building.getName()));
        this.name = building.getName();
        this.sprite = building.getSprite().getTextureFilePath("png").toString();
        this.cost = building.getCost();
        this.time = building.getTime();
        this.makeObsolete = building.getMakeObsolete();
        this.onePerCountry = building.onePerCountry();
        this.allowInGoldProvince = building.allowInGoldProvince();
        this.indestructible = building.indestructible();
        this.onMap = building.onMap();
        this.influencingFort = building.influencingFort();

        if (CollectionUtils.isNotEmpty(building.getManufactoryFor())) {
            this.manufactoryFor = building.getManufactoryFor();
        }

        if (CollectionUtils.isNotEmpty(building.getBonusManufactory())) {
            this.bonusManufactoryFor = building.getBonusManufactory();
        }

        this.governmentSpecific = building.governmentSpecific();
        this.showSeparate = building.showSeparate();

        if (!building.getModifiers().isEmpty()) {
            this.modifiers = new ModifiersDTO(building.getModifiers());
        }
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

    public String getSprite() {
        return sprite;
    }

    public void setSprite(String sprite) {
        this.sprite = sprite;
    }

    public Integer getCost() {
        return cost;
    }

    public void setCost(Integer cost) {
        this.cost = cost;
    }

    public Integer getTime() {
        return time;
    }

    public void setTime(Integer time) {
        this.time = time;
    }

    public String getMakeObsolete() {
        return makeObsolete;
    }

    public void setMakeObsolete(String makeObsolete) {
        this.makeObsolete = makeObsolete;
    }

    public Boolean getOnePerCountry() {
        return onePerCountry;
    }

    public void setOnePerCountry(Boolean onePerCountry) {
        this.onePerCountry = onePerCountry;
    }

    public Boolean getAllowInGoldProvince() {
        return allowInGoldProvince;
    }

    public void setAllowInGoldProvince(Boolean allowInGoldProvince) {
        this.allowInGoldProvince = allowInGoldProvince;
    }

    public Boolean getIndestructible() {
        return indestructible;
    }

    public void setIndestructible(Boolean indestructible) {
        this.indestructible = indestructible;
    }

    public Boolean getOnMap() {
        return onMap;
    }

    public void setOnMap(Boolean onMap) {
        this.onMap = onMap;
    }

    public Boolean getInfluencingFort() {
        return influencingFort;
    }

    public void setInfluencingFort(Boolean influencingFort) {
        this.influencingFort = influencingFort;
    }

    public List<String> getManufactoryFor() {
        return manufactoryFor;
    }

    public void setManufactoryFor(List<String> manufactoryFor) {
        this.manufactoryFor = manufactoryFor;
    }

    public List<String> getBonusManufactoryFor() {
        return bonusManufactoryFor;
    }

    public void setBonusManufactoryFor(List<String> bonusManufactoryFor) {
        this.bonusManufactoryFor = bonusManufactoryFor;
    }

    public Boolean getGovernmentSpecific() {
        return governmentSpecific;
    }

    public void setGovernmentSpecific(Boolean governmentSpecific) {
        this.governmentSpecific = governmentSpecific;
    }

    public Boolean getShowSeparate() {
        return showSeparate;
    }

    public void setShowSeparate(Boolean showSeparate) {
        this.showSeparate = showSeparate;
    }

    public ModifiersDTO getModifiers() {
        return modifiers;
    }

    public void setModifiers(ModifiersDTO modifiers) {
        this.modifiers = modifiers;
    }

    @Override
    @JsonIgnore
    public String toString() {
        return name;
    }
}

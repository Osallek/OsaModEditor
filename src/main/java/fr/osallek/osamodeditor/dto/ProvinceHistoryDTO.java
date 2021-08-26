package fr.osallek.osamodeditor.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.osallek.eu4parser.model.game.Province;

public class ProvinceDTO implements MappedDTO<Integer> {

    private int id;

    private ColorDTO color;

    private String name;

    private boolean isOcean;

    private boolean isLake;

    private String climate;

    private boolean impassable;

    private String winter;

    private boolean isPort;

    private String area;

    private String continent;

    private String tradeNode;

    private String owner;

    private String tradeGood;

    private String region;

    private String superRegion;

    private String religion;

    private String culture;

    public ProvinceDTO(Province province) {
        this.id = province.getId();
        this.color = new ColorDTO(province.getColor(), false);
        this.name = province.getName();
        this.isOcean = province.isOcean();
        this.isLake = province.isLake();
        this.climate = province.getClimate();
        this.impassable = province.isImpassable();
        this.winter = province.getWinter();
        this.isPort = province.isPort();
        this.continent = province.getContinent() == null ? null : province.getContinent().getName();

        if (province.getArea() != null) {
            this.area = province.getArea().getName();
            this.region = province.getArea().getRegion().getName();
            this.superRegion = province.getArea().getRegion().getSuperRegion().getName();
        }

        if (province.getDefaultHistoryItem() != null) {
            this.owner = province.getDefaultHistoryItem().getOwner();
            this.tradeGood = province.getDefaultHistoryItem().getTradeGoods();
            this.religion = province.getDefaultHistoryItem().getReligion();
            this.culture = province.getDefaultHistoryItem().getCulture();
        }
    }

    @Override
    @JsonIgnore
    public Integer getKey() {
        return this.id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public ColorDTO getColor() {
        return color;
    }

    public void setColor(ColorDTO color) {
        this.color = color;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isOcean() {
        return isOcean;
    }

    public void setOcean(boolean ocean) {
        isOcean = ocean;
    }

    public boolean isLake() {
        return isLake;
    }

    public void setLake(boolean lake) {
        isLake = lake;
    }

    public String getClimate() {
        return climate;
    }

    public void setClimate(String climate) {
        this.climate = climate;
    }

    public boolean isImpassable() {
        return impassable;
    }

    public void setImpassable(boolean impassable) {
        this.impassable = impassable;
    }

    public String getWinter() {
        return winter;
    }

    public void setWinter(String winter) {
        this.winter = winter;
    }

    public boolean isPort() {
        return isPort;
    }

    public void setPort(boolean port) {
        isPort = port;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getSuperRegion() {
        return superRegion;
    }

    public void setSuperRegion(String superRegion) {
        this.superRegion = superRegion;
    }

    public String getContinent() {
        return continent;
    }

    public void setContinent(String continent) {
        this.continent = continent;
    }

    public String getTradeNode() {
        return tradeNode;
    }

    public void setTradeNode(String tradeNode) {
        this.tradeNode = tradeNode;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getTradeGood() {
        return tradeGood;
    }

    public void setTradeGood(String tradeGood) {
        this.tradeGood = tradeGood;
    }

    public String getReligion() {
        return religion;
    }

    public void setReligion(String religion) {
        this.religion = religion;
    }

    public String getCulture() {
        return culture;
    }

    public void setCulture(String culture) {
        this.culture = culture;
    }
}

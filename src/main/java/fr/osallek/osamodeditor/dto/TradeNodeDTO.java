package fr.osallek.osamodeditor.dto;

import fr.osallek.eu4parser.model.Color;
import fr.osallek.eu4parser.model.game.Province;

public class ProvinceDTO {

    private int id;

    private Integer color;

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

    public ProvinceDTO(Province province, String tradeNode) {
        this.id = province.getId();
        this.color = province.getColor();
        this.name = province.getName();
        this.isOcean = province.isOcean();
        this.isLake = province.isLake();
        this.climate = province.getClimate();
        this.impassable = province.isImpassable();
        this.winter = province.getWinter();
        this.isPort = province.isPort();
        this.area = province.getArea().getName();
        this.continent = province.getContinent().getName();
        this.tradeNode = tradeNode;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Integer getColor() {
        return color;
    }

    public void setColor(Integer color) {
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
}

package fr.osallek.osamodeditor.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.osallek.eu4parser.model.game.ProvinceHistoryItem;
import org.apache.commons.lang3.StringUtils;

import java.time.LocalDate;

public class ProvinceHistoryDTO {

    private LocalDate date;

    private String owner;

    private boolean fakeOwner;

    private String controller;

    private boolean fakeController;

    private String tradeGood;

    private boolean fakeTradeGood;

    private String religion;

    private boolean fakeReligion;

    private String culture;

    private boolean fakeCulture;

    private Boolean hre;

    private boolean fakeHre;

    private Integer manpower;

    private boolean fakeManpower;

    private Integer tax;

    private boolean fakeTax;

    private Integer production;

    private boolean fakeProduction;

    public ProvinceHistoryDTO(LocalDate date, ProvinceHistoryItem historyItem) {
        this.date = date;
        this.owner = historyItem.getOwner() == null ? null : historyItem.getOwner().getTag();
        this.controller = historyItem.getController() == null ? null : historyItem.getController().getTag();
        this.tradeGood = historyItem.getTradeGoods() == null ? null : historyItem.getTradeGoods().getName();
        this.religion = historyItem.getReligion() == null ? null : historyItem.getReligion().getName();
        this.culture = historyItem.getCulture() == null ? null : historyItem.getCulture().getName();
        this.hre = historyItem.getHre();
        this.manpower = historyItem.getBaseManpower();
        this.production = historyItem.getBaseProduction();
        this.tax = historyItem.getBaseTax();
    }

    public ProvinceHistoryDTO(ProvinceHistoryDTO other) {
        this.date = other.date;
        this.owner = other.owner;
        this.fakeOwner = other.fakeOwner;
        this.controller = other.controller;
        this.fakeController = other.fakeController;
        this.tradeGood = other.tradeGood;
        this.fakeTradeGood = other.fakeTradeGood;
        this.religion = other.religion;
        this.fakeReligion = other.fakeReligion;
        this.culture = other.culture;
        this.fakeCulture = other.fakeCulture;
        this.hre = other.hre;
        this.fakeHre = other.fakeHre;
        this.manpower = other.manpower;
        this.fakeManpower = other.fakeManpower;
        this.tax = other.tax;
        this.fakeTax = other.fakeTax;
        this.production = other.production;
        this.fakeProduction = other.fakeProduction;
    }

    @JsonIgnore
    public void combine(ProvinceHistoryDTO other) {
        this.date = other.date;

        if (StringUtils.isNotBlank(other.owner)) {
            this.owner = other.owner;
        } else {
            this.fakeOwner = true;
        }

        if (StringUtils.isNotBlank(other.controller)) {
            this.controller = other.controller;
        } else {
            this.fakeController = true;
        }

        if (StringUtils.isNotBlank(other.tradeGood)) {
            this.tradeGood = other.tradeGood;
        } else {
            this.fakeTradeGood = true;
        }

        if (StringUtils.isNotBlank(other.religion)) {
            this.religion = other.religion;
        } else {
            this.fakeReligion = true;
        }

        if (StringUtils.isNotBlank(other.culture)) {
            this.culture = other.culture;
        } else {
            this.fakeCulture = true;
        }

        if (other.hre != null) {
            this.hre = other.hre;
        } else {
            this.fakeHre = true;
        }

        if (other.manpower != null) {
            this.manpower = other.manpower;
        } else {
            this.fakeManpower = true;
        }

        if (other.tax != null) {
            this.tax = other.tax;
        } else {
            this.fakeTax = true;
        }

        if (other.production != null) {
            this.production = other.production;
        } else {
            this.fakeProduction = true;
        }
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public boolean isFakeOwner() {
        return fakeOwner;
    }

    public void setFakeOwner(boolean fakeOwner) {
        this.fakeOwner = fakeOwner;
    }

    public String getController() {
        return controller;
    }

    public void setController(String controller) {
        this.controller = controller;
    }

    public boolean isFakeController() {
        return fakeController;
    }

    public void setFakeController(boolean fakeController) {
        this.fakeController = fakeController;
    }

    public String getTradeGood() {
        return tradeGood;
    }

    public void setTradeGood(String tradeGood) {
        this.tradeGood = tradeGood;
    }

    public boolean isFakeTradeGood() {
        return fakeTradeGood;
    }

    public void setFakeTradeGood(boolean fakeTradeGood) {
        this.fakeTradeGood = fakeTradeGood;
    }

    public String getReligion() {
        return religion;
    }

    public void setReligion(String religion) {
        this.religion = religion;
    }

    public boolean isFakeReligion() {
        return fakeReligion;
    }

    public void setFakeReligion(boolean fakeReligion) {
        this.fakeReligion = fakeReligion;
    }

    public String getCulture() {
        return culture;
    }

    public void setCulture(String culture) {
        this.culture = culture;
    }

    public boolean isFakeCulture() {
        return fakeCulture;
    }

    public void setFakeCulture(boolean fakeCulture) {
        this.fakeCulture = fakeCulture;
    }

    public Boolean getHre() {
        return hre;
    }

    public void setHre(Boolean hre) {
        this.hre = hre;
    }

    public boolean isFakeHre() {
        return fakeHre;
    }

    public void setFakeHre(boolean fakeHre) {
        this.fakeHre = fakeHre;
    }

    public Integer getManpower() {
        return manpower;
    }

    public void setManpower(Integer manpower) {
        this.manpower = manpower;
    }

    public boolean isFakeManpower() {
        return fakeManpower;
    }

    public void setFakeManpower(boolean fakeManpower) {
        this.fakeManpower = fakeManpower;
    }

    public Integer getTax() {
        return tax;
    }

    public void setTax(Integer tax) {
        this.tax = tax;
    }

    public boolean isFakeTax() {
        return fakeTax;
    }

    public void setFakeTax(boolean fakeTax) {
        this.fakeTax = fakeTax;
    }

    public Integer getProduction() {
        return production;
    }

    public void setProduction(Integer production) {
        this.production = production;
    }

    public boolean isFakeProduction() {
        return fakeProduction;
    }

    public void setFakeProduction(boolean fakeProduction) {
        this.fakeProduction = fakeProduction;
    }
}

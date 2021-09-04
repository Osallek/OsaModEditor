package fr.osallek.osamodeditor.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.osallek.eu4parser.model.game.TradeGood;
import fr.osallek.eu4parser.model.game.localisation.Eu4Language;

import java.util.Map;

public class TradeGoodDTO extends LocalisedDTO implements MappedDTO<String> {

    private String name;

    private String localizedName;

    private ColorDTO color;

    private boolean goldType;

    private double basePrice;

    public TradeGoodDTO(TradeGood tradeGood, Map<Eu4Language, Map<String, String>> localisations) {
        super(tradeGood.getName(), localisations);
        this.name = tradeGood.getName();
        this.localizedName = tradeGood.getLocalizedName();
        this.color = tradeGood.getColor() == null ? new ColorDTO(this.name, true) : new ColorDTO(tradeGood.getColor());
        this.goldType = tradeGood.isGoldType();
        this.basePrice = tradeGood.getBasePrice();
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

    public String getLocalizedName() {
        return localizedName;
    }

    public void setLocalizedName(String localizedName) {
        this.localizedName = localizedName;
    }

    public ColorDTO getColor() {
        return color;
    }

    public void setColor(ColorDTO color) {
        this.color = color;
    }

    public boolean isGoldType() {
        return goldType;
    }

    public void setGoldType(boolean goldType) {
        this.goldType = goldType;
    }

    public double getBasePrice() {
        return basePrice;
    }

    public void setBasePrice(double basePrice) {
        this.basePrice = basePrice;
    }
}

package fr.osallek.osamodeditor.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.osallek.eu4parser.model.game.TradeGood;
import fr.osallek.eu4parser.model.game.localisation.Eu4Language;
import fr.osallek.eu4parser.model.game.localisation.Localisation;

import java.util.Map;

public class TradeGoodDTO extends LocalisedDTO implements MappedDTO<String> {

    private String name;

    private ColorDTO color;

    private Boolean goldType;

    private Double basePrice;

    public TradeGoodDTO(TradeGood tradeGood, Map<String, Map<Eu4Language, Localisation>> localisations) {
        super(tradeGood.getName(), localisations);
        this.name = tradeGood.getName();
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

    public ColorDTO getColor() {
        return color;
    }

    public void setColor(ColorDTO color) {
        this.color = color;
    }

    public Boolean isGoldType() {
        return goldType;
    }

    public void setGoldType(Boolean goldType) {
        this.goldType = goldType;
    }

    public Double getBasePrice() {
        return basePrice;
    }

    public void setBasePrice(Double basePrice) {
        this.basePrice = basePrice;
    }
}

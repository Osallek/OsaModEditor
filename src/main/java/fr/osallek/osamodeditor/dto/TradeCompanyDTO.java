package fr.osallek.osamodeditor.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.osallek.eu4parser.model.game.TradeCompany;
import fr.osallek.eu4parser.model.game.localisation.Eu4Language;

import java.util.List;
import java.util.Map;

public class TradeCompanyDTO extends LocalisedDTO implements MappedDTO<String> {

    private String name;

    private List<Integer> provinces;

    private ColorDTO color;

    public TradeCompanyDTO(TradeCompany tradeCompany, Map<Eu4Language, Map<String, String>> localisations) {
        super(tradeCompany.getName(), localisations);
        this.name = tradeCompany.getName();
        this.provinces = tradeCompany.getProvinces();
        this.color = tradeCompany.getColor() == null ? new ColorDTO(this.name, true) : new ColorDTO(tradeCompany.getColor());
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

    public List<Integer> getProvinces() {
        return provinces;
    }

    public void setProvinces(List<Integer> provinces) {
        this.provinces = provinces;
    }

    public ColorDTO getColor() {
        return color;
    }

    public void setColor(ColorDTO color) {
        this.color = color;
    }

    @Override
    @JsonIgnore
    public String toString() {
        return name;
    }
}

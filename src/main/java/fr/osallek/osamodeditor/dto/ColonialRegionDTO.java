package fr.osallek.osamodeditor.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.osallek.eu4parser.model.game.ColonialRegion;
import fr.osallek.eu4parser.model.game.localisation.Eu4Language;
import fr.osallek.eu4parser.model.game.localisation.Localisation;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class ColonialRegionDTO extends LocalisedDTO implements MappedDTO<String> {

    private String name;

    private ColorDTO color;

    private Integer taxIncome;

    private Integer nativeSize;

    private Integer nativeFerocity;

    private Integer nativeHostileness;

    private Map<String, Integer> tradeGoods;

    private Map<String, Integer> cultures;

    private Map<String, Integer> religions;

    private List<Integer> provinces;

    public ColonialRegionDTO(ColonialRegion colonialRegion, Map<String, Map<Eu4Language, Localisation>> localisations) {
        super(colonialRegion.getName(), localisations);
        this.name = colonialRegion.getName();
        this.color = colonialRegion.getColor() == null ? new ColorDTO(this.name, true) : new ColorDTO(colonialRegion.getColor());
        this.taxIncome = colonialRegion.getTaxIncome();
        this.nativeSize = colonialRegion.getNativeSize();
        this.nativeFerocity = colonialRegion.getNativeFerocity();
        this.nativeHostileness = colonialRegion.getNativeHostileness();
        this.tradeGoods = colonialRegion.getTradeGoods() == null ? new HashMap<>() : colonialRegion.getTradeGoods()
                                                                                                   .entrySet()
                                                                                                   .stream()
                                                                                                   .collect(Collectors.toMap(entry -> entry.getKey().getName(),
                                                                                                                             Map.Entry::getValue));
        this.cultures = colonialRegion.getCultures() == null ? new HashMap<>() : colonialRegion.getCultures()
                                                                                               .entrySet()
                                                                                               .stream()
                                                                                               .collect(Collectors.toMap(entry -> entry.getKey().getName(),
                                                                                                                         Map.Entry::getValue));
        this.religions = colonialRegion.getReligions() == null ? new HashMap<>() : colonialRegion.getReligions()
                                                                                                 .entrySet()
                                                                                                 .stream()
                                                                                                 .collect(Collectors.toMap(entry -> entry.getKey().getName(),
                                                                                                                           Map.Entry::getValue));
        this.provinces = colonialRegion.getProvinces();
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

    public Integer getTaxIncome() {
        return taxIncome;
    }

    public void setTaxIncome(Integer taxIncome) {
        this.taxIncome = taxIncome;
    }

    public Integer getNativeSize() {
        return nativeSize;
    }

    public void setNativeSize(Integer nativeSize) {
        this.nativeSize = nativeSize;
    }

    public Integer getNativeFerocity() {
        return nativeFerocity;
    }

    public void setNativeFerocity(Integer nativeFerocity) {
        this.nativeFerocity = nativeFerocity;
    }

    public Integer getNativeHostileness() {
        return nativeHostileness;
    }

    public void setNativeHostileness(Integer nativeHostileness) {
        this.nativeHostileness = nativeHostileness;
    }

    public Map<String, Integer> getTradeGoods() {
        return tradeGoods;
    }

    public void setTradeGoods(Map<String, Integer> tradeGoods) {
        this.tradeGoods = tradeGoods;
    }

    public Map<String, Integer> getCultures() {
        return cultures;
    }

    public void setCultures(Map<String, Integer> cultures) {
        this.cultures = cultures;
    }

    public Map<String, Integer> getReligions() {
        return religions;
    }

    public void setReligions(Map<String, Integer> religions) {
        this.religions = religions;
    }

    public List<Integer> getProvinces() {
        return provinces;
    }

    public void setProvinces(List<Integer> provinces) {
        this.provinces = provinces;
    }
}

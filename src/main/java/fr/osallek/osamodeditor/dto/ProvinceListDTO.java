package fr.osallek.osamodeditor.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.osallek.eu4parser.model.game.ProvinceList;
import fr.osallek.eu4parser.model.game.localisation.Eu4Language;

import java.util.List;
import java.util.Map;
import java.util.function.Function;

public class ProvinceListDTO extends LocalisedDTO implements MappedDTO<String> {

    private String name;

    private ColorDTO color;

    private List<Integer> provinces;

    private boolean fake;

    public ProvinceListDTO(ProvinceList list, Map<Eu4Language, Map<String, String>> localisations, Function<ProvinceList, ColorDTO> colorFunction) {
        super(list.getLocalizationKey(), localisations);
        this.name = list.getName();
        this.color = colorFunction.apply(list);
        this.provinces = list.getProvinces();
        this.fake = list.isFake();
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

    public List<Integer> getProvinces() {
        return provinces;
    }

    public void setProvinces(List<Integer> provinces) {
        this.provinces = provinces;
    }

    public boolean isFake() {
        return fake;
    }

    public void setFake(boolean fake) {
        this.fake = fake;
    }

    @Override
    @JsonIgnore
    public String toString() {
        return name;
    }
}

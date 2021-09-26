package fr.osallek.osamodeditor.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.osallek.eu4parser.common.Eu4Utils;
import fr.osallek.eu4parser.model.game.Province;
import fr.osallek.eu4parser.model.game.localisation.Eu4Language;
import org.apache.commons.collections4.MapUtils;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class ProvinceDTO extends LocalisedDTO implements MappedDTO<Integer> {

    private int id;

    private ColorDTO color;

    private String name;

    private boolean isOcean;

    private boolean isLake;

    private String climate;

    private String monsoon;

    private String winter;

    private String terrain;

    private boolean isPort;

    private String area;

    private String continent;

    private String tradeNode;

    private String region;

    private String superRegion;

    private String colonialRegion;

    private String tradeCompany;

    private List<ProvinceHistoryDTO> history;

    private boolean historyFromMod;

    public ProvinceDTO(Province province, Map<Eu4Language, Map<String, String>> localisations) {
        super("PROV" + province.getId(), localisations);
        this.id = province.getId();
        addToEndLocalisations(" (" + this.id + ")");
        this.color = new ColorDTO(province.getColor(), false);
        this.name = province.getName();
        this.isOcean = province.isOcean();
        this.isLake = province.isLake();
        this.isPort = province.isPort();
        this.continent = province.getContinent() == null ? null : province.getContinent().getName();
        this.historyFromMod = province.getHistoryFileNode() != null && province.getHistoryFileNode().fromMod();

        if (province.getArea() != null) {
            this.area = province.getArea().getName();
            this.region = province.getArea().getRegion().getName();
            this.superRegion = province.getArea().getRegion().getSuperRegion().getName();
        }

        if (province.getDefaultHistoryItem() != null) {
            this.history = new ArrayList<>();
            this.history.add(new ProvinceHistoryDTO(null, province.getDefaultHistoryItem()));

            if (MapUtils.isNotEmpty(province.getHistoryItems())) {
                List<ProvinceHistoryDTO> histories = province.getHistoryItems()
                                                             .entrySet()
                                                             .stream()
                                                             .map(entry -> new ProvinceHistoryDTO(entry.getKey(), entry.getValue()))
                                                             .sorted(Comparator.nullsFirst(Comparator.comparing(ProvinceHistoryDTO::getDate)))
                                                             .collect(Collectors.toList());

                ProvinceHistoryDTO dto = new ProvinceHistoryDTO(this.history.iterator().next());
                for (ProvinceHistoryDTO historyDTO : histories) {
                    dto.combine(historyDTO);
                    this.history.add(new ProvinceHistoryDTO(dto));
                }
            }
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

    public String getMonsoon() {
        return monsoon;
    }

    public void setMonsoon(String monsoon) {
        this.monsoon = monsoon;
    }

    public boolean isImpassable() {
        return Eu4Utils.IMPASSABLE_CLIMATE.equals(this.climate); //Not from province because it can change
    }

    public String getWinter() {
        return winter;
    }

    public void setWinter(String winter) {
        this.winter = winter;
    }

    public String getTerrain() {
        return terrain;
    }

    public void setTerrain(String terrain) {
        this.terrain = terrain;
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

    public String getColonialRegion() {
        return colonialRegion;
    }

    public void setColonialRegion(String colonialRegion) {
        this.colonialRegion = colonialRegion;
    }

    public String getTradeCompany() {
        return tradeCompany;
    }

    public void setTradeCompany(String tradeCompany) {
        this.tradeCompany = tradeCompany;
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

    public List<ProvinceHistoryDTO> getHistory() {
        return history;
    }

    public void setHistory(List<ProvinceHistoryDTO> history) {
        this.history = history;
    }

    public boolean isHistoryFromMod() {
        return historyFromMod;
    }

    public void setHistoryFromMod(boolean historyFromMod) {
        this.historyFromMod = historyFromMod;
    }
}

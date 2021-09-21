package fr.osallek.osamodeditor.dto;

import fr.osallek.eu4parser.common.Eu4MapUtils;
import fr.osallek.eu4parser.common.Eu4Utils;
import fr.osallek.eu4parser.model.game.Define;
import fr.osallek.eu4parser.model.game.Game;
import org.apache.commons.collections4.CollectionUtils;
import org.geojson.FeatureCollection;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

public class GameDTO {

    private LocalDate startDate;

    private LocalDate endDate;

    private FeatureCollection geoJson;

    private Map<Integer, ProvinceDTO> provinces;

    private Map<String, TradeNodeDTO> tradeNodes;

    private Map<String, CountryDTO> countries;

    private Map<String, TradeGoodDTO> tradeGoods;

    private Map<String, AreaDTO> areas;

    private Map<String, RegionDTO> regions;

    private Map<String, SuperRegionDTO> superRegions;

    private Map<String, ReligionDTO> religions;

    private Map<String, CultureDTO> cultures;

    private Map<LocalDate, String> hreEmperors;

    private Map<LocalDate, String> celestialEmperors;

    private Map<String, Map<String, String>> defines;

    public GameDTO(Game game) throws IOException {
        this.startDate = game.getStartDate();
        this.endDate = game.getEndDate();
        this.geoJson = Eu4MapUtils.generateGeoJson(game);
        this.provinces = game.getProvinces()
                             .values()
                             .stream()
                             .map(province -> new ProvinceDTO(province, game.getAllLocalisations()))
                             .collect(Collectors.toMap(MappedDTO::getKey, Function.identity()));

        this.tradeNodes = game.getTradeNodes()
                              .stream()
                              .map(tradeNode -> new TradeNodeDTO(tradeNode, game.getAllLocalisations()))
                              .collect(Collectors.toMap(TradeNodeDTO::getKey, Function.identity()));
        game.getTradeNodes().forEach(tradeNode -> tradeNode.getProvinces().forEach(id -> this.provinces.get(id).setTradeNode(tradeNode.getName())));

        this.countries = game.getCountries()
                             .stream()
                             .map(country -> new CountryDTO(country, game.getAllLocalisations()))
                             .collect(Collectors.toMap(MappedDTO::getKey, Function.identity()));

        this.tradeGoods = game.getTradeGoods()
                              .stream()
                              .map(tradeGood -> new TradeGoodDTO(tradeGood, game.getAllLocalisations()))
                              .collect(Collectors.toMap(MappedDTO::getKey, Function.identity()));

        this.areas = game.getAreas()
                         .stream()
                         .map(area -> new AreaDTO(area, game.getAllLocalisations()))
                         .collect(Collectors.toMap(MappedDTO::getKey, Function.identity()));
        game.getAreas().forEach(area -> area.getProvinces().forEach(id -> this.provinces.get(id).setArea(area.getName())));

        this.regions = game.getRegions()
                           .stream()
                           .map(region -> new RegionDTO(region, game.getAllLocalisations()))
                           .collect(Collectors.toMap(MappedDTO::getKey, Function.identity()));
        game.getRegions()
            .stream()
            .filter(region -> CollectionUtils.isNotEmpty(region.getAreas()))
            .forEach(region -> region.getAreas().forEach(area -> area.getProvinces().forEach(id -> this.provinces.get(id).setRegion(region.getName()))));

        this.superRegions = game.getSuperRegions()
                                .stream()
                                .map(superRegion -> new SuperRegionDTO(superRegion, game.getAllLocalisations()))
                                .collect(Collectors.toMap(MappedDTO::getKey, Function.identity()));
        game.getSuperRegions()
            .stream()
            .filter(superRegion -> CollectionUtils.isNotEmpty(superRegion.getRegions()))
            .forEach(sp -> sp.getRegions()
                             .stream()
                             .filter(r -> CollectionUtils.isNotEmpty(r.getAreas()))
                             .forEach(r -> r.getAreas().forEach(a -> a.getProvinces()
                                                                      .forEach(id -> this.provinces.get(id).setSuperRegion(sp.getName())))));

        this.religions = game.getReligions()
                             .stream()
                             .map(religion -> new ReligionDTO(religion, game.getAllLocalisations()))
                             .collect(Collectors.toMap(MappedDTO::getKey, Function.identity()));

        this.cultures = game.getCultures()
                            .stream()
                            .map(culture -> new CultureDTO(culture, game.getAllLocalisations()))
                            .collect(Collectors.toMap(MappedDTO::getKey, Function.identity()));

        this.hreEmperors = game.getHreEmperors().entrySet().stream().collect(Collectors.toMap(Map.Entry::getKey, entry -> entry.getValue().getTag()));

        this.celestialEmperors = game.getCelestialEmperors()
                                     .entrySet()
                                     .stream()
                                     .collect(Collectors.toMap(Map.Entry::getKey, entry -> entry.getValue().getTag()));
        this.defines = game.getDefines()
                           .get(Eu4Utils.DEFINE_KEY)
                           .values()
                           .stream()
                           .map(Map::values)
                           .flatMap(Collection::stream)
                           .collect(Collectors.groupingBy(Define::getCategory, LinkedHashMap::new,
                                                          Collectors.toMap(Define::getName, Define::getAsString, (s, s2) -> s, LinkedHashMap::new)));
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public FeatureCollection getGeoJson() {
        return geoJson;
    }

    public void setGeoJson(FeatureCollection geoJson) {
        this.geoJson = geoJson;
    }

    public Map<String, TradeNodeDTO> getTradeNodes() {
        return tradeNodes;
    }

    public void setTradeNodes(Map<String, TradeNodeDTO> tradeNodes) {
        this.tradeNodes = tradeNodes;
    }

    public Map<Integer, ProvinceDTO> getProvinces() {
        return provinces;
    }

    public void setProvinces(Map<Integer, ProvinceDTO> provinces) {
        this.provinces = provinces;
    }

    public Map<String, CountryDTO> getCountries() {
        return countries;
    }

    public void setCountries(Map<String, CountryDTO> countries) {
        this.countries = countries;
    }

    public Map<String, TradeGoodDTO> getTradeGoods() {
        return tradeGoods;
    }

    public void setTradeGoods(Map<String, TradeGoodDTO> tradeGoods) {
        this.tradeGoods = tradeGoods;
    }

    public Map<String, AreaDTO> getAreas() {
        return areas;
    }

    public void setAreas(Map<String, AreaDTO> areas) {
        this.areas = areas;
    }

    public Map<String, RegionDTO> getRegions() {
        return regions;
    }

    public void setRegions(Map<String, RegionDTO> regions) {
        this.regions = regions;
    }

    public Map<String, SuperRegionDTO> getSuperRegions() {
        return superRegions;
    }

    public void setSuperRegions(Map<String, SuperRegionDTO> superRegions) {
        this.superRegions = superRegions;
    }

    public Map<String, ReligionDTO> getReligions() {
        return religions;
    }

    public void setReligions(Map<String, ReligionDTO> religions) {
        this.religions = religions;
    }

    public Map<String, CultureDTO> getCultures() {
        return cultures;
    }

    public void setCultures(Map<String, CultureDTO> cultures) {
        this.cultures = cultures;
    }

    public Map<LocalDate, String> getHreEmperors() {
        return hreEmperors;
    }

    public void setHreEmperors(Map<LocalDate, String> hreEmperors) {
        this.hreEmperors = hreEmperors;
    }

    public Map<LocalDate, String> getCelestialEmperors() {
        return celestialEmperors;
    }

    public void setCelestialEmperors(Map<LocalDate, String> celestialEmperors) {
        this.celestialEmperors = celestialEmperors;
    }

    public Map<String, Map<String, String>> getDefines() {
        return defines;
    }

    public void setDefines(Map<String, Map<String, String>> defines) {
        this.defines = defines;
    }
}
package fr.osallek.osamodeditor.dto;

import fr.osallek.eu4parser.common.Eu4MapUtils;
import fr.osallek.eu4parser.common.Eu4Utils;
import fr.osallek.eu4parser.model.Power;
import fr.osallek.eu4parser.model.game.Define;
import fr.osallek.eu4parser.model.game.Game;
import fr.osallek.eu4parser.model.game.ModifiersUtils;
import org.apache.commons.collections4.CollectionUtils;
import org.geojson.FeatureCollection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.SortedSet;
import java.util.TreeMap;
import java.util.TreeSet;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CountDownLatch;
import java.util.function.Function;
import java.util.stream.Collectors;

public class GameDTO {

    private static final Logger LOGGER = LoggerFactory.getLogger(GameDTO.class);

    private String folderName;

    private LocalDate startDate;

    private LocalDate endDate;

    private FeatureCollection geoJson;

    private Map<String, KeyLocalisedDTO> graphicalCultures;

    private Map<Integer, ProvinceDTO> provinces;

    private Map<String, TerrainCategoryDTO> terrainCategories;

    private Map<String, fr.osallek.osamodeditor.dto.TradeNodeDTO> tradeNodes;

    private Map<String, CountryDTO> countries;

    private Map<String, KeyLocalisedDTO> historicalCouncils;

    private Map<String, TradeGoodDTO> tradeGoods;

    private Map<String, AreaDTO> areas;

    private Map<String, RegionDTO> regions;

    private Map<String, SuperRegionDTO> superRegions;

    private Map<String, ReligionDTO> religions;

    private Map<String, CultureDTO> cultures;

    private Map<String, ColonialRegionDTO> colonialRegions;

    private Map<String, TradeCompanyDTO> tradeCompanies;

    private Map<String, ProvinceListDTO> winters;

    private Map<String, ProvinceListDTO> climates;

    private Map<String, ProvinceListDTO> monsoons;

    private Map<LocalDate, String> hreEmperors;

    private Map<LocalDate, String> celestialEmperors;

    private Map<String, Map<String, String>> defines;

    private Map<String, ModifierDTO> modifiers;

    private Map<Power, SortedSet<TechnologyDTO>> technologies;

    private Map<String, IdeaGroupDTO> ideaGroups;

    private Map<String, MissionsTreeDTO> missionsTrees;

    private Map<String, MissionDTO> missions;

    private Map<String, SpriteTypeDTO> missionsGfx;

    private int maxMissionsSlots;

    private Map<String, KeyLocalisedDTO> localisations;

    public GameDTO(Game game, String tmpFolderName) {
        this(game, tmpFolderName, () -> {});
    }

    public GameDTO(Game game, String tmpFolderName, Runnable runnable) {
        Instant start2 = Instant.now();
        this.folderName = tmpFolderName;
        this.startDate = game.getStartDate();
        this.endDate = game.getEndDate();
        this.graphicalCultures = CollectionUtils.isEmpty(game.getGraphicalCultures()) ? null
                                                                                      : game.getGraphicalCultures()
                                                                                            .stream()
                                                                                            .map(s -> new KeyLocalisedDTO(s, game.getLocalisations()))
                                                                                            .collect(Collectors.toMap(MappedDTO::getKey, Function.identity()));

        CountDownLatch countDownLatch = new CountDownLatch(2);
        CountDownLatch missionsCountDownLatch = new CountDownLatch(game.getMissions().size());

        Eu4Utils.POOL_EXECUTOR.submit(() -> {
            try {
                this.geoJson = Eu4MapUtils.generateGeoJson(game);
            } catch (IOException e) {
                LOGGER.error(e.getMessage(), e);
            } finally {
                countDownLatch.countDown();
                runnable.run();
            }
        });

        Eu4Utils.POOL_EXECUTOR.submit(() -> {
            try {
                this.countries = game.getCountries()
                                     .stream()
                                     .map(country -> new CountryDTO(country, game.getLocalisations()))
                                     .collect(Collectors.toMap(MappedDTO::getKey, Function.identity()));
            } finally {
                countDownLatch.countDown();
                runnable.run();
            }
        });

        this.missions = new ConcurrentHashMap<>();

        game.getMissions().forEach(mission -> Eu4Utils.POOL_EXECUTOR.submit(() -> {
            try {
                MissionDTO missionDTO = new MissionDTO(mission, game.getLocalisations());
                this.missions.put(missionDTO.getKey(), missionDTO);
            } finally {
                missionsCountDownLatch.countDown();
            }
        }));


        CountDownLatch provinceCountDownLatch = new CountDownLatch(game.getProvinces().size());
        this.provinces = new ConcurrentHashMap<>();

        game.getProvinces().values().forEach(province -> Eu4Utils.POOL_EXECUTOR.submit(() -> {
            try {
                ProvinceDTO provinceDTO = new ProvinceDTO(province, game.getLocalisations());
                this.provinces.put(provinceDTO.getKey(), provinceDTO);
            } finally {
                provinceCountDownLatch.countDown();
            }
        }));

        try {
            provinceCountDownLatch.await();
            runnable.run();
        } catch (InterruptedException e) {
            LOGGER.error("An error occurred while waiting for game files reading : {}", e.getMessage(), e);
            Thread.currentThread().interrupt();
        }

        this.terrainCategories = game.getTerrainCategories()
                                     .stream()
                                     .map(terrainCategory -> new TerrainCategoryDTO(terrainCategory, game.getLocalisations()))
                                     .collect(Collectors.toMap(MappedDTO::getKey, Function.identity()));
        game.getTerrainCategories().forEach(tc -> tc.getComputedProvinces().forEach(id -> this.provinces.get(id).setTerrain(tc.getName())));

        this.terrainCategories.values()
                              .stream()
                              .filter(tc -> CollectionUtils.isNotEmpty(tc.getProvinces()))
                              .forEach(tc -> tc.getProvinces().forEach(id -> this.provinces.get(id).setTerrain(tc.getKey())));
        runnable.run();

        this.tradeNodes = game.getTradeNodes()
                              .stream()
                              .map(tradeNode -> new fr.osallek.osamodeditor.dto.TradeNodeDTO(tradeNode, game.getLocalisations()))
                              .collect(Collectors.toMap(MappedDTO::getKey, Function.identity()));
        game.getTradeNodes().forEach(tradeNode -> tradeNode.getProvinces().forEach(id -> this.provinces.get(id).setTradeNode(tradeNode.getName())));
        runnable.run();

        this.historicalCouncils = Eu4Utils.HISTORICAL_COUNCILS.stream()
                                                              .map(s -> new KeyLocalisedDTO("COUNCIL_" + s.toUpperCase() + "_TRIG", s,
                                                                                            game.getLocalisations()))
                                                              .collect(Collectors.toMap(MappedDTO::getKey, Function.identity()));

        this.tradeGoods = game.getTradeGoods()
                              .stream()
                              .map(tradeGood -> new TradeGoodDTO(tradeGood, game.getLocalisations()))
                              .collect(Collectors.toMap(MappedDTO::getKey, Function.identity()));
        runnable.run();

        this.areas = game.getAreas()
                         .stream()
                         .map(area -> new AreaDTO(area, game.getLocalisations()))
                         .collect(Collectors.toMap(MappedDTO::getKey, Function.identity()));
        this.areas.values()
                  .stream()
                  .filter(area -> CollectionUtils.isNotEmpty(area.getProvinces()))
                  .forEach(area -> area.getProvinces().forEach(id -> this.provinces.get(id).setArea(area.getKey())));
        runnable.run();

        this.regions = game.getRegions()
                           .stream()
                           .map(region -> new RegionDTO(region, game.getLocalisations()))
                           .collect(Collectors.toMap(MappedDTO::getKey, Function.identity()));
        this.regions.values()
                    .stream()
                    .filter(region -> CollectionUtils.isNotEmpty(region.getProvinces()))
                    .forEach(region -> region.getProvinces().forEach(id -> this.provinces.get(id).setRegion(region.getKey())));
        runnable.run();

        this.superRegions = game.getSuperRegions()
                                .stream()
                                .map(superRegion -> new SuperRegionDTO(superRegion, game.getLocalisations()))
                                .collect(Collectors.toMap(MappedDTO::getKey, Function.identity()));
        this.superRegions.values()
                         .stream()
                         .filter(superRegion -> CollectionUtils.isNotEmpty(superRegion.getProvinces()))
                         .forEach(superRegion -> superRegion.getProvinces().forEach(id -> this.provinces.get(id).setSuperRegion(superRegion.getKey())));
        runnable.run();

        this.religions = game.getReligions()
                             .stream()
                             .map(religion -> new ReligionDTO(religion, game.getLocalisations()))
                             .collect(Collectors.toMap(MappedDTO::getKey, Function.identity()));
        runnable.run();

        this.cultures = game.getCultures()
                            .stream()
                            .map(culture -> new CultureDTO(culture, game.getLocalisations()))
                            .collect(Collectors.toMap(MappedDTO::getKey, Function.identity()));
        runnable.run();

        this.colonialRegions = game.getColonialRegions()
                                   .stream()
                                   .filter(colonialRegion -> !colonialRegion.getName().startsWith("colonial_placeholder_")) //RNW
                                   .map(colonialRegion -> new ColonialRegionDTO(colonialRegion, game.getLocalisations()))
                                   .collect(Collectors.toMap(MappedDTO::getKey, Function.identity()));
        this.colonialRegions.values()
                            .stream()
                            .filter(colonialRegion -> CollectionUtils.isNotEmpty(colonialRegion.getProvinces()))
                            .forEach(colonialRegion -> colonialRegion.getProvinces()
                                                                     .forEach(id -> this.provinces.get(id).setColonialRegion(colonialRegion.getKey())));
        runnable.run();

        this.tradeCompanies = game.getTradeCompanies()
                                  .stream()
                                  .map(tradeCompany -> new TradeCompanyDTO(tradeCompany, game.getLocalisations()))
                                  .collect(Collectors.toMap(MappedDTO::getKey, Function.identity()));
        this.tradeCompanies.values()
                           .stream()
                           .filter(tradeCompany -> CollectionUtils.isNotEmpty(tradeCompany.getProvinces()))
                           .forEach(tradeCompany -> tradeCompany.getProvinces()
                                                                .forEach(id -> this.provinces.get(id).setTradeCompany(tradeCompany.getKey())));
        runnable.run();

        this.winters = game.getWinters()
                           .stream()
                           .map(list -> new ProvinceListDTO(list, game.getLocalisations(),
                                                            provinceList -> new ColorDTO(Eu4MapUtils.winterToColor(provinceList.getName()), true)))
                           .collect(Collectors.toMap(MappedDTO::getKey, Function.identity()));
        this.winters.values()
                    .stream()
                    .filter(winter -> CollectionUtils.isNotEmpty(winter.getProvinces()))
                    .forEach(winter -> winter.getProvinces().forEach(id -> this.provinces.get(id).setWinter(winter.getKey())));
        runnable.run();

        this.climates = game.getClimates()
                            .stream()
                            .map(list -> new ProvinceListDTO(list, game.getLocalisations(),
                                                             provinceList -> new ColorDTO(Eu4MapUtils.climateToColor(provinceList.getName()), true)))
                            .collect(Collectors.toMap(MappedDTO::getKey, Function.identity()));
        this.climates.values()
                     .stream()
                     .filter(climate -> CollectionUtils.isNotEmpty(climate.getProvinces()))
                     .forEach(climate -> climate.getProvinces().forEach(id -> this.provinces.get(id).setClimate(climate.getKey())));
        runnable.run();

        this.monsoons = game.getMonsoons()
                            .stream()
                            .map(list -> new ProvinceListDTO(list, game.getLocalisations(),
                                                             provinceList -> new ColorDTO(Eu4MapUtils.monsoonToColor(provinceList.getName()), true)))
                            .collect(Collectors.toMap(MappedDTO::getKey, Function.identity()));
        this.monsoons.values()
                     .stream()
                     .filter(monsoon -> CollectionUtils.isNotEmpty(monsoon.getProvinces()))
                     .forEach(monsoon -> monsoon.getProvinces().forEach(id -> this.provinces.get(id).setMonsoon(monsoon.getKey())));
        runnable.run();

        this.hreEmperors = game.getHreEmperors()
                               .entrySet()
                               .stream()
                               .collect(Collectors.toMap(Map.Entry::getKey, entry -> entry.getValue().getTag(), (s, s2) -> s, TreeMap::new));
        runnable.run();

        this.celestialEmperors = game.getCelestialEmperors()
                                     .entrySet()
                                     .stream()
                                     .collect(Collectors.toMap(Map.Entry::getKey, entry -> entry.getValue().getTag()));
        runnable.run();

        this.defines = game.getDefines()
                           .get(Eu4Utils.DEFINE_KEY)
                           .values()
                           .stream()
                           .map(Map::values)
                           .flatMap(Collection::stream)
                           .collect(Collectors.groupingBy(Define::getCategory, LinkedHashMap::new,
                                                          Collectors.toMap(Define::getName, Define::getAsString, (s, s2) -> s, LinkedHashMap::new)));
        runnable.run();

        this.modifiers = ModifiersUtils.MODIFIERS_MAP.values()
                                                     .stream()
                                                     .map(modifier -> new ModifierDTO(modifier, game.getLocalisations()))
                                                     .collect(Collectors.toMap(MappedDTO::getKey, Function.identity()));
        runnable.run();

        this.technologies = game.getTechnologies()
                                .entrySet()
                                .stream()
                                .collect(Collectors.toMap(Map.Entry::getKey,
                                                          entry -> entry.getValue()
                                                                        .stream()
                                                                        .map(technology -> new TechnologyDTO(technology, game.getLocalisations()))
                                                                        .collect(Collectors.toCollection(TreeSet::new))));
        runnable.run();

        this.ideaGroups = game.getIdeaGroups()
                              .stream()
                              .map(ideaGroup -> new IdeaGroupDTO(ideaGroup, game.getLocalisations()))
                              .collect(Collectors.toMap(MappedDTO::getKey, Function.identity()));
        runnable.run();

        this.missionsTrees = game.getMissionsTrees()
                                 .stream()
                                 .map(MissionsTreeDTO::new)
                                 .collect(Collectors.toMap(MappedDTO::getKey, Function.identity()));
        runnable.run();

        this.missionsGfx = game.getSpriteTypes()
                               .stream()
                               .filter(spriteType -> spriteType.getTextureFilePath().startsWith(Eu4Utils.MISSIONS_GFX))
                               .map(SpriteTypeDTO::new)
                               .collect(Collectors.toMap(MappedDTO::getKey, Function.identity()));
        runnable.run();

        this.maxMissionsSlots = game.getMaxMissionsSlots();


        this.localisations = game.getLocalisations()
                                 .keySet()
                                 .stream()
                                 .map(key -> new KeyLocalisedDTO(key, game.getLocalisations()))
                                 .collect(Collectors.toMap(MappedDTO::getKey, Function.identity()));
        runnable.run();

        try {
            countDownLatch.await();
            missionsCountDownLatch.await();
        } catch (InterruptedException e) {
            LOGGER.error("An error occurred while waiting for game files reading : {}", e.getMessage(), e);
            Thread.currentThread().interrupt();
        }

        LOGGER.info("Total: {}", Duration.between(start2, Instant.now()).toMillis());
    }

    public String getFolderName() {
        return folderName;
    }

    public void setFolderName(String folderName) {
        this.folderName = folderName;
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

    public Map<String, KeyLocalisedDTO> getGraphicalCultures() {
        return graphicalCultures;
    }

    public void setGraphicalCultures(Map<String, KeyLocalisedDTO> graphicalCultures) {
        this.graphicalCultures = graphicalCultures;
    }

    public Map<Integer, ProvinceDTO> getProvinces() {
        return provinces;
    }

    public void setProvinces(Map<Integer, ProvinceDTO> provinces) {
        this.provinces = provinces;
    }

    public Map<String, TerrainCategoryDTO> getTerrainCategories() {
        return terrainCategories;
    }

    public void setTerrainCategories(Map<String, TerrainCategoryDTO> terrainCategories) {
        this.terrainCategories = terrainCategories;
    }

    public Map<String, TradeNodeDTO> getTradeNodes() {
        return tradeNodes;
    }

    public void setTradeNodes(Map<String, TradeNodeDTO> tradeNodes) {
        this.tradeNodes = tradeNodes;
    }

    public Map<String, CountryDTO> getCountries() {
        return countries;
    }

    public void setCountries(Map<String, CountryDTO> countries) {
        this.countries = countries;
    }

    public Map<String, KeyLocalisedDTO> getHistoricalCouncils() {
        return historicalCouncils;
    }

    public void setHistoricalCouncils(Map<String, KeyLocalisedDTO> historicalCouncils) {
        this.historicalCouncils = historicalCouncils;
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

    public Map<String, ColonialRegionDTO> getColonialRegions() {
        return colonialRegions;
    }

    public void setColonialRegions(Map<String, ColonialRegionDTO> colonialRegions) {
        this.colonialRegions = colonialRegions;
    }

    public Map<String, TradeCompanyDTO> getTradeCompanies() {
        return tradeCompanies;
    }

    public void setTradeCompanies(Map<String, TradeCompanyDTO> tradeCompanies) {
        this.tradeCompanies = tradeCompanies;
    }

    public Map<String, ProvinceListDTO> getWinters() {
        return winters;
    }

    public void setWinters(Map<String, ProvinceListDTO> winters) {
        this.winters = winters;
    }

    public Map<String, ProvinceListDTO> getClimates() {
        return climates;
    }

    public void setClimates(Map<String, ProvinceListDTO> climates) {
        this.climates = climates;
    }

    public Map<String, ProvinceListDTO> getMonsoons() {
        return monsoons;
    }

    public void setMonsoons(Map<String, ProvinceListDTO> monsoons) {
        this.monsoons = monsoons;
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

    public Map<String, ModifierDTO> getModifiers() {
        return modifiers;
    }

    public void setModifiers(Map<String, ModifierDTO> modifiers) {
        this.modifiers = modifiers;
    }

    public Map<Power, SortedSet<TechnologyDTO>> getTechnologies() {
        return technologies;
    }

    public void setTechnologies(Map<Power, SortedSet<TechnologyDTO>> technologies) {
        this.technologies = technologies;
    }

    public Map<String, IdeaGroupDTO> getIdeaGroups() {
        return ideaGroups;
    }

    public void setIdeaGroups(Map<String, IdeaGroupDTO> ideaGroups) {
        this.ideaGroups = ideaGroups;
    }

    public Map<String, MissionsTreeDTO> getMissionsTrees() {
        return missionsTrees;
    }

    public void setMissionsTrees(Map<String, MissionsTreeDTO> missionsTrees) {
        this.missionsTrees = missionsTrees;
    }

    public Map<String, MissionDTO> getMissions() {
        return missions;
    }

    public void setMissions(Map<String, MissionDTO> missions) {
        this.missions = missions;
    }

    public Map<String, SpriteTypeDTO> getMissionsGfx() {
        return missionsGfx;
    }

    public void setMissionsGfx(Map<String, SpriteTypeDTO> missionsGfx) {
        this.missionsGfx = missionsGfx;
    }

    public int getMaxMissionsSlots() {
        return maxMissionsSlots;
    }

    public void setMaxMissionsSlots(int maxMissionsSlots) {
        this.maxMissionsSlots = maxMissionsSlots;
    }

    public Map<String, KeyLocalisedDTO> getLocalisations() {
        return localisations;
    }

    public void setLocalisations(Map<String, KeyLocalisedDTO> localisations) {
        this.localisations = localisations;
    }
}

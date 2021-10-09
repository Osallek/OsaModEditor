package fr.osallek.osamodeditor.service;

import fr.osallek.clausewitzparser.model.ClausewitzObject;
import fr.osallek.eu4parser.model.game.Area;
import fr.osallek.eu4parser.model.game.ColonialRegion;
import fr.osallek.eu4parser.model.game.FileNode;
import fr.osallek.eu4parser.model.game.Game;
import fr.osallek.eu4parser.model.game.Noded;
import fr.osallek.eu4parser.model.game.Province;
import fr.osallek.eu4parser.model.game.ProvinceHistoryItem;
import fr.osallek.eu4parser.model.game.ProvinceList;
import fr.osallek.eu4parser.model.game.TerrainCategory;
import fr.osallek.eu4parser.model.game.TradeCompany;
import fr.osallek.eu4parser.model.game.TradeNode;
import fr.osallek.osamodeditor.common.exception.AreaNotFoundException;
import fr.osallek.osamodeditor.common.exception.ClimateNotFoundException;
import fr.osallek.osamodeditor.common.exception.ColonialRegionNotFoundException;
import fr.osallek.osamodeditor.common.exception.CountryNotFoundException;
import fr.osallek.osamodeditor.common.exception.CultureNotFoundException;
import fr.osallek.osamodeditor.common.exception.MonsoonNotFoundException;
import fr.osallek.osamodeditor.common.exception.ProvinceNotFoundException;
import fr.osallek.osamodeditor.common.exception.ReligionNotFoundException;
import fr.osallek.osamodeditor.common.exception.TerrainNotFoundException;
import fr.osallek.osamodeditor.common.exception.TradeCompanyNotFoundException;
import fr.osallek.osamodeditor.common.exception.TradeGoodNotFoundException;
import fr.osallek.osamodeditor.common.exception.TradeNodeNotFoundException;
import fr.osallek.osamodeditor.common.exception.WinterNotFoundException;
import fr.osallek.osamodeditor.dto.GameDTO;
import fr.osallek.osamodeditor.form.MapActionForm;
import fr.osallek.osamodeditor.form.SimpleMapActionForm;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.Set;
import java.util.SortedSet;
import java.util.TreeSet;
import java.util.function.Consumer;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Service
public class ProvinceService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ProvinceService.class);

    private final GameService gameService;

    public ProvinceService(GameService gameService) {
        this.gameService = gameService;
    }

    public GameDTO changeOwner(MapActionForm form) throws IOException {
        LOGGER.info("Trying to change owner to {} at {} for {}", form.getTarget(), form.getDate(), form.getProvinces());

        Game game = this.gameService.getGame();

        if (game.getCountry(form.getTarget()) == null) {
            throw new CountryNotFoundException(form.getTarget());
        }

        changeProvinceHistory(form, provinceHistoryItem -> provinceHistoryItem.setOwner(form.getTarget()));

        return new GameDTO(game, this.gameService.getTmpModPath().getFileName().toString());
    }

    public GameDTO changeController(MapActionForm form) throws IOException {
        LOGGER.info("Trying to change controller to {} at {} for {}", form.getTarget(), form.getDate(), form.getProvinces());

        Game game = this.gameService.getGame();

        if (game.getCountry(form.getTarget()) == null) {
            throw new CountryNotFoundException(form.getTarget());
        }

        changeProvinceHistory(form, provinceHistoryItem -> provinceHistoryItem.setController(form.getTarget()));

        return new GameDTO(game, this.gameService.getTmpModPath().getFileName().toString());
    }

    public GameDTO changeOwnerAndController(MapActionForm form) throws IOException {
        LOGGER.info("Trying to change owner and controller to {} at {} for {}", form.getTarget(), form.getDate(), form.getProvinces());

        Game game = this.gameService.getGame();

        if (game.getCountry(form.getTarget()) == null) {
            throw new CountryNotFoundException(form.getTarget());
        }

        changeProvinceHistory(form, provinceHistoryItem -> {
            provinceHistoryItem.setController(form.getTarget());
            provinceHistoryItem.setOwner(form.getTarget());
        });

        return new GameDTO(game, this.gameService.getTmpModPath().getFileName().toString());
    }

    public GameDTO changeOwnerAndControllerAndCore(MapActionForm form) throws IOException {
        LOGGER.info("Trying to change owner and controller and core to {} at {} for {}", form.getTarget(), form.getDate(), form.getProvinces());

        Game game = this.gameService.getGame();

        if (game.getCountry(form.getTarget()) == null) {
            throw new CountryNotFoundException(form.getTarget());
        }

        changeProvinceHistory(form, provinceHistoryItem -> {
            provinceHistoryItem.setController(form.getTarget());
            provinceHistoryItem.setOwner(form.getTarget());

            if (provinceHistoryItem.getAddCores().stream().noneMatch(country -> country.getTag().equals(form.getTarget()))) {
                provinceHistoryItem.addAddCore(form.getTarget());
            }

            if (provinceHistoryItem.getRemoveCores().stream().anyMatch(country -> country.getTag().equals(form.getTarget()))) {
                provinceHistoryItem.removeRemoveCore(form.getTarget());
            }
        });

        return new GameDTO(game, this.gameService.getTmpModPath().getFileName().toString());
    }

    public GameDTO addToHre(MapActionForm form) throws IOException {
        LOGGER.info("Trying to add {} to the hre at {}", form.getProvinces(), form.getDate());

        changeProvinceHistory(form, provinceHistoryItem -> provinceHistoryItem.setHre(true));

        return new GameDTO(this.gameService.getGame(), this.gameService.getTmpModPath().getFileName().toString());
    }

    public GameDTO removeFromHre(MapActionForm form) throws IOException {
        LOGGER.info("Trying to add {} to the hre at {}", form.getProvinces(), form.getDate());

        changeProvinceHistory(form, provinceHistoryItem -> provinceHistoryItem.setHre(false));

        return new GameDTO(this.gameService.getGame(), this.gameService.getTmpModPath().getFileName().toString());
    }

    public GameDTO changeTradeGood(MapActionForm form) throws IOException {
        LOGGER.info("Trying to change trade good to {} at {} for {}", form.getTarget(), form.getDate(), form.getProvinces());

        Game game = this.gameService.getGame();

        if (game.getTradeGood(form.getTarget()) == null) {
            throw new TradeGoodNotFoundException(form.getTarget());
        }

        changeProvinceHistory(form, provinceHistoryItem -> provinceHistoryItem.setTradeGood(form.getTarget()));

        return new GameDTO(this.gameService.getGame(), this.gameService.getTmpModPath().getFileName().toString());
    }

    public GameDTO changeReligion(MapActionForm form) throws IOException {
        LOGGER.info("Trying to change religion to {} at {} for {}", form.getTarget(), form.getDate(), form.getProvinces());

        Game game = this.gameService.getGame();

        if (game.getReligion(form.getTarget()) == null) {
            throw new ReligionNotFoundException(form.getTarget());
        }

        changeProvinceHistory(form, provinceHistoryItem -> provinceHistoryItem.setReligion(form.getTarget()));

        return new GameDTO(this.gameService.getGame(), this.gameService.getTmpModPath().getFileName().toString());
    }

    public GameDTO changeCulture(MapActionForm form) throws IOException {
        LOGGER.info("Trying to change culture to {} at {} for {}", form.getTarget(), form.getDate(), form.getProvinces());

        Game game = this.gameService.getGame();

        if (game.getCulture(form.getTarget()) == null) {
            throw new CultureNotFoundException(form.getTarget());
        }

        changeProvinceHistory(form, provinceHistoryItem -> provinceHistoryItem.setCulture(form.getTarget()));

        return new GameDTO(this.gameService.getGame(), this.gameService.getTmpModPath().getFileName().toString());
    }

    public GameDTO decolonize(MapActionForm form) throws IOException {
        LOGGER.info("Trying to decolonize {} at {}", form.getDate(), form.getProvinces());

        changeProvinceHistory(form, provinceHistoryItem -> {
            provinceHistoryItem.setOwner((String) null);
            provinceHistoryItem.setController((String) null);
            provinceHistoryItem.setHre(false);
            provinceHistoryItem.setTradeGood("unknown");
            provinceHistoryItem.setIsCity(null);
            provinceHistoryItem.setNativeSize(new Random().nextInt(6));
            provinceHistoryItem.setNativeFerocity(new Random().nextInt(6));
            provinceHistoryItem.setNativeHostileness(new Random().nextInt(6));
        });

        return new GameDTO(this.gameService.getGame(), this.gameService.getTmpModPath().getFileName().toString());
    }

    public GameDTO changeTradeNode(SimpleMapActionForm form) throws IOException {
        LOGGER.info("Trying to change trade node to {} for {}", form.getTarget(), form.getProvinces());

        Game game = this.gameService.getGame();
        TradeNode tradeNode = game.getTradeNode(form.getTarget());

        if (tradeNode == null) {
            throw new TradeNodeNotFoundException(form.getTarget());
        }

        Set<TradeNode> modified = new HashSet<>();

        for (Integer provinceId : form.getProvinces()) {
            if (!game.getProvinces().containsKey(provinceId)) {
                throw new ProvinceNotFoundException(provinceId.toString());
            }

            TradeNode provinceNode = game.getTradeNodes().stream().filter(tn -> tn.getProvinces().contains(provinceId)).findFirst().orElse(null);

            if (!tradeNode.equals(provinceNode)) {
                if (provinceNode != null) {
                    modified.add(provinceNode);
                    provinceNode.removeProvince(provinceId);
                }

                tradeNode.addProvince(provinceId);
                modified.add(tradeNode);
            }
        }

        writeNoded(modified, this.gameService.getGame().getTradeNodes());

        return new GameDTO(this.gameService.getGame(), this.gameService.getTmpModPath().getFileName().toString());
    }

    public GameDTO changeArea(SimpleMapActionForm form) throws IOException {
        LOGGER.info("Trying to change area to {} for {}", form.getTarget(), form.getProvinces());

        Game game = this.gameService.getGame();
        Area area = game.getArea(form.getTarget());

        if (area == null) {
            throw new AreaNotFoundException(form.getTarget());
        }

        Set<Area> modified = new HashSet<>();

        for (Integer provinceId : form.getProvinces()) {
            if (!game.getProvinces().containsKey(provinceId)) {
                throw new ProvinceNotFoundException(provinceId.toString());
            }

            Area provinceArea = game.getAreas().stream().filter(a -> a.getProvinces().contains(provinceId)).findFirst().orElse(null);

            if (!area.equals(provinceArea)) {
                if (provinceArea != null) {
                    modified.add(provinceArea);
                    provinceArea.removeProvince(provinceId);
                }

                area.addProvince(provinceId);
                modified.add(area);
            }
        }

        writeNoded(modified, this.gameService.getGame().getAreas());

        return new GameDTO(this.gameService.getGame(), this.gameService.getTmpModPath().getFileName().toString());
    }

    public GameDTO changeColonialRegion(SimpleMapActionForm form) throws IOException {
        LOGGER.info("Trying to change colonial region to {} for {}", form.getTarget(), form.getProvinces());

        Game game = this.gameService.getGame();
        ColonialRegion colonialRegion = game.getColonialRegion(form.getTarget());

        if (colonialRegion == null) {
            throw new ColonialRegionNotFoundException(form.getTarget());
        }

        Set<ColonialRegion> modified = new HashSet<>();

        for (Integer provinceId : form.getProvinces()) {
            if (!game.getProvinces().containsKey(provinceId)) {
                throw new ProvinceNotFoundException(provinceId.toString());
            }

            ColonialRegion provinceRegion = game.getColonialRegions()
                                                .stream()
                                                .filter(cr -> CollectionUtils.isNotEmpty(cr.getProvinces()))
                                                .filter(cr -> cr.getProvinces().contains(provinceId))
                                                .findFirst()
                                                .orElse(null);

            if (!colonialRegion.equals(provinceRegion)) {
                if (provinceRegion != null) {
                    modified.add(provinceRegion);
                    provinceRegion.removeProvince(provinceId);
                }

                colonialRegion.addProvince(provinceId);
                modified.add(colonialRegion);
            }
        }

        writeNoded(modified, this.gameService.getGame().getColonialRegions());

        return new GameDTO(this.gameService.getGame(), this.gameService.getTmpModPath().getFileName().toString());
    }

    public GameDTO removeColonialRegion(SimpleMapActionForm form) throws IOException {
        LOGGER.info("Trying to remove colonial region for {}", form.getProvinces());

        Game game = this.gameService.getGame();

        Set<ColonialRegion> modified = new HashSet<>();

        for (Integer provinceId : form.getProvinces()) {
            if (!game.getProvinces().containsKey(provinceId)) {
                throw new ProvinceNotFoundException(provinceId.toString());
            }

            Optional<ColonialRegion> provinceRegion = game.getColonialRegions()
                                                          .stream()
                                                          .filter(cr -> CollectionUtils.isNotEmpty(cr.getProvinces()))
                                                          .filter(cr -> cr.getProvinces().contains(provinceId))
                                                          .findFirst();

            if (provinceRegion.isPresent()) {
                provinceRegion.get().removeProvince(provinceId);
                modified.add(provinceRegion.get());
            }
        }

        writeNoded(modified, this.gameService.getGame().getColonialRegions());

        return new GameDTO(this.gameService.getGame(), this.gameService.getTmpModPath().getFileName().toString());
    }

    public GameDTO changeTradeCompany(SimpleMapActionForm form) throws IOException {
        LOGGER.info("Trying to change trade company to {} for {}", form.getTarget(), form.getProvinces());

        Game game = this.gameService.getGame();
        TradeCompany tradeCompany = game.getTradeCompany(form.getTarget());

        if (tradeCompany == null) {
            throw new TradeCompanyNotFoundException(form.getTarget());
        }

        Set<TradeCompany> modified = new HashSet<>();

        for (Integer provinceId : form.getProvinces()) {
            if (!game.getProvinces().containsKey(provinceId)) {
                throw new ProvinceNotFoundException(provinceId.toString());
            }

            TradeCompany provinceCompany = game.getTradeCompanies().stream().filter(cr -> cr.getProvinces().contains(provinceId)).findFirst().orElse(null);

            if (!tradeCompany.equals(provinceCompany)) {
                if (provinceCompany != null) {
                    modified.add(provinceCompany);
                    provinceCompany.removeProvince(provinceId);
                }

                tradeCompany.addProvince(provinceId);
                modified.add(tradeCompany);
            }
        }

        writeNoded(modified, this.gameService.getGame().getTradeCompanies());

        return new GameDTO(this.gameService.getGame(), this.gameService.getTmpModPath().getFileName().toString());
    }

    public GameDTO removeTradeCompany(SimpleMapActionForm form) throws IOException {
        LOGGER.info("Trying to remove trade company for {}", form.getProvinces());

        Game game = this.gameService.getGame();

        Set<TradeCompany> modified = new HashSet<>();

        for (Integer provinceId : form.getProvinces()) {
            if (!game.getProvinces().containsKey(provinceId)) {
                throw new ProvinceNotFoundException(provinceId.toString());
            }

            Optional<TradeCompany> provinceCompany = game.getTradeCompanies().stream().filter(cr -> cr.getProvinces().contains(provinceId)).findFirst();

            if (provinceCompany.isPresent()) {
                provinceCompany.get().removeProvince(provinceId);
                modified.add(provinceCompany.get());
            }
        }

        writeNoded(modified, this.gameService.getGame().getTradeCompanies());

        return new GameDTO(this.gameService.getGame(), this.gameService.getTmpModPath().getFileName().toString());
    }

    public GameDTO changeWinter(SimpleMapActionForm form) throws IOException {
        LOGGER.info("Trying to change winter to {} for {}", form.getTarget(), form.getProvinces());

        Game game = this.gameService.getGame();
        ProvinceList winter = game.getWinter(form.getTarget());

        if (winter == null) {
            throw new WinterNotFoundException(form.getTarget());
        }

        Set<ProvinceList> modified = new HashSet<>();

        for (Integer provinceId : form.getProvinces()) {
            if (!game.getProvinces().containsKey(provinceId)) {
                throw new ProvinceNotFoundException(provinceId.toString());
            }

            ProvinceList provinceWinter = game.getWinters()
                                              .stream()
                                              .filter(w -> w.getProvinces().contains(provinceId))
                                              .findFirst()
                                              .orElse(null); //Can't be null

            if (!winter.equals(provinceWinter)) {
                if (!provinceWinter.isFake()) {
                    modified.add(provinceWinter);
                }

                provinceWinter.removeProvince(provinceId);

                winter.addProvince(provinceId);

                if (!winter.isFake()) {
                    modified.add(winter);
                }
            }
        }

        writeClimate(modified);

        return new GameDTO(this.gameService.getGame(), this.gameService.getTmpModPath().getFileName().toString());
    }

    public GameDTO changeMonsoon(SimpleMapActionForm form) throws IOException {
        LOGGER.info("Trying to change monsoon to {} for {}", form.getTarget(), form.getProvinces());

        Game game = this.gameService.getGame();
        ProvinceList monsoon = game.getMonsoon(form.getTarget());

        if (monsoon == null) {
            throw new MonsoonNotFoundException(form.getTarget());
        }

        Set<ProvinceList> modified = new HashSet<>();

        for (Integer provinceId : form.getProvinces()) {
            if (!game.getProvinces().containsKey(provinceId)) {
                throw new ProvinceNotFoundException(provinceId.toString());
            }

            ProvinceList provinceMonsoon = game.getMonsoons()
                                               .stream()
                                               .filter(w -> w.getProvinces().contains(provinceId))
                                               .findFirst()
                                               .orElse(null); //Can't be null

            if (!monsoon.equals(provinceMonsoon)) {
                if (!provinceMonsoon.isFake()) {
                    modified.add(provinceMonsoon);
                }

                provinceMonsoon.removeProvince(provinceId);

                monsoon.addProvince(provinceId);

                if (!monsoon.isFake()) {
                    modified.add(monsoon);
                }
            }
        }

        writeClimate(modified);

        return new GameDTO(this.gameService.getGame(), this.gameService.getTmpModPath().getFileName().toString());
    }

    public GameDTO changeClimate(SimpleMapActionForm form) throws IOException {
        LOGGER.info("Trying to change climate to {} for {}", form.getTarget(), form.getProvinces());

        Game game = this.gameService.getGame();
        ProvinceList climate = game.getClimate(form.getTarget());

        if (climate == null) {
            throw new ClimateNotFoundException(form.getTarget());
        }

        Set<ProvinceList> modified = new HashSet<>();

        for (Integer provinceId : form.getProvinces()) {
            if (!game.getProvinces().containsKey(provinceId)) {
                throw new ProvinceNotFoundException(provinceId.toString());
            }

            ProvinceList provinceClimate = game.getClimates()
                                               .stream()
                                               .filter(w -> w.getProvinces().contains(provinceId))
                                               .findFirst()
                                               .orElse(null); //Can't be null

            if (!climate.equals(provinceClimate)) {
                if (!provinceClimate.isFake()) {
                    modified.add(provinceClimate);
                }

                provinceClimate.removeProvince(provinceId);

                climate.addProvince(provinceId);

                if (!climate.isFake()) {
                    modified.add(climate);
                }
            }
        }

        writeClimate(modified);

        return new GameDTO(this.gameService.getGame(), this.gameService.getTmpModPath().getFileName().toString());
    }

    public GameDTO changeTerrain(SimpleMapActionForm form) throws IOException {
        LOGGER.info("Trying to change terrain to {} for {}", form.getTarget(), form.getProvinces());

        Game game = this.gameService.getGame();
        TerrainCategory terrain = game.getTerrainCategory(form.getTarget());

        if (terrain == null) {
            throw new TerrainNotFoundException(form.getTarget());
        }

        Set<TerrainCategory> modified = new HashSet<>();

        for (Integer provinceId : form.getProvinces()) {
            if (!game.getProvinces().containsKey(provinceId)) {
                throw new ProvinceNotFoundException(provinceId.toString());
            }

            Optional<TerrainCategory> provinceTerrain = game.getTerrainCategories()
                                                            .stream()
                                                            .filter(terrainCategory -> CollectionUtils.isNotEmpty(terrainCategory.getProvinces()))
                                                            .filter(terrainCategory -> terrainCategory.getProvinces().contains(provinceId))
                                                            .findFirst();

            if (provinceTerrain.isPresent()) {
                if (!terrain.equals(provinceTerrain.get())) {
                    provinceTerrain.get().removeProvince(provinceId);
                    modified.add(provinceTerrain.get());

                    terrain.addProvince(provinceId);
                    modified.add(terrain);
                }
            } else {
                terrain.addProvince(provinceId);
                modified.add(terrain);
            }
        }

        if (CollectionUtils.isNotEmpty(modified)) {
            FileNode fileNode = game.getTerrainCategories().get(0).getFileNode();
            if (!this.gameService.getMod().equals(fileNode.getMod())) {
                fileNode.setMod(this.gameService.getMod());
            }

            FileUtils.forceMkdirParent(fileNode.getPath().toFile());

            try (BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(fileNode.getPath().toFile()))) {
                game.writeTerrainItem(bufferedWriter);
            } catch (IOException e) {
                LOGGER.error("An error occurred while writing terrain to {}: {}!", fileNode.getPath(), e.getMessage(), e);
                throw e;
            }
        }

        return new GameDTO(this.gameService.getGame(), this.gameService.getTmpModPath().getFileName().toString());
    }

    private void changeProvinceHistory(MapActionForm form, Consumer<ProvinceHistoryItem> consumer) {
        Game game = this.gameService.getGame();

        for (Integer provinceId : form.getProvinces()) {
            if (!game.getProvinces().containsKey(provinceId)) {
                throw new ProvinceNotFoundException(provinceId.toString());
            }
        }

        for (Integer provinceId : form.getProvinces()) {
            Province province = game.getProvince(provinceId);

            if (form.getDate() == null) {
                consumer.accept(province.getDefaultHistoryItem());
            } else {
                ProvinceHistoryItem provinceHistoryItem;

                if (province.getHistoryItems().containsKey(form.getDate())) {
                    provinceHistoryItem = province.getHistoryItems().get(form.getDate());
                } else {
                    provinceHistoryItem = new ProvinceHistoryItem(province, form.getDate());
                    province.getHistoryItems().put(form.getDate(), provinceHistoryItem);
                }

                consumer.accept(provinceHistoryItem);
            }

            writeProvinceHistory(province);
        }
    }

    private void writeProvinceHistory(Province province) {
        if (!this.gameService.getMod().equals(province.getHistoryFileNode().getMod())) {
            province.getHistoryFileNode().setMod(this.gameService.getMod());
        }

        try (BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(province.getHistoryFileNode().getPath().toFile()))) {
            province.getDefaultHistoryItem().write(bufferedWriter);
        } catch (IOException e) {
            LOGGER.error("An error occurred while writing history of {} to {}: {}!", province, province.getHistoryFileNode().getPath(), e.getMessage(), e);
        }
    }

    private void writeClimate(Set<ProvinceList> modified) throws IOException {
        if (CollectionUtils.isNotEmpty(modified)) {
            Game game = this.gameService.getGame();
            FileNode fileNode = game.getImpassableClimate().getFileNode();

            if (!this.gameService.getMod().equals(fileNode.getMod())) {
                fileNode.setMod(this.gameService.getMod());
            }

            FileUtils.forceMkdirParent(fileNode.getPath().toFile());

            try (BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(fileNode.getPath().toFile()))) {
                game.writeClimateItem(bufferedWriter);
            } catch (IOException e) {
                LOGGER.error("An error occurred while writing climate to {}: {}!", fileNode.getPath(), e.getMessage(), e);
                throw e;
            }
        }
    }

    private void writeNoded(Set<? extends Noded> modified, Collection<? extends Noded> all) throws IOException {
        writeNoded(modified, all, null);
    }

    private void writeNoded(Set<? extends Noded> modified, Collection<? extends Noded> all, Collection<ClausewitzObject> after) throws IOException {
        if (CollectionUtils.isEmpty(modified)) {
            return;
        }

        Set<FileNode> fileModified = modified.stream().map(Noded::getFileNode).collect(Collectors.toSet());
        List<Noded> toWrite = all.stream().filter(noded -> fileModified.contains(noded.getFileNode())).collect(Collectors.toList());

        Map<FileNode, SortedSet<Noded>> nodes = toWrite.stream()
                                                       .collect(Collectors.groupingBy(Noded::getFileNode, Collectors.toCollection(TreeSet::new)));

        nodes.keySet().forEach(fileNode -> {
            if (!this.gameService.getMod().equals(fileNode.getMod())) {
                fileNode.setMod(this.gameService.getMod());
            }
        });

        for (Map.Entry<FileNode, SortedSet<Noded>> entry : nodes.entrySet()) {
            FileUtils.forceMkdirParent(entry.getKey().getPath().toFile());

            try (BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(entry.getKey().getPath().toFile()))) {
                for (Noded noded : entry.getValue()) {
                    noded.write(bufferedWriter);
                    bufferedWriter.newLine();
                    bufferedWriter.newLine();
                }

                if (CollectionUtils.isNotEmpty(after)) {
                    for (ClausewitzObject object : after) {
                        object.write(bufferedWriter, 0, new HashMap<>());
                        bufferedWriter.newLine();
                        bufferedWriter.newLine();
                    }
                }
            } catch (IOException e) {
                LOGGER.error("An error occurred while writing nodes to {}: {}!", entry.getKey(), e.getMessage(), e);
                throw e;
            }
        }
    }

    private List<ProvinceList> getClimateFileObjects() {
        Game game = this.gameService.getGame();

        List<ProvinceList> list = new ArrayList<>();
        list.addAll(game.getClimates().stream().filter(Predicate.not(ProvinceList::isFake)).collect(Collectors.toList()));
        list.addAll(game.getWinters().stream().filter(Predicate.not(ProvinceList::isFake)).collect(Collectors.toList()));
        list.addAll(game.getMonsoons().stream().filter(Predicate.not(ProvinceList::isFake)).collect(Collectors.toList()));
        list.add(game.getImpassableClimate());

        return list;
    }
}

import { Path, PathOptions } from "leaflet";
import { Dispatch } from "react";
import actions from "../store/actions";
import { GameActionType, GameState } from "../store/game/game.types";
import {
    Area,
    ColonialRegion,
    Country,
    Culture,
    Localizations,
    Province,
    ProvinceList,
    Religion,
    TerrainCategory,
    TradeCompany,
    TradeGood,
    TradeNode,
} from "../types";
import { getCountryHistory } from "./country.utils";
import { getEmperor } from "./emperor.utils";
import { defaultLocalization, inHreLocalization, notInHreLocalization } from "./localisations.utils";
import { getProvinceHistory } from "./province.utils";

const emptyColor = "#949295";

export enum MapMod {
  OWNER,
  CONTROLLER,
  TRADE_NODE,
  TRADE_GOOD,
  RELIGION,
  CULTURE,
  HRE,
  AREA,
  REGION,
  SUPER_REGION,
  COLONIAL_REGION,
  TRADE_COMPANY,
  WINTER,
  CLIMATE,
  MONSOON,
  TERRAIN,
  PROVINCE,
}

export enum MapActionType {
  APPLY_TO_SELECTION,
  VIEW_DETAILS,
}

export enum MapAction {
  CHANGE_OWNER,
  CHANGE_CONTROLLER,
  CHANGE_OWNER_AND_CONTROLLER,
  CHANGE_OWNER_AND_CONTROLLER_AND_CORE,
  ADD_TO_HRE,
  REMOVE_FROM_HRE,
  CHANGE_TRADE_GOOD,
  CHANGE_RELIGION,
  CHANGE_CULTURE,
  DECOLONIZE,
  CHANGE_TRADE_NODE,
  CHANGE_AREA,
  CHANGE_COLONIAL_REGION,
  REMOVE_COLONIAL_REGION,
  CHANGE_TRADE_COMPANY,
  REMOVE_TRADE_COMPANY,
  CHANGE_WINTER,
  CHANGE_CLIMATE,
  CHANGE_MONSOON,
  CHANGE_TERRAIN,
}

export interface IMapMod {
  mapMod: MapMod;
  canSelect: boolean;
  provinceColor: (province: Province, date: Date | null, gameState: GameState) => string;
  borderColor: (province: Province, date: Date | null, gameState: GameState) => string;
  dashArray: (province: Province, date: Date | null, gameState: GameState) => string | number[] | undefined;
  actions: Array<MapAction>;
  tooltip: (province: Province, date: Date | null, gameState: GameState) => Localizations;
  overrideOceans: boolean;
  overrideImpassable: boolean;
}

export interface IMapAction {
  mapAction: MapAction;
  action: (provinces: Array<number>, date: Date | null, target: Localizations | null) => (dispatch: Dispatch<GameActionType>) => Promise<void>;
  noTarget: boolean;
}

export const mapMods: Record<MapMod, IMapMod> = {
  [MapMod.AREA]: {
    mapMod: MapMod.AREA,
    canSelect: true,
    provinceColor: (province: Province, date: Date | null, { areas }: GameState) => {
      if (areas[province.area]) {
        return areas[province.area].color.hex;
      } else {
        return emptyColor;
      }
    },
    borderColor: () => "black",
    dashArray: () => undefined,
    actions: [MapAction.CHANGE_AREA],
    tooltip: (province: Province, date: Date | null, { areas }: GameState): Localizations => {
      if (areas[province.area]) {
        return areas[province.area];
      } else {
        return defaultLocalization;
      }
    },
    overrideOceans: false,
    overrideImpassable: false,
  },
  [MapMod.CULTURE]: {
    mapMod: MapMod.CULTURE,
    canSelect: true,
    provinceColor: (province: Province, date: Date | null, { cultures }: GameState) => {
      const history = getProvinceHistory(province, date);

      if (history && history.culture && cultures[history.culture]) {
        return cultures[history.culture].color.hex;
      } else {
        return emptyColor;
      }
    },
    borderColor: () => "black",
    dashArray: () => undefined,
    actions: [MapAction.CHANGE_CULTURE],
    tooltip: (province: Province, date: Date | null, { cultures }: GameState): Localizations => {
      const history = getProvinceHistory(province, date);

      if (history && history.culture && cultures[history.culture]) {
        return cultures[history.culture];
      } else {
        return defaultLocalization;
      }
    },
    overrideOceans: false,
    overrideImpassable: false,
  },
  [MapMod.HRE]: {
    mapMod: MapMod.HRE,
    canSelect: true,
    provinceColor: (province: Province, date: Date | null, { countries, hreEmperors }: GameState) => {
      const history = getProvinceHistory(province, date);

      if (history && history.owner && countries[history.owner]) {
        if (getEmperor(date, hreEmperors) === history.owner) {
          return "#7f004c";
        } else if (getCountryHistory(countries[history.owner], date).elector) {
          return "#993300";
        }
      }

      if (history && history.hre) {
        return "#007f00";
      } else {
        return emptyColor;
      }
    },
    borderColor: () => "black",
    dashArray: () => undefined,
    actions: [MapAction.ADD_TO_HRE, MapAction.REMOVE_FROM_HRE],
    tooltip: (province: Province, date: Date | null, gameState: GameState): Localizations => {
      const history = getProvinceHistory(province, date);

      if (history && history.hre) {
        return inHreLocalization;
      } else {
        return notInHreLocalization;
      }
    },
    overrideOceans: false,
    overrideImpassable: false,
  },
  [MapMod.OWNER]: {
    mapMod: MapMod.OWNER,
    canSelect: true,
    provinceColor: (province: Province, date: Date | null, { countries }: GameState) => {
      const history = getProvinceHistory(province, date);

      if (history && history.owner && countries[history.owner]) {
        return countries[history.owner].color.hex;
      } else {
        return emptyColor;
      }
    },
    borderColor: () => "black",
    dashArray: () => undefined,
    actions: [MapAction.CHANGE_OWNER, MapAction.CHANGE_OWNER_AND_CONTROLLER, MapAction.CHANGE_OWNER_AND_CONTROLLER_AND_CORE, MapAction.DECOLONIZE],
    tooltip: (province: Province, date: Date | null, { countries }: GameState): Localizations => {
      const history = getProvinceHistory(province, date);

      if (history && history.owner && countries[history.owner]) {
        return countries[history.owner];
      } else {
        return defaultLocalization;
      }
    },
    overrideOceans: false,
    overrideImpassable: false,
  },
  [MapMod.CONTROLLER]: {
    mapMod: MapMod.CONTROLLER,
    canSelect: true,
    provinceColor: (province: Province, date: Date | null, { countries }: GameState) => {
      const history = getProvinceHistory(province, date);

      if (history && history.controller && countries[history.controller]) {
        return countries[history.controller].color.hex;
      } else {
        return emptyColor;
      }
    },
    borderColor: (province: Province, date: Date | null, { countries }: GameState) => {
      const history = getProvinceHistory(province, date);

      if (history) {
        if (history.owner && countries[history.owner] && history.controller && countries[history.controller] && history.owner !== history.controller) {
          return countries[history.owner].color.hex;
        } else {
          return "black";
        }
      } else {
        return "black";
      }
    },
    dashArray: (province: Province, date: Date | null, { countries }: GameState) => {
      const history = getProvinceHistory(province, date);

      if (history) {
        if (history.owner && countries[history.owner] && history.controller && countries[history.controller] && history.owner !== history.controller) {
          return "5";
        } else {
          return undefined;
        }
      } else {
        return undefined;
      }
    },
    actions: [MapAction.CHANGE_CONTROLLER, MapAction.CHANGE_OWNER_AND_CONTROLLER, MapAction.CHANGE_OWNER_AND_CONTROLLER_AND_CORE, MapAction.DECOLONIZE],
    tooltip: (province: Province, date: Date | null, { countries }: GameState): Localizations => {
      const history = getProvinceHistory(province, date);

      if (history && history.controller && countries[history.controller]) {
        return countries[history.controller];
      } else {
        return defaultLocalization;
      }
    },
    overrideOceans: false,
    overrideImpassable: false,
  },
  [MapMod.PROVINCE]: {
    mapMod: MapMod.PROVINCE,
    canSelect: false,
    provinceColor: (province: Province) => {
      return province.color.hex;
    },
    borderColor: () => "black",
    dashArray: () => undefined,
    actions: [],
    tooltip: (province: Province, date: Date | null, gameState: GameState): Localizations => {
      return province;
    },
    overrideOceans: true,
    overrideImpassable: true,
  },
  [MapMod.REGION]: {
    mapMod: MapMod.REGION,
    canSelect: true,
    provinceColor: (province: Province, date: Date | null, { regions }: GameState) => {
      if (regions[province.region]) {
        return regions[province.region].color.hex;
      } else {
        return emptyColor;
      }
    },
    borderColor: () => "black",
    dashArray: () => undefined,
    actions: [],
    tooltip: (province: Province, date: Date | null, { regions }: GameState): Localizations => {
      if (regions[province.region]) {
        return regions[province.region];
      } else {
        return defaultLocalization;
      }
    },
    overrideOceans: false,
    overrideImpassable: false,
  },
  [MapMod.RELIGION]: {
    mapMod: MapMod.RELIGION,
    canSelect: true,
    provinceColor: (province: Province, date: Date | null, { religions }: GameState) => {
      const history = getProvinceHistory(province, date);

      if (history && religions && history.religion && religions[history.religion]) {
        return religions[history.religion].color.hex;
      } else {
        return emptyColor;
      }
    },
    borderColor: () => "black",
    dashArray: () => undefined,
    actions: [MapAction.CHANGE_RELIGION],
    tooltip: (province: Province, date: Date | null, { religions }: GameState): Localizations => {
      const history = getProvinceHistory(province, date);

      if (history && history.religion && religions[history.religion]) {
        return religions[history.religion];
      } else {
        return defaultLocalization;
      }
    },
    overrideOceans: false,
    overrideImpassable: false,
  },
  [MapMod.SUPER_REGION]: {
    mapMod: MapMod.SUPER_REGION,
    canSelect: true,
    provinceColor: (province: Province, date: Date | null, { superRegions }: GameState) => {
      if (superRegions[province.superRegion]) {
        return superRegions[province.superRegion].color.hex;
      } else {
        return emptyColor;
      }
    },
    borderColor: () => "black",
    dashArray: () => undefined,
    actions: [],
    tooltip: (province: Province, date: Date | null, { superRegions }: GameState): Localizations => {
      if (superRegions[province.superRegion]) {
        return superRegions[province.superRegion];
      } else {
        return defaultLocalization;
      }
    },
    overrideOceans: false,
    overrideImpassable: false,
  },
  [MapMod.TRADE_GOOD]: {
    mapMod: MapMod.TRADE_GOOD,
    canSelect: true,
    provinceColor: (province: Province, date: Date | null, { tradeGoods }: GameState) => {
      const history = getProvinceHistory(province, date);

      if (history && history.tradeGood && tradeGoods[history.tradeGood]) {
        return tradeGoods[history.tradeGood].color.hex;
      } else {
        return emptyColor;
      }
    },
    borderColor: () => "black",
    dashArray: () => undefined,
    actions: [MapAction.CHANGE_TRADE_GOOD],
    tooltip: (province: Province, date: Date | null, { tradeGoods }: GameState): Localizations => {
      const history = getProvinceHistory(province, date);

      if (history && history.tradeGood && tradeGoods[history.tradeGood]) {
        return tradeGoods[history.tradeGood];
      } else {
        return defaultLocalization;
      }
    },
    overrideOceans: false,
    overrideImpassable: false,
  },
  [MapMod.TRADE_NODE]: {
    mapMod: MapMod.TRADE_NODE,
    canSelect: true,
    provinceColor: (province: Province, date: Date | null, { tradeNodes }: GameState) => {
      if (tradeNodes[province.tradeNode]) {
        return tradeNodes[province.tradeNode].color.hex;
      } else {
        return emptyColor;
      }
    },
    borderColor: () => "black",
    dashArray: () => undefined,
    actions: [MapAction.CHANGE_TRADE_NODE],
    tooltip: (province: Province, date: Date | null, { tradeNodes }: GameState): Localizations => {
      if (tradeNodes[province.tradeNode]) {
        return tradeNodes[province.tradeNode];
      } else {
        return defaultLocalization;
      }
    },
    overrideOceans: false,
    overrideImpassable: false,
  },
  [MapMod.COLONIAL_REGION]: {
    mapMod: MapMod.COLONIAL_REGION,
    canSelect: true,
    provinceColor: (province: Province, date: Date | null, { colonialRegions }: GameState) => {
      if (colonialRegions[province.colonialRegion]) {
        return colonialRegions[province.colonialRegion].color.hex;
      } else {
        return emptyColor;
      }
    },
    borderColor: () => "black",
    dashArray: () => undefined,
    actions: [MapAction.CHANGE_COLONIAL_REGION, MapAction.REMOVE_COLONIAL_REGION],
    tooltip: (province: Province, date: Date | null, { colonialRegions }: GameState): Localizations => {
      if (colonialRegions[province.colonialRegion]) {
        return colonialRegions[province.colonialRegion];
      } else {
        return defaultLocalization;
      }
    },
    overrideOceans: false,
    overrideImpassable: false,
  },
  [MapMod.TRADE_COMPANY]: {
    mapMod: MapMod.TRADE_COMPANY,
    canSelect: true,
    provinceColor: (province: Province, date: Date | null, { tradeCompanies }: GameState) => {
      if (tradeCompanies[province.tradeCompany]) {
        return tradeCompanies[province.tradeCompany].color.hex;
      } else {
        return emptyColor;
      }
    },
    borderColor: () => "black",
    dashArray: () => undefined,
    actions: [MapAction.CHANGE_TRADE_COMPANY, MapAction.REMOVE_TRADE_COMPANY],
    tooltip: (province: Province, date: Date | null, { tradeCompanies }: GameState): Localizations => {
      if (tradeCompanies[province.tradeCompany]) {
        return tradeCompanies[province.tradeCompany];
      } else {
        return defaultLocalization;
      }
    },
    overrideOceans: false,
    overrideImpassable: false,
  },
  [MapMod.WINTER]: {
    mapMod: MapMod.WINTER,
    canSelect: true,
    provinceColor: (province: Province, date: Date | null, { winters }: GameState) => {
      if (winters[province.winter]) {
        return winters[province.winter].color.hex;
      } else {
        return emptyColor;
      }
    },
    borderColor: () => "black",
    dashArray: () => undefined,
    actions: [MapAction.CHANGE_WINTER],
    tooltip: (province: Province, date: Date | null, { winters }: GameState): Localizations => {
      if (winters[province.winter]) {
        return winters[province.winter];
      } else {
        return defaultLocalization;
      }
    },
    overrideOceans: false,
    overrideImpassable: false,
  },
  [MapMod.MONSOON]: {
    mapMod: MapMod.MONSOON,
    canSelect: true,
    provinceColor: (province: Province, date: Date | null, { monsoons }: GameState) => {
      if (monsoons[province.monsoon]) {
        return monsoons[province.monsoon].color.hex;
      } else {
        return emptyColor;
      }
    },
    borderColor: () => "black",
    dashArray: () => undefined,
    actions: [MapAction.CHANGE_MONSOON],
    tooltip: (province: Province, date: Date | null, { monsoons }: GameState): Localizations => {
      if (monsoons[province.monsoon]) {
        return monsoons[province.monsoon];
      } else {
        return defaultLocalization;
      }
    },
    overrideOceans: false,
    overrideImpassable: false,
  },
  [MapMod.CLIMATE]: {
    mapMod: MapMod.CLIMATE,
    canSelect: true,
    provinceColor: (province: Province, date: Date | null, { climates }: GameState) => {
      if (climates[province.climate]) {
        return climates[province.climate].color.hex;
      } else {
        return emptyColor;
      }
    },
    borderColor: () => "black",
    dashArray: () => undefined,
    actions: [MapAction.CHANGE_CLIMATE],
    tooltip: (province: Province, date: Date | null, { climates }: GameState): Localizations => {
      if (climates[province.climate]) {
        return climates[province.climate];
      } else {
        return defaultLocalization;
      }
    },
    overrideOceans: false,
    overrideImpassable: true,
  },
  [MapMod.TERRAIN]: {
    mapMod: MapMod.TERRAIN,
    canSelect: true,
    provinceColor: (province: Province, date: Date | null, { terrainCategories }: GameState) => {
      if (terrainCategories[province.terrain]) {
        return terrainCategories[province.terrain].color.hex;
      } else {
        return emptyColor;
      }
    },
    borderColor: () => "black",
    dashArray: () => undefined,
    actions: [MapAction.CHANGE_TERRAIN],
    tooltip: (province: Province, date: Date | null, { terrainCategories }: GameState): Localizations => {
      if (terrainCategories[province.terrain]) {
        return terrainCategories[province.terrain];
      } else {
        return defaultLocalization;
      }
    },
    overrideOceans: true,
    overrideImpassable: false,
  },
};

export const mapActions: Record<MapAction, IMapAction> = {
  [MapAction.CHANGE_OWNER]: {
    mapAction: MapAction.CHANGE_OWNER,
    action: (provinces, date, target) => {
      return actions.province.changeOwner(provinces, date, target as Country);
    },
    noTarget: false,
  },
  [MapAction.CHANGE_CONTROLLER]: {
    mapAction: MapAction.CHANGE_CONTROLLER,
    action: (provinces, date, target) => {
      return actions.province.changeController(provinces, date, target as Country);
    },
    noTarget: false,
  },
  [MapAction.CHANGE_OWNER_AND_CONTROLLER]: {
    mapAction: MapAction.CHANGE_OWNER_AND_CONTROLLER,
    action: (provinces, date, target) => {
      return actions.province.changeOwnerAndController(provinces, date, target as Country);
    },
    noTarget: false,
  },
  [MapAction.CHANGE_OWNER_AND_CONTROLLER_AND_CORE]: {
    mapAction: MapAction.CHANGE_OWNER_AND_CONTROLLER_AND_CORE,
    action: (provinces, date, target) => {
      return actions.province.changeOwnerAndControllerAndCore(provinces, date, target as Country);
    },
    noTarget: false,
  },
  [MapAction.ADD_TO_HRE]: {
    mapAction: MapAction.ADD_TO_HRE,
    action: (provinces, date, target) => {
      return actions.province.addToHre(provinces, date);
    },
    noTarget: true,
  },
  [MapAction.REMOVE_FROM_HRE]: {
    mapAction: MapAction.REMOVE_FROM_HRE,
    action: (provinces, date, target) => {
      return actions.province.removeFromHre(provinces, date);
    },
    noTarget: true,
  },
  [MapAction.CHANGE_TRADE_GOOD]: {
    mapAction: MapAction.CHANGE_TRADE_GOOD,
    action: (provinces, date, target) => {
      return actions.province.changeTradeGood(provinces, date, target as TradeGood);
    },
    noTarget: false,
  },
  [MapAction.CHANGE_RELIGION]: {
    mapAction: MapAction.CHANGE_RELIGION,
    action: (provinces, date, target) => {
      return actions.province.changeReligion(provinces, date, target as Religion);
    },
    noTarget: false,
  },
  [MapAction.CHANGE_CULTURE]: {
    mapAction: MapAction.CHANGE_CULTURE,
    action: (provinces, date, target) => {
      return actions.province.changeCulture(provinces, date, target as Culture);
    },
    noTarget: false,
  },
  [MapAction.DECOLONIZE]: {
    mapAction: MapAction.DECOLONIZE,
    action: (provinces, date, target) => {
      return actions.province.decolonize(provinces, date);
    },
    noTarget: true,
  },
  [MapAction.CHANGE_TRADE_NODE]: {
    mapAction: MapAction.CHANGE_TRADE_NODE,
    action: (provinces, date, target) => {
      return actions.province.changeTradeNode(provinces, target as TradeNode);
    },
    noTarget: false,
  },
  [MapAction.CHANGE_AREA]: {
    mapAction: MapAction.CHANGE_AREA,
    action: (provinces, date, target) => {
      return actions.province.changeArea(provinces, target as Area);
    },
    noTarget: false,
  },
  [MapAction.CHANGE_COLONIAL_REGION]: {
    mapAction: MapAction.CHANGE_COLONIAL_REGION,
    action: (provinces, date, target) => {
      return actions.province.changeColonialRegion(provinces, target as ColonialRegion);
    },
    noTarget: false,
  },
  [MapAction.REMOVE_COLONIAL_REGION]: {
    mapAction: MapAction.REMOVE_COLONIAL_REGION,
    action: (provinces, date, target) => {
      return actions.province.removeColonialRegion(provinces);
    },
    noTarget: true,
  },
  [MapAction.CHANGE_TRADE_COMPANY]: {
    mapAction: MapAction.CHANGE_TRADE_COMPANY,
    action: (provinces, date, target) => {
      return actions.province.changeTradeCompany(provinces, target as TradeCompany);
    },
    noTarget: false,
  },
  [MapAction.REMOVE_TRADE_COMPANY]: {
    mapAction: MapAction.REMOVE_TRADE_COMPANY,
    action: (provinces, date, target) => {
      return actions.province.removeTradeCompany(provinces);
    },
    noTarget: true,
  },
  [MapAction.CHANGE_WINTER]: {
    mapAction: MapAction.CHANGE_WINTER,
    action: (provinces, date, target) => {
      return actions.province.changeWinter(provinces, target as ProvinceList);
    },
    noTarget: false,
  },
  [MapAction.CHANGE_CLIMATE]: {
    mapAction: MapAction.CHANGE_CLIMATE,
    action: (provinces, date, target) => {
      return actions.province.changeClimate(provinces, target as ProvinceList);
    },
    noTarget: false,
  },
  [MapAction.CHANGE_MONSOON]: {
    mapAction: MapAction.CHANGE_MONSOON,
    action: (provinces, date, target) => {
      return actions.province.changeMonsoon(provinces, target as ProvinceList);
    },
    noTarget: false,
  },
  [MapAction.CHANGE_TERRAIN]: {
    mapAction: MapAction.CHANGE_TERRAIN,
    action: (provinces, date, target) => {
      return actions.province.changeTerrain(provinces, target as TerrainCategory);
    },
    noTarget: false,
  },
};

export const getTargets = (mapAction: MapAction, gameState: GameState): Array<Localizations> => {
  switch (mapAction) {
    case MapAction.CHANGE_OWNER:
      return gameState.sortedCountries;
    case MapAction.CHANGE_CONTROLLER:
      return gameState.sortedCountries;
    case MapAction.CHANGE_OWNER_AND_CONTROLLER:
      return gameState.sortedCountries;
    case MapAction.CHANGE_OWNER_AND_CONTROLLER_AND_CORE:
      return gameState.sortedCountries;
    case MapAction.ADD_TO_HRE:
      return [];
    case MapAction.REMOVE_FROM_HRE:
      return [];
    case MapAction.CHANGE_TRADE_GOOD:
      return gameState.sortedTradeGoods;
    case MapAction.CHANGE_RELIGION:
      return gameState.sortedReligions;
    case MapAction.CHANGE_CULTURE:
      return gameState.sortedCultures;
    case MapAction.DECOLONIZE:
      return [];
    case MapAction.CHANGE_TRADE_NODE:
      return gameState.sortedTradeNodes;
    case MapAction.CHANGE_AREA:
      return gameState.sortedAreas;
    case MapAction.CHANGE_COLONIAL_REGION:
      return gameState.sortedColonialRegions;
    case MapAction.REMOVE_COLONIAL_REGION:
      return [];
    case MapAction.CHANGE_TRADE_COMPANY:
      return gameState.sortedTradeCompanies;
    case MapAction.REMOVE_TRADE_COMPANY:
      return [];
    case MapAction.CHANGE_WINTER:
      return gameState.sortedWinters;
    case MapAction.CHANGE_CLIMATE:
      return gameState.sortedClimates;
    case MapAction.CHANGE_MONSOON:
      return gameState.sortedMonsoons;
    case MapAction.CHANGE_TERRAIN:
      return gameState.sortedTerrainCategories;
  }
};

export const getProvinceStyle = (id: number, mapMod: MapMod, date: Date | null, gameState: GameState, selectedProvinces: Array<number>): PathOptions => {
  let color;
  let borderColor = "black";
  let dashArray = undefined;

  if (gameState.provinces) {
    const province = gameState.provinces[id] as Province;
    const mod = mapMods[mapMod];

    if (province.impassable) {
      color = mod.overrideImpassable ? mod.provinceColor(province, date, gameState) : "#5e5e5e";
    } else if (province.ocean || province.lake) {
      color = mod.overrideOceans ? mod.provinceColor(province, date, gameState) : "#446ba3";
    } else {
      color = mod.provinceColor(province, date, gameState);
    }

    borderColor = mod.borderColor(province, date, gameState);
    dashArray = mod.dashArray(province, date, gameState);
  }

  let includes = selectedProvinces.includes(id);

  return {
    fillColor: color,
    weight: includes ? 4 : 2,
    color: includes ? "red" : borderColor,
    dashArray: dashArray,
    fillOpacity: includes ? 0.5 : 1,
  };
};

export const onClickProvince = (id: number, path: Path, mapMod: MapMod, { provinces }: GameState, includes: boolean) => {
  path.setStyle({
    ...path.options,
    weight: includes ? 4 : 2,
    color: includes ? "red" : "black",
    fillOpacity: includes ? 0.5 : 1,
  });

  if (includes) {
    path.bringToFront();
  }
};

import { Path, PathOptions } from "leaflet";
import { Dispatch } from "react";
import actions from "../store/actions";
import { GameActionType, GameState } from "../store/game/game.types";
import { Area, ColonialRegion, Country, Culture, Localizations, Province, Religion, TradeCompany, TradeGood, TradeNode } from "../types";
import { getEmperor } from "./emperor.utils";
import { defaultLocalization, inHreLocalization, notInHreLocalization } from "./localisations.utils";
import { getHistory } from "./province.utils";

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
      if (areas && areas[province.area]) {
        return areas[province.area].color.hex;
      } else {
        return emptyColor;
      }
    },
    borderColor: () => "black",
    dashArray: () => undefined,
    actions: [MapAction.CHANGE_AREA],
    tooltip: (province: Province, date: Date | null, { areas }: GameState): Localizations => {
      if (areas && areas[province.area]) {
        return areas[province.area];
      } else {
        return defaultLocalization;
      }
    },
    overrideOceans: false,
  },
  [MapMod.CULTURE]: {
    mapMod: MapMod.CULTURE,
    canSelect: true,
    provinceColor: (province: Province, date: Date | null, { cultures }: GameState) => {
      const history = getHistory(province, date);

      if (history && cultures && history.culture && cultures[history.culture]) {
        return cultures[history.culture].color.hex;
      } else {
        return emptyColor;
      }
    },
    borderColor: () => "black",
    dashArray: () => undefined,
    actions: [MapAction.CHANGE_CULTURE],
    tooltip: (province: Province, date: Date | null, { cultures }: GameState): Localizations => {
      const history = getHistory(province, date);

      if (history && cultures && history.culture && cultures[history.culture]) {
        return cultures[history.culture];
      } else {
        return defaultLocalization;
      }
    },
    overrideOceans: false,
  },
  [MapMod.HRE]: {
    mapMod: MapMod.HRE,
    canSelect: true,
    provinceColor: (province: Province, date: Date | null, { countries, hreEmperors }: GameState) => {
      const history = getHistory(province, date);

      if (history && countries && history.owner && countries[history.owner]) {
        if (getEmperor(date, hreEmperors) === history.owner) {
          return "#7f004c";
        } else if (countries[history.owner].elector) {
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
      const history = getHistory(province, date);

      if (history && history.hre) {
        return inHreLocalization;
      } else {
        return notInHreLocalization;
      }
    },
    overrideOceans: false,
  },
  [MapMod.OWNER]: {
    mapMod: MapMod.OWNER,
    canSelect: true,
    provinceColor: (province: Province, date: Date | null, { countries }: GameState) => {
      const history = getHistory(province, date);

      if (history && countries && history.owner && countries[history.owner]) {
        return countries[history.owner].color.hex;
      } else {
        return emptyColor;
      }
    },
    borderColor: () => "black",
    dashArray: () => undefined,
    actions: [MapAction.CHANGE_OWNER, MapAction.CHANGE_OWNER_AND_CONTROLLER, MapAction.CHANGE_OWNER_AND_CONTROLLER_AND_CORE, MapAction.DECOLONIZE],
    tooltip: (province: Province, date: Date | null, { countries }: GameState): Localizations => {
      const history = getHistory(province, date);

      if (history && countries && history.owner && countries[history.owner]) {
        return countries[history.owner];
      } else {
        return defaultLocalization;
      }
    },
    overrideOceans: false,
  },
  [MapMod.CONTROLLER]: {
    mapMod: MapMod.CONTROLLER,
    canSelect: true,
    provinceColor: (province: Province, date: Date | null, { countries }: GameState) => {
      const history = getHistory(province, date);

      if (history && countries && history.controller && countries[history.controller]) {
        return countries[history.controller].color.hex;
      } else {
        return emptyColor;
      }
    },
    borderColor: (province: Province, date: Date | null, { countries }: GameState) => {
      const history = getHistory(province, date);

      if (history && countries) {
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
      const history = getHistory(province, date);

      if (history && countries) {
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
      const history = getHistory(province, date);

      if (history && countries && history.controller && countries[history.controller]) {
        return countries[history.controller];
      } else {
        return defaultLocalization;
      }
    },
    overrideOceans: false,
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
    overrideOceans: false,
  },
  [MapMod.REGION]: {
    mapMod: MapMod.REGION,
    canSelect: true,
    provinceColor: (province: Province, date: Date | null, { regions }: GameState) => {
      if (regions && regions[province.region]) {
        return regions[province.region].color.hex;
      } else {
        return emptyColor;
      }
    },
    borderColor: () => "black",
    dashArray: () => undefined,
    actions: [],
    tooltip: (province: Province, date: Date | null, { regions }: GameState): Localizations => {
      if (regions && regions[province.region]) {
        return regions[province.region];
      } else {
        return defaultLocalization;
      }
    },
    overrideOceans: false,
  },
  [MapMod.RELIGION]: {
    mapMod: MapMod.RELIGION,
    canSelect: true,
    provinceColor: (province: Province, date: Date | null, { religions }: GameState) => {
      const history = getHistory(province, date);

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
      const history = getHistory(province, date);

      if (history && religions && history.religion && religions[history.religion]) {
        return religions[history.religion];
      } else {
        return defaultLocalization;
      }
    },
    overrideOceans: false,
  },
  [MapMod.SUPER_REGION]: {
    mapMod: MapMod.SUPER_REGION,
    canSelect: true,
    provinceColor: (province: Province, date: Date | null, { superRegions }: GameState) => {
      if (superRegions && superRegions[province.superRegion]) {
        return superRegions[province.superRegion].color.hex;
      } else {
        return emptyColor;
      }
    },
    borderColor: () => "black",
    dashArray: () => undefined,
    actions: [],
    tooltip: (province: Province, date: Date | null, { superRegions }: GameState): Localizations => {
      if (superRegions && superRegions[province.superRegion]) {
        return superRegions[province.superRegion];
      } else {
        return defaultLocalization;
      }
    },
    overrideOceans: false,
  },
  [MapMod.TRADE_GOOD]: {
    mapMod: MapMod.TRADE_GOOD,
    canSelect: true,
    provinceColor: (province: Province, date: Date | null, { tradeGoods }: GameState) => {
      const history = getHistory(province, date);

      if (history && tradeGoods && history.tradeGood && tradeGoods[history.tradeGood]) {
        return tradeGoods[history.tradeGood].color.hex;
      } else {
        return emptyColor;
      }
    },
    borderColor: () => "black",
    dashArray: () => undefined,
    actions: [MapAction.CHANGE_TRADE_GOOD],
    tooltip: (province: Province, date: Date | null, { tradeGoods }: GameState): Localizations => {
      const history = getHistory(province, date);

      if (history && tradeGoods && history.tradeGood && tradeGoods[history.tradeGood]) {
        return tradeGoods[history.tradeGood];
      } else {
        return defaultLocalization;
      }
    },
    overrideOceans: false,
  },
  [MapMod.TRADE_NODE]: {
    mapMod: MapMod.TRADE_NODE,
    canSelect: true,
    provinceColor: (province: Province, date: Date | null, { tradeNodes }: GameState) => {
      if (tradeNodes && tradeNodes[province.tradeNode]) {
        return tradeNodes[province.tradeNode].color.hex;
      } else {
        return emptyColor;
      }
    },
    borderColor: () => "black",
    dashArray: () => undefined,
    actions: [MapAction.CHANGE_TRADE_NODE],
    tooltip: (province: Province, date: Date | null, { tradeNodes }: GameState): Localizations => {
      if (tradeNodes && tradeNodes[province.tradeNode]) {
        return tradeNodes[province.tradeNode];
      } else {
        return defaultLocalization;
      }
    },
    overrideOceans: false,
  },
  [MapMod.COLONIAL_REGION]: {
    mapMod: MapMod.COLONIAL_REGION,
    canSelect: true,
    provinceColor: (province: Province, date: Date | null, { colonialRegions }: GameState) => {
      if (colonialRegions && colonialRegions[province.colonialRegion]) {
        return colonialRegions[province.colonialRegion].color.hex;
      } else {
        return emptyColor;
      }
    },
    borderColor: () => "black",
    dashArray: () => undefined,
    actions: [MapAction.CHANGE_COLONIAL_REGION, MapAction.REMOVE_COLONIAL_REGION],
    tooltip: (province: Province, date: Date | null, { colonialRegions }: GameState): Localizations => {
      if (colonialRegions && colonialRegions[province.colonialRegion]) {
        return colonialRegions[province.colonialRegion];
      } else {
        return defaultLocalization;
      }
    },
    overrideOceans: false,
  },
  [MapMod.TRADE_COMPANY]: {
    mapMod: MapMod.TRADE_COMPANY,
    canSelect: true,
    provinceColor: (province: Province, date: Date | null, { tradeCompanies }: GameState) => {
      if (tradeCompanies && tradeCompanies[province.tradeCompany]) {
        return tradeCompanies[province.tradeCompany].color.hex;
      } else {
        return emptyColor;
      }
    },
    borderColor: () => "black",
    dashArray: () => undefined,
    actions: [MapAction.CHANGE_TRADE_COMPANY, MapAction.REMOVE_TRADE_COMPANY],
    tooltip: (province: Province, date: Date | null, { tradeCompanies }: GameState): Localizations => {
      if (tradeCompanies && tradeCompanies[province.tradeCompany]) {
        return tradeCompanies[province.tradeCompany];
      } else {
        return defaultLocalization;
      }
    },
    overrideOceans: false,
  },
  [MapMod.WINTER]: {
    mapMod: MapMod.WINTER,
    canSelect: true,
    provinceColor: (province: Province, date: Date | null, { winters }: GameState) => {
      if (winters && winters[province.winter]) {
        return winters[province.winter].color.hex;
      } else {
        return emptyColor;
      }
    },
    borderColor: () => "black",
    dashArray: () => undefined,
    actions: [MapAction.CHANGE_TRADE_COMPANY, MapAction.REMOVE_TRADE_COMPANY],
    tooltip: (province: Province, date: Date | null, { winters }: GameState): Localizations => {
      if (winters && winters[province.winter]) {
        return winters[province.winter];
      } else {
        return defaultLocalization;
      }
    },
    overrideOceans: false,
  },
  [MapMod.CLIMATE]: {
    mapMod: MapMod.CLIMATE,
    canSelect: true,
    provinceColor: (province: Province, date: Date | null, { climates }: GameState) => {
      if (climates && climates[province.climate]) {
        return climates[province.climate].color.hex;
      } else {
        return emptyColor;
      }
    },
    borderColor: () => "black",
    dashArray: () => undefined,
    actions: [],
    tooltip: (province: Province, date: Date | null, { climates }: GameState): Localizations => {
      if (climates && climates[province.climate]) {
        return climates[province.climate];
      } else {
        return defaultLocalization;
      }
    },
    overrideOceans: false,
  },
  [MapMod.TERRAIN]: {
    mapMod: MapMod.TERRAIN,
    canSelect: true,
    provinceColor: (province: Province, date: Date | null, { terrainCategories }: GameState) => {
      if (terrainCategories && terrainCategories[province.terrain]) {
        return terrainCategories[province.terrain].color.hex;
      } else {
        return emptyColor;
      }
    },
    borderColor: () => "black",
    dashArray: () => undefined,
    actions: [],
    tooltip: (province: Province, date: Date | null, { terrainCategories }: GameState): Localizations => {
      if (terrainCategories && terrainCategories[province.terrain]) {
        return terrainCategories[province.terrain];
      } else {
        return defaultLocalization;
      }
    },
    overrideOceans: true,
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
};

export const getTargets = (mapAction: MapAction, gameState: GameState): Array<Localizations> => {
  switch (mapAction) {
    case MapAction.CHANGE_OWNER:
      return gameState.sortedCountries ? gameState.sortedCountries : [];
    case MapAction.CHANGE_CONTROLLER:
      return gameState.sortedCountries ? gameState.sortedCountries : [];
    case MapAction.CHANGE_OWNER_AND_CONTROLLER:
      return gameState.sortedCountries ? gameState.sortedCountries : [];
    case MapAction.CHANGE_OWNER_AND_CONTROLLER_AND_CORE:
      return gameState.sortedCountries ? gameState.sortedCountries : [];
    case MapAction.ADD_TO_HRE:
      return [];
    case MapAction.REMOVE_FROM_HRE:
      return [];
    case MapAction.CHANGE_TRADE_GOOD:
      return gameState.sortedTradeGoods ? gameState.sortedTradeGoods : [];
    case MapAction.CHANGE_RELIGION:
      return gameState.sortedReligions ? gameState.sortedReligions : [];
    case MapAction.CHANGE_CULTURE:
      return gameState.sortedCultures ? gameState.sortedCultures : [];
    case MapAction.DECOLONIZE:
      return [];
    case MapAction.CHANGE_TRADE_NODE:
      return gameState.sortedTradeNodes ? gameState.sortedTradeNodes : [];
    case MapAction.CHANGE_AREA:
      return gameState.sortedAreas ? gameState.sortedAreas : [];
    case MapAction.CHANGE_COLONIAL_REGION:
      return gameState.sortedColonialRegions ? gameState.sortedColonialRegions : [];
    case MapAction.REMOVE_COLONIAL_REGION:
      return [];
    case MapAction.CHANGE_TRADE_COMPANY:
      return gameState.sortedTradeCompanies ? gameState.sortedTradeCompanies : [];
    case MapAction.REMOVE_TRADE_COMPANY:
      return [];
  }
};

export const getProvinceStyle = (id: number, mapMod: MapMod, date: Date | null, gameState: GameState = {}, selectedProvinces: Array<number>): PathOptions => {
  let color;
  let borderColor = "black";
  let dashArray = undefined;

  if (gameState.provinces) {
    const province = gameState.provinces[id] as Province;
    const mod = mapMods[mapMod];

    if (province.impassable) {
      color = "#5e5e5e";
    } else if (!mod.overrideOceans && (province.ocean || province.lake)) {
      color = "#446ba3";
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

export const onClickProvince = (id: number, path: Path, mapMod: MapMod, { provinces }: GameState = {}, includes: boolean) => {
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

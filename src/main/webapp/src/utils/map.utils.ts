import { Path, PathOptions } from "leaflet";
import { Dispatch } from "react";
import actions from "../store/actions";
import { GameActionType, GameState } from "../store/game/game.types";
import { Country, Culture, Localizations, Province, Religion, TradeGood } from "../types";
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
}

export interface IMapMod {
  mapMod: MapMod;
  canSelect: boolean;
  provinceColor: (province: Province, date: Date | null, gameState: GameState) => string;
  borderColor: (province: Province, date: Date | null, gameState: GameState) => string;
  dashArray: (province: Province, date: Date | null, gameState: GameState) => string | number[] | undefined;
  actions: Array<MapAction>;
  tooltip: (province: Province, date: Date | null, gameState: GameState) => Localizations;
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
    actions: [],
    tooltip: (province: Province, date: Date | null, { areas }: GameState): Localizations => {
      if (areas && areas[province.area]) {
        return areas[province.area];
      } else {
        return defaultLocalization;
      }
    },
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
    actions: [MapAction.CHANGE_OWNER, MapAction.CHANGE_OWNER_AND_CONTROLLER, MapAction.CHANGE_OWNER_AND_CONTROLLER_AND_CORE],
    tooltip: (province: Province, date: Date | null, { countries }: GameState): Localizations => {
      const history = getHistory(province, date);

      if (history && countries && history.owner && countries[history.owner]) {
        return countries[history.owner];
      } else {
        return defaultLocalization;
      }
    },
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
    actions: [MapAction.CHANGE_CONTROLLER, MapAction.CHANGE_OWNER_AND_CONTROLLER, MapAction.CHANGE_OWNER_AND_CONTROLLER_AND_CORE],
    tooltip: (province: Province, date: Date | null, { countries }: GameState): Localizations => {
      const history = getHistory(province, date);

      if (history && countries && history.controller && countries[history.controller]) {
        return countries[history.controller];
      } else {
        return defaultLocalization;
      }
    },
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
    tooltip: (province: Province, date: Date | null, { countries }: GameState): Localizations => {
      return province;
    },
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
    actions: [],
    tooltip: (province: Province, date: Date | null, { tradeNodes }: GameState): Localizations => {
      if (tradeNodes && tradeNodes[province.tradeNode]) {
        return tradeNodes[province.tradeNode];
      } else {
        return defaultLocalization;
      }
    },
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
  }
};

export const getProvinceStyle = (id: number, mapMod: MapMod, date: Date | null, gameState: GameState = {}, selectedProvinces: Array<number>): PathOptions => {
  let color;
  let borderColor = "black";
  let dashArray = undefined;

  if (gameState.provinces) {
    const province = gameState.provinces[id] as Province;

    if (province.impassable) {
      color = "#5e5e5e";
    } else if (province.ocean || province.lake) {
      color = "#446ba3";
    } else {
      color = mapMods[mapMod].provinceColor(province, date, gameState);
    }

    borderColor = mapMods[mapMod].borderColor(province, date, gameState);
    dashArray = mapMods[mapMod].dashArray(province, date, gameState);
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

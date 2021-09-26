import { GeoJsonObject } from "geojson";
import {
  Area,
  ColonialRegion,
  Country,
  Culture,
  Game,
  Province,
  ProvinceList,
  Region,
  Religion,
  SuperRegion,
  TerrainCategory,
  TradeCompany,
  TradeGood,
  TradeNode,
} from "types/api.types";

export const CHANGE_GAME: "game/changeGame" = "game/changeGame";

interface ChangeGameAction {
  type: typeof CHANGE_GAME;
  payload: Game;
}

export interface GameState {
  startDate?: Date;
  endDate?: Date;
  geoJson?: GeoJsonObject;
  provinces?: Record<number, Province>;
  tradeNodes?: Record<string, TradeNode>;
  countries?: Record<string, Country>;
  tradeGoods?: Record<string, TradeGood>;
  areas?: Record<string, Area>;
  regions?: Record<string, Region>;
  superRegions?: Record<string, SuperRegion>;
  religions?: Record<string, Religion>;
  cultures?: Record<string, Culture>;
  hreEmperors?: Record<string, string>;
  celestialEmperors?: Record<string, string>;
  colonialRegions?: Record<string, ColonialRegion>;
  tradeCompanies?: Record<string, TradeCompany>;
  winters?: Record<string, ProvinceList>;
  climates?: Record<string, ProvinceList>;
  monsoons?: Record<string, ProvinceList>;
  terrainCategories?: Record<string, TerrainCategory>;
  sortedTradeNodes?: Array<TradeNode>;
  sortedCountries?: Array<Country>;
  sortedTradeGoods?: Array<TradeGood>;
  sortedAreas?: Array<Area>;
  sortedRegions?: Array<Region>;
  sortedSuperRegions?: Array<SuperRegion>;
  sortedReligions?: Array<Religion>;
  sortedCultures?: Array<Culture>;
  sortedColonialRegions?: Array<ColonialRegion>;
  sortedTradeCompanies?: Array<TradeCompany>;
  sortedWinters?: Array<ProvinceList>;
  sortedClimates?: Array<ProvinceList>;
  sortedMonsoons?: Array<ProvinceList>;
  sortedTerrainCategories?: Array<TerrainCategory>;
  defines?: Record<string, Record<string, string>>;
}

export type GameActionType = ChangeGameAction;

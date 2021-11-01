import { GeoJsonObject } from "geojson";
import {
  Area,
  ColonialRegion,
  Country,
  Culture,
  Game,
  IdeaGroup,
  KeyLocalizations,
  Mission,
  MissionsTree, ModdedKeyLocalizations,
  Modifier,
  Power,
  Province,
  ProvinceList,
  Region,
  Religion,
  SpriteType,
  SuperRegion,
  Technology,
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
  folderName: string | null;
  startDate: Date | null;
  endDate: Date | null;
  geoJson: GeoJsonObject | null;
  graphicalCultures: Record<string, KeyLocalizations>;
  provinces: Record<number, Province>;
  tradeNodes: Record<string, TradeNode>;
  countries: Record<string, Country>;
  historicalCouncils: Record<string, KeyLocalizations>;
  tradeGoods: Record<string, TradeGood>;
  areas: Record<string, Area>;
  regions: Record<string, Region>;
  superRegions: Record<string, SuperRegion>;
  religions: Record<string, Religion>;
  cultures: Record<string, Culture>;
  hreEmperors: Record<string, string>;
  celestialEmperors: Record<string, string>;
  colonialRegions: Record<string, ColonialRegion>;
  tradeCompanies: Record<string, TradeCompany>;
  winters: Record<string, ProvinceList>;
  climates: Record<string, ProvinceList>;
  monsoons: Record<string, ProvinceList>;
  terrainCategories: Record<string, TerrainCategory>;
  modifiers: Record<string, Modifier>;
  technologies: Record<Power, Array<Technology>>;
  ideaGroups: Record<string, IdeaGroup>;
  missionsTrees: Record<string, MissionsTree>;
  missions: Record<string, Mission>;
  missionsGfx: Record<string, SpriteType>;
  maxMissionsSlots: number;
  localisations: Record<string, ModdedKeyLocalizations>;
  sortedGraphicalCultures: Array<KeyLocalizations>;
  sortedTradeNodes: Array<TradeNode>;
  sortedCountries: Array<Country>;
  sortedTradeGoods: Array<TradeGood>;
  sortedAreas: Array<Area>;
  sortedRegions: Array<Region>;
  sortedSuperRegions: Array<SuperRegion>;
  sortedReligions: Array<Religion>;
  sortedCultures: Array<Culture>;
  sortedColonialRegions: Array<ColonialRegion>;
  sortedTradeCompanies: Array<TradeCompany>;
  sortedWinters: Array<ProvinceList>;
  sortedClimates: Array<ProvinceList>;
  sortedMonsoons: Array<ProvinceList>;
  sortedTerrainCategories: Array<TerrainCategory>;
  sortedModifiers: Array<Modifier>;
  sortedIdeaGroups: Array<IdeaGroup>;
  sortedMissionsTrees: Array<MissionsTree>;
  sortedMissions: Array<Mission>;
  sortedMissionsGfx: Array<SpriteType>;
  sortedLocalisations: Array<ModdedKeyLocalizations>;
  defines: Record<string, Record<string, string>>;
}

export type GameActionType = ChangeGameAction;

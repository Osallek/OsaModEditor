import { GeoJsonObject } from "geojson";

export type GameInit = {
  installFolder?: string;
  mods?: Array<IdName<string, string>>;
};

export type GameForm = {
  installFolder: string;
  mod: string;
};

export type SimpleMapActionForm = {
  provinces: Array<number>;
  target?: string | null;
};

export type MapActionForm = SimpleMapActionForm & {
  date?: string | null;
};

export type IdName<I, N> = {
  id: I;
  name?: N;
};

export type Color = {
  rgb: Array<Number>;
  hex: string;
  fake: boolean;
};

export type Localizations = {
  english: string;
  french: string;
  german: string;
  spanish: string;
};

export type Game = {
  startDate: string;
  endDate: string;
  geoJson: GeoJsonObject;
  provinces: Record<number, Province>;
  tradeNodes: Record<string, TradeNode>;
  countries: Record<string, Country>;
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
  winters: Record<string, Winter>;
  terrainCategories: Record<string, TerrainCategory>;
  climates: Record<string, Climate>;
  defines: Record<string, Record<string, string>>;
};

export type TradeNode = Localizations & {
  name: string;
  location: number;
  color: Color;
  inland: boolean;
  aiWillPropagateThroughTrade: boolean;
  end: boolean;
};

export type TerrainCategory = Localizations & {
  name: string;
  color: Color;
  water: boolean;
  soundType: string;
  inlandSea: boolean;
  defence: number;
  allowedNumOfBuildings: number;
  supplyLimit: number;
  movementCost: number;
  localDevelopmentCost: number;
  localDefensiveness: number;
  provinces: Array<number>;
};

export type Province = Localizations & {
  id: number;
  color: Color;
  name: string;
  ocean: boolean;
  lake: boolean;
  climate: string;
  impassable: boolean;
  winter: string;
  terrain: string;
  port: boolean;
  area: string;
  continent: string;
  tradeNode: string;
  region: string;
  superRegion: string;
  colonialRegion: string;
  tradeCompany: string;
  history: Array<ProvinceHistory>;
  historyFromMod: boolean;
};

export type ProvinceHistory = {
  date?: string;
  owner?: string;
  fakeOwner?: boolean;
  controller?: string;
  fakeController?: boolean;
  tradeGood?: string;
  fakeTradeGood?: boolean;
  religion?: string;
  fakeReligion?: boolean;
  culture?: string;
  fakeCulture?: boolean;
  hre?: boolean;
  fakeHre?: boolean;
  manpower?: number;
  fakeManpower?: boolean;
  tax?: number;
  fakeTax?: boolean;
  production?: number;
  fakeProduction?: boolean;
};

export type Country = Localizations & {
  tag: string;
  name: string;
  localizedName: string;
  techGroup: string;
  unitType: string;
  government: string;
  governmentRank?: string;
  primaryCulture: string;
  addAcceptedCultures?: Array<string>;
  removeAcceptedCultures?: Array<string>;
  historicalFriends?: Array<string>;
  historicalEnemies?: Array<string>;
  graphicalCulture: string;
  color: Color;
  elector?: boolean;
};

export type TradeGood = Localizations & {
  color: Color;
  name: string;
  localizedName: string;
  goldType: boolean;
  basePrice: number;
};

export type Area = Localizations & {
  name: string;
  region: string;
  provinces: Array<number>;
  color: Color;
};

export type Region = Localizations & {
  name: string;
  superRegion: string;
  areas: Array<string>;
  provinces: Array<number>;
  color: Color;
};

export type SuperRegion = Localizations & {
  name: string;
  regions: Array<string>;
  provinces: Array<number>;
  color: Color;
};

export type Religion = Localizations & {
  name: string;
  group: string;
  color: Color;
};

export type Culture = Localizations & {
  name: string;
  group: string;
  color: Color;
};

export type ColonialRegion = Localizations & {
  name: string;
  provinces: Array<number>;
  color: Color;
  taxIncome: number;
  nativeSize: number;
  nativeFerocity: number;
  nativeHostileness: number;
  tradeGoods: Record<string, number>;
  cultures: Record<string, number>;
  religions: Record<string, number>;
};

export type TradeCompany = Localizations & {
  name: string;
  provinces: Array<number>;
  color: Color;
};

export type Winter = Localizations & {
  name: string;
  color: Color;
};

export type Climate = Localizations & {
  name: string;
  color: Color;
};

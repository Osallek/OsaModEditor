import { GeoJsonObject } from "geojson";

export enum ModifierType {
  ADDITIVE = "ADDITIVE",
  MULTIPLICATIVE = "MULTIPLICATIVE",
  CONSTANT = "CONSTANT",
  BOOLEAN = "BOOLEAN",
}

export enum ModifierScope {
  COUNTRY = "COUNTRY",
  PROVINCE = "PROVINCE",
}

export enum Power {
  ADM = "ADM",
  DIP = "DIP",
  MIL = "MIL",
}

export enum ModType {
  LOCAL = "LOCAL",
  STEAM = "STEAM",
  PDX = "PDX",
}

export type FileName = {
  file: string;
};

export type GameInit = {
  installFolder?: string;
  mods: Array<Mod>;
  version: string;
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

export type Mod = {
  name: string;
  fileName: string;
  type: ModType;
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

export type KeyLocalizations = Localizations & {
  name: string;
};

export type ModdedKeyLocalizations = KeyLocalizations & {
  modded: boolean;
};

export type ProvinceList = Localizations & {
  name: string;
  color: Color;
};

export type Pair<K, V> = {
  key: K;
  value: V;
};

export type Game = {
  folderName: string;
  startDate: string;
  endDate: string;
  geoJson: GeoJsonObject;
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
  monsoons: Record<string, ProvinceList>;
  climates: Record<string, ProvinceList>;
  terrainCategories: Record<string, TerrainCategory>;
  defines: Record<string, Record<string, string>>;
  modifiers: Record<string, Modifier>;
  technologies: Record<Power, Array<Technology>>;
  ideaGroups: Record<string, IdeaGroup>;
  missionsTrees: Record<string, MissionsTree>;
  missions: Record<string, Mission>;
  missionsGfx: Record<string, SpriteType>;
  maxMissionsSlots: number;
  localisations: Record<string, ModdedKeyLocalizations>;
  advisors: Record<string, Advisor>;
  bookmarks: Record<string, Bookmark>;
  buildings: Record<string, Building>;
};

export type TradeNode = Localizations & {
  name: string;
  location: number;
  color: Color;
  inland: boolean | null;
  aiWillPropagateThroughTrade: boolean | null;
  end: boolean | null;
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
  monsoon: string;
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
  flagFile: string;
  graphicalCulture: string;
  color: Color;
  revolutionaryColor: Array<number>;
  historicalCouncil: string;
  historicalScore: number | null;
  historicalIdeaGroups: Array<string>;
  monarchNames: Array<Pair<string, number>>;
  historicalUnits: Array<string>;
  leaderNames: Array<string>;
  shipNames: Array<string>;
  armyNames: Array<string>;
  fleetNames: Array<string>;
  history: Array<CountryHistory>;
};

export type CountryHistory = {
  date: string | null;
  technologyGroup: string | null;
  unitType: string | null;
  mercantilism: number | null;
  capital: number | null;
  changedTagFrom: string | null;
  fixedCapital: number | null;
  government: string | null;
  religiousSchool: string | null;
  nationalFocus: string | null;
  governmentRank: number | null;
  primaryCulture: string | null;
  religion: string | null;
  joinLeague: string | null;
  addArmyProfessionalism: number | null;
  addAcceptedCulture: Array<string> | null;
  removeAcceptedCulture: Array<string> | null;
  historicalFriend: Array<string> | null;
  historicalRival: Array<string> | null;
  elector: boolean | null;
  Boolean: boolean | null;
  addHeirPersonality: Array<string> | null;
  addRulerPersonality: Array<string> | null;
  addQueenPersonality: Array<string> | null;
  setEstatePrivilege: Array<string> | null;
  addGovernmentReform: Array<string> | null;
  setCountryFlag: Array<string> | null;
  changeEstateLandShare: Array<ChangeEstateLandShare> | null;
};

export type ChangeEstateLandShare = {
  estate: string;
  share: number;
};

export type TradeGood = Localizations & {
  color: Color;
  name: string;
  goldType: boolean | null;
  basePrice: number | null;
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

export type Modifier = Localizations & {
  id: string;
  type: ModifierType;
  scope: ModifierScope;
};

export type Modifiers = {
  enables: Array<string> | null;
  modifiers: Record<string, number> | null;
};

export type Technology = Localizations & {
  number: number;
  type: Power;
  year: number;
  modifiers: Modifiers | null;
};

export type IdeaGroup = Localizations & {
  name: string;
  category: Power;
  free: boolean | null;
  start: Modifiers;
  bonus: Modifiers;
  ideas: Record<string, Modifiers>;
};

export type MissionsTree = {
  name: string;
  slot?: number;
  generic?: boolean;
  ai?: boolean;
  hasCountryShield?: boolean;
  missions: Array<string>;
};

export type MissionsTreeEdit = {
  slot?: number;
  generic?: boolean;
  ai?: boolean;
  hasCountryShield?: boolean;
};

export type Mission = Localizations & {
  name: string;
  missionsTree: string;
  icon?: string;
  iconFile?: string;
  position?: number;
  generic?: boolean;
  completedBy?: string;
  requiredMissions: Array<string>;
};

export type MissionEdit = {
  position?: number;
  icon?: string;
  generic?: boolean;
  completedBy?: string;
  requiredMissions: Array<string>;
};

export type SpriteType = {
  name: string;
  textureFile: string;
  transparenceCheck?: boolean;
  loadType: string;
};

export type Advisor = Localizations & {
  name: string;
  power: Power;
  allowOnlyMale?: boolean;
  allowOnlyFemale?: boolean;
  sprite: string;
  modifiers: Modifiers | null;
  scaledModifiers: Modifiers | null;
};

export type AdvisorEdit = {
  power: Power;
  allowOnlyMale?: boolean;
  allowOnlyFemale?: boolean;
  modifiers: Record<string, number>;
  scaledModifiers: Record<string, number>;
};

export type Bookmark = Localizations & {
  name: string;
  desc: string;
  date: string;
  center: number | null;
  default: boolean | null;
  countries: Array<string>;
  easyCountries: Array<string>;
};

export type BookmarkEdit = {
  date: string;
  center?: number;
  default?: boolean;
  countries: Array<string>;
  easyCountries: Array<string>;
};

export type Building = Localizations & {
  name: string;
  sprite: string;
  cost: number | null;
  time: boolean | null;
  makeObsolete: string | null;
  onePerCountry: boolean | null;
  allowInGoldProvince: boolean | null;
  indestructible: boolean | null;
  onMap: boolean | null;
  influencingFort: boolean | null;
  manufactoryFor: Array<string>;
  bonusManufactoryFor: Array<string>;
  governmentSpecific: boolean | null;
  showSeparate: boolean | null;
  modifiers: Modifiers;
};

export enum ServerSuccesses {
  DEFAULT_SUCCESS = "DEFAULT_SUCCESS",
}

export enum ServerErrors {
  DEFAULT_ERROR = "DEFAULT_ERROR",
  MISSING_PARAMETER = "MISSING_PARAMETER",
  MOD_NOT_FOUND = "MOD_NOT_FOUND",
  DESCRIPTOR_FILE_NOT_FOUND = "DESCRIPTOR_FILE_NOT_FOUND",
  AREA_NOT_FOUND = "AREA_NOT_FOUND",
  TRADE_COMPANY_NOT_FOUND = "TRADE_COMPANY_NOT_FOUND",
  CLIMATE_NOT_FOUND = "CLIMATE_NOT_FOUND",
  COLONIAL_REGION_NOT_FOUND = "COLONIAL_REGION_NOT_FOUND",
  COUNTRY_NOT_FOUND = "COUNTRY_NOT_FOUND",
  CULTURE_NOT_FOUND = "CULTURE_NOT_FOUND",
  MONSOON_NOT_FOUND = "MONSOON_NOT_FOUND",
  PROVINCE_NOT_FOUND = "PROVINCE_NOT_FOUND",
  RELIGION_NOT_FOUND = "RELIGION_NOT_FOUND",
  TERRAIN_NOT_FOUND = "TERRAIN_NOT_FOUND",
  TRADE_GOOD_NOT_FOUND = "TRADE_GOOD_NOT_FOUND",
  TRADE_NODE_NOT_FOUND = "TRADE_NODE_NOT_FOUND",
  WINTER_NOT_FOUND = "WINTER_NOT_FOUND",
  MISSIONS_TREE_NOT_FOUND = "MISSIONS_TREE_NOT_FOUND",
  MISSION_NOT_FOUND = "MISSION_NOT_FOUND",
  LOCALISATION_NOT_FOUND = "LOCALISATION_NOT_FOUND",
  ADVISOR_NOT_FOUND = "ADVISOR_NOT_FOUND",
  BOOKMARK_NOT_FOUND = "BOOKMARK_NOT_FOUND",
  INVALID_PARAMETER = "INVALID_PARAMETER",
  INVALID_FILE = "INVALID_FILE",
}

export enum Eu4Language {
  ENGLISH = "english",
  FRENCH = "french",
  GERMAN = "german",
  SPANISH = "spanish",
}

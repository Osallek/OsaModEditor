import { localisationsComparator } from "utils/localisations.utils";
import { CHANGE_GAME, GameActionType, GameState } from "./game.types";

const initialState: GameState = {
  folderName: "",
  startDate: null,
  endDate: null,
  geoJson: null,
  provinces: {},
  tradeNodes: {},
  countries: {},
  tradeGoods: {},
  areas: {},
  regions: {},
  superRegions: {},
  religions: {},
  cultures: {},
  hreEmperors: {},
  celestialEmperors: {},
  colonialRegions: {},
  tradeCompanies: {},
  winters: {},
  climates: {},
  monsoons: {},
  terrainCategories: {},
  sortedTradeNodes: [],
  sortedCountries: [],
  sortedTradeGoods: [],
  sortedAreas: [],
  sortedRegions: [],
  sortedSuperRegions: [],
  sortedReligions: [],
  sortedCultures: [],
  sortedColonialRegions: [],
  sortedTradeCompanies: [],
  sortedWinters: [],
  sortedClimates: [],
  sortedMonsoons: [],
  sortedTerrainCategories: [],
  defines: {},
};

export const gameReducer = (state: GameState = initialState, action: GameActionType): GameState => {
  switch (action.type) {
    case CHANGE_GAME: {
      return {
        ...state,
        ...action.payload,
        startDate: new Date(action.payload.startDate),
        endDate: new Date(action.payload.endDate),
        sortedTradeNodes: Object.values(action.payload.tradeNodes).sort(localisationsComparator),
        sortedCountries: Object.values(action.payload.countries).sort(localisationsComparator),
        sortedTradeGoods: Object.values(action.payload.tradeGoods).sort(localisationsComparator),
        sortedAreas: Object.values(action.payload.areas).sort(localisationsComparator),
        sortedRegions: Object.values(action.payload.regions).sort(localisationsComparator),
        sortedSuperRegions: Object.values(action.payload.superRegions).sort(localisationsComparator),
        sortedReligions: Object.values(action.payload.religions).sort(localisationsComparator),
        sortedCultures: Object.values(action.payload.cultures).sort(localisationsComparator),
        sortedColonialRegions: Object.values(action.payload.colonialRegions).sort(localisationsComparator),
        sortedTradeCompanies: Object.values(action.payload.tradeCompanies).sort(localisationsComparator),
        sortedWinters: Object.values(action.payload.winters).sort(localisationsComparator),
        sortedClimates: Object.values(action.payload.climates).sort(localisationsComparator),
        sortedTerrainCategories: Object.values(action.payload.terrainCategories).sort(localisationsComparator),
        sortedMonsoons: Object.values(action.payload.monsoons).sort(localisationsComparator),
      };
    }

    default:
      return state;
  }
};

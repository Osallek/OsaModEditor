import { Power } from "types";
import { keyLocalisationsComparator, localisationsComparator, localizedComparator } from "utils/localisations.utils";
import { CHANGE_GAME, GameActionType, GameState } from "./game.types";

const initialState: GameState = {
  folderName: "",
  startDate: null,
  endDate: null,
  geoJson: null,
  graphicalCultures: {},
  provinces: {},
  tradeNodes: {},
  countries: {},
  historicalCouncils: {},
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
  modifiers: {},
  ideaGroups: {},
  technologies: { [Power.ADM]: [], [Power.DIP]: [], [Power.MIL]: [] },
  missionsTrees: {},
  missions: {},
  missionsGfx: {},
  maxMissionsSlots: 0,
  localisations: {},
  advisors: {},
  bookmarks: {},
  buildings: {},
  sortedProvinces: [],
  sortedGraphicalCultures: [],
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
  sortedModifiers: [],
  sortedIdeaGroups: [],
  sortedMissionsTrees: [],
  sortedMissions: [],
  sortedMissionsGfx: [],
  sortedLocalisations: [],
  sortedAdvisors: [],
  sortedBookmarks: [],
  sortedBuildings: [],
  defines: {},
};

export const gameReducer = (state: GameState = initialState, action: GameActionType): GameState => {
  switch (action.type) {
    case CHANGE_GAME: {
      console.log(action.payload);

      return {
        ...state,
        ...action.payload,
        startDate: new Date(action.payload.startDate),
        endDate: new Date(action.payload.endDate),
        sortedProvinces: Object.values(action.payload.provinces).sort(localisationsComparator),
        sortedGraphicalCultures: Object.values(action.payload.graphicalCultures).sort(localisationsComparator),
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
        sortedModifiers: Object.values(action.payload.modifiers).sort((a, b) => localizedComparator(a.id, b.id)),
        sortedIdeaGroups: Object.values(action.payload.ideaGroups).sort(localisationsComparator),
        sortedMissionsTrees: Object.values(action.payload.missionsTrees).sort((a, b) => localizedComparator(a.name, b.name)),
        sortedMissions: Object.values(action.payload.missions).sort(localisationsComparator),
        sortedMissionsGfx: Object.values(action.payload.missionsGfx).sort((a, b) => localizedComparator(a.name, b.name)),
        sortedLocalisations: Object.values(action.payload.localisations).sort(keyLocalisationsComparator),
        sortedAdvisors: Object.values(action.payload.advisors).sort(localisationsComparator),
        sortedBookmarks: Object.values(action.payload.bookmarks).sort((a, b) => {
          let i = a.date.localeCompare(b.date);

          return i !== 0 ? i : localisationsComparator(a, b);
        }),
        sortedBuildings: Object.values(action.payload.buildings).sort(localisationsComparator),
      };
    }

    default:
      return state;
  }
};

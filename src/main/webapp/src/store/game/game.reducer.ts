import { localisationsComparator } from "utils/localisations.utils";
import { CHANGE_GAME, GameActionType, GameState } from "./game.types";

const initialState: GameState = {};

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
      };
    }

    default:
      return state;
  }
};

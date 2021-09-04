import { combineReducers } from "redux";
import { gameReducer } from "store/game";
import { initReducer } from "store/init";

const reducer = combineReducers({
  init: initReducer,
  game: gameReducer,
});

export default reducer;

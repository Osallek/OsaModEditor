import type { GameState } from "store/game/game.types";
import * as gameTypes from "store/game/game.types";
import * as initTypes from "store/init/init.types";
import { InitState } from "store/init/init.types";

const types = { ...initTypes, ...gameTypes };

export type RootState = {
  init: InitState;
  game: GameState;
};

export default types;

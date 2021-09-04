import api from "api";
import { Dispatch } from "react";
import { CHANGE_GAME, GameActionType } from "./game.types";

export const postInit = (installFolder: string, mod: string) => async (dispatch: Dispatch<GameActionType>) => {
  const payload = await api.game.init({ installFolder, mod });

  return dispatch({
    type: CHANGE_GAME,
    payload: payload.data,
  });
};

export const changeDefines = (defines: Record<string, Record<string, string>>) => async (dispatch: Dispatch<GameActionType>) => {
  const payload = await api.game.changeDefines(defines);

  return dispatch({
    type: CHANGE_GAME,
    payload: payload.data,
  });
};

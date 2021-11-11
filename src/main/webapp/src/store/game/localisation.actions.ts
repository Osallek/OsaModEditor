import api from "api";
import { Dispatch } from "react";
import { Localizations } from "types";
import { CHANGE_GAME, GameActionType } from "./game.types";

export const missing = () => async (dispatch: Dispatch<GameActionType>) => {
  const payload = await api.localisation.missing();

  return dispatch({
    type: CHANGE_GAME,
    payload: payload.data,
  });
};

export const edit = (key: string, localisationEdit: Localizations) => async (dispatch: Dispatch<GameActionType>) => {
  const payload = await api.localisation.edit(key, localisationEdit);

  return dispatch({
    type: CHANGE_GAME,
    payload: payload.data,
  });
};

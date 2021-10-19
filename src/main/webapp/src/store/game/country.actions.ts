import api from "api";
import { Dispatch } from "react";
import { CHANGE_GAME, GameActionType } from "./game.types";

export const edit = (tag: string, formData: FormData) => async (dispatch: Dispatch<GameActionType>) => {
  const payload = await api.country.edit(tag, formData);

  return dispatch({
    type: CHANGE_GAME,
    payload: payload.data,
  });
};

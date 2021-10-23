import api from "api";
import { Dispatch } from "react";
import { MissionsTreeEdit } from "../../types";
import { CHANGE_GAME, GameActionType } from "./game.types";

export const edit = (name: string, missionsTreeEdit: MissionsTreeEdit) => async (dispatch: Dispatch<GameActionType>) => {
  const payload = await api.missionsTree.edit(name, missionsTreeEdit);

  return dispatch({
    type: CHANGE_GAME,
    payload: payload.data,
  });
};

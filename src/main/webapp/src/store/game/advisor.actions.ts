import api from "api";
import { Dispatch } from "react";
import { AdvisorEdit } from "types";
import { CHANGE_GAME, GameActionType } from "./game.types";

export const edit = (name: string, advisorEdit: AdvisorEdit) => async (dispatch: Dispatch<GameActionType>) => {
  const payload = await api.advisor.edit(name, advisorEdit);

  return dispatch({
    type: CHANGE_GAME,
    payload: payload.data,
  });
};

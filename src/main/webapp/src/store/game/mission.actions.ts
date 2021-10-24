import api from "api";
import { Dispatch } from "react";
import { MissionEdit } from "types";
import { CHANGE_GAME, GameActionType } from "./game.types";

export const edit = (name: string, missionEdit: MissionEdit) => async (dispatch: Dispatch<GameActionType>) => {
  const payload = await api.mission.edit(name, missionEdit);

  return dispatch({
    type: CHANGE_GAME,
    payload: payload.data,
  });
};

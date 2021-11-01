import api from "api";
import { Dispatch } from "react";
import { CHANGE_GAME, GameActionType } from "./game.types";

export const missing = () => async (dispatch: Dispatch<GameActionType>) => {
    const payload = await api.localisation.missing();

    return dispatch({
        type: CHANGE_GAME,
        payload: payload.data,
    });
};

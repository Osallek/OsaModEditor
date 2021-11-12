import api from "api";
import { Dispatch } from "react";
import { GET_INIT, InitActionType } from "./init.types";

export const getInit = () => async (dispatch: Dispatch<InitActionType>) => {
  const payload = await api.init.get();

  return dispatch({
    type: GET_INIT,
    payload: payload.data,
  });
};

export const copy = (mod: string) => async (dispatch: Dispatch<InitActionType>) => {
  const payload = await api.init.copy(mod);

  return dispatch({
    type: GET_INIT,
    payload: payload.data,
  });
};

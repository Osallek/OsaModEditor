import api from "api";
import { Dispatch } from "react";
import { Country, Culture, Religion, TradeGood } from "types";
import { dateToLocalDate } from "utils/date.utils";
import { CHANGE_GAME, GameActionType } from "./game.types";

export const changeOwner = (provinces: Array<number>, date: Date | null, target: Country) => async (dispatch: Dispatch<GameActionType>) => {
  const payload = await api.province.changeOwner({ provinces, date: dateToLocalDate(date), target: target.tag });

  return dispatch({
    type: CHANGE_GAME,
    payload: payload.data,
  });
};

export const changeController = (provinces: Array<number>, date: Date | null, target: Country) => async (dispatch: Dispatch<GameActionType>) => {
  const payload = await api.province.changeController({ provinces, date: dateToLocalDate(date), target: target.tag });

  return dispatch({
    type: CHANGE_GAME,
    payload: payload.data,
  });
};

export const changeOwnerAndController = (provinces: Array<number>, date: Date | null, target: Country) => async (dispatch: Dispatch<GameActionType>) => {
  const payload = await api.province.changeOwnerAndController({ provinces, date: dateToLocalDate(date), target: target.tag });

  return dispatch({
    type: CHANGE_GAME,
    payload: payload.data,
  });
};

export const changeOwnerAndControllerAndCore = (provinces: Array<number>, date: Date | null, target: Country) => async (dispatch: Dispatch<GameActionType>) => {
  const payload = await api.province.changeOwnerAndControllerAndCore({ provinces, date: dateToLocalDate(date), target: target.tag });

  return dispatch({
    type: CHANGE_GAME,
    payload: payload.data,
  });
};

export const addToHre = (provinces: Array<number>, date: Date | null) => async (dispatch: Dispatch<GameActionType>) => {
  const payload = await api.province.addToHre({ provinces, date: dateToLocalDate(date) });

  return dispatch({
    type: CHANGE_GAME,
    payload: payload.data,
  });
};

export const removeFromHre = (provinces: Array<number>, date: Date | null) => async (dispatch: Dispatch<GameActionType>) => {
  const payload = await api.province.removeFromHre({ provinces, date: dateToLocalDate(date) });

  return dispatch({
    type: CHANGE_GAME,
    payload: payload.data,
  });
};

export const changeTradeGood = (provinces: Array<number>, date: Date | null, target: TradeGood) => async (dispatch: Dispatch<GameActionType>) => {
  const payload = await api.province.changeTradeGood({ provinces, date: dateToLocalDate(date), target: target.name });

  return dispatch({
    type: CHANGE_GAME,
    payload: payload.data,
  });
};

export const changeReligion = (provinces: Array<number>, date: Date | null, target: Religion) => async (dispatch: Dispatch<GameActionType>) => {
  const payload = await api.province.changeReligion({ provinces, date: dateToLocalDate(date), target: target.name });

  return dispatch({
    type: CHANGE_GAME,
    payload: payload.data,
  });
};

export const changeCulture = (provinces: Array<number>, date: Date | null, target: Culture) => async (dispatch: Dispatch<GameActionType>) => {
  const payload = await api.province.changeCulture({ provinces, date: dateToLocalDate(date), target: target.name });

  return dispatch({
    type: CHANGE_GAME,
    payload: payload.data,
  });
};

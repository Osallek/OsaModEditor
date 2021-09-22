import api from "api";
import { Dispatch } from "react";
import { Area, ColonialRegion, Country, Culture, Religion, TradeCompany, TradeGood, TradeNode } from "types";
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

export const decolonize = (provinces: Array<number>, date: Date | null) => async (dispatch: Dispatch<GameActionType>) => {
  const payload = await api.province.decolonize({ provinces, date: dateToLocalDate(date) });

  return dispatch({
    type: CHANGE_GAME,
    payload: payload.data,
  });
};

export const changeTradeNode = (provinces: Array<number>, target: TradeNode) => async (dispatch: Dispatch<GameActionType>) => {
  const payload = await api.province.changeTradeNode({ provinces, target: target.name });

  return dispatch({
    type: CHANGE_GAME,
    payload: payload.data,
  });
};

export const changeArea = (provinces: Array<number>, target: Area) => async (dispatch: Dispatch<GameActionType>) => {
  const payload = await api.province.changeArea({ provinces, target: target.name });

  return dispatch({
    type: CHANGE_GAME,
    payload: payload.data,
  });
};

export const changeColonialRegion = (provinces: Array<number>, target: ColonialRegion) => async (dispatch: Dispatch<GameActionType>) => {
  const payload = await api.province.changeColonialRegion({ provinces, target: target.name });

  return dispatch({
    type: CHANGE_GAME,
    payload: payload.data,
  });
};

export const removeColonialRegion = (provinces: Array<number>) => async (dispatch: Dispatch<GameActionType>) => {
  const payload = await api.province.removeColonialRegion({ provinces });

  return dispatch({
    type: CHANGE_GAME,
    payload: payload.data,
  });
};

export const changeTradeCompany = (provinces: Array<number>, target: TradeCompany) => async (dispatch: Dispatch<GameActionType>) => {
  const payload = await api.province.changeTradeCompany({ provinces, target: target.name });

  return dispatch({
    type: CHANGE_GAME,
    payload: payload.data,
  });
};

export const removeTradeCompany = (provinces: Array<number>) => async (dispatch: Dispatch<GameActionType>) => {
  const payload = await api.province.removeTradeCompany({ provinces });

  return dispatch({
    type: CHANGE_GAME,
    payload: payload.data,
  });
};

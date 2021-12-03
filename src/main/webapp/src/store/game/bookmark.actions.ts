import api from "api";
import { Dispatch } from "react";
import { BookmarkEdit } from "types";
import { CHANGE_GAME, GameActionType } from "./game.types";

export const edit = (name: string, bookmarkEdit: BookmarkEdit) => async (dispatch: Dispatch<GameActionType>) => {
  const payload = await api.bookmark.edit(name, bookmarkEdit);

  return dispatch({
    type: CHANGE_GAME,
    payload: payload.data,
  });
};

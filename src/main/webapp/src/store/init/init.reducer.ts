import { GET_INIT, InitActionType, InitState } from "./init.types";

const initialState: InitState = {
  mods: [],
};

export const initReducer = (state: InitState = initialState, action: InitActionType): InitState => {
  switch (action.type) {
    case GET_INIT: {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return state;
  }
};

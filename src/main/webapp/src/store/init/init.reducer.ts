import { GET_INIT, InitActionType, InitState } from "./init.types";

const initialState: InitState = {
  installFolder: "",
};

export const initReducer = (state: InitState = initialState, action: InitActionType): InitState => {
  switch (action.type) {
    case GET_INIT: {
      return {
        ...state,
        installFolder: action.payload.installFolder,
        mods: action.payload.mods,
      };
    }

    default:
      return state;
  }
};

import { GameInit, IdName } from "types/api.types";

export const GET_INIT: "init/getInit" = "init/getInit";

interface GetInitAction {
  type: typeof GET_INIT;
  payload: GameInit;
}

export interface InitState {
  installFolder?: string;
  mods?: Array<IdName<string, string>>;
}

export type InitActionType = GetInitAction;

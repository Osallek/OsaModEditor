import { GameInit, Mod } from "types/api.types";

export const GET_INIT: "init/getInit" = "init/getInit";

interface GetInitAction {
  type: typeof GET_INIT;
  payload: GameInit;
}

export interface InitState {
  installFolder?: string;
  mods: Array<Mod>;
  progress?: number;
  version?: string;
}

export type InitActionType = GetInitAction;

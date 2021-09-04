import endpoints from "api/endpoints";
import axios, { AxiosPromise } from "axios";
import * as ENV from "env/env";
import { Game, GameForm, GameInit, MapActionForm } from "../types";

const ws = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: 60000,
  maxRedirects: 0,
});

const api = {
  init: {
    get: (): AxiosPromise<GameInit> => ws.get(endpoints.game.init),
  },
  game: {
    init: (form: GameForm): AxiosPromise<Game> => {
      return ws.post(endpoints.game.init, form);
    },
    changeDefines: (form: Record<string, Record<string, string>>): AxiosPromise<Game> => {
      return ws.post(endpoints.game.changeDefines, form);
    },
  },
  province: {
    changeOwner: (form: MapActionForm): AxiosPromise<Game> => {
      return ws.post(endpoints.province.changeOwner, form);
    },
    changeController: (form: MapActionForm): AxiosPromise<Game> => {
      return ws.post(endpoints.province.changeController, form);
    },
    changeOwnerAndController: (form: MapActionForm): AxiosPromise<Game> => {
      return ws.post(endpoints.province.changeOwnerAndController, form);
    },
    changeOwnerAndControllerAndCore: (form: MapActionForm): AxiosPromise<Game> => {
      return ws.post(endpoints.province.changeOwnerAndControllerAndCore, form);
    },
    addToHre: (form: MapActionForm): AxiosPromise<Game> => {
      return ws.post(endpoints.province.addToHre, form);
    },
    removeFromHre: (form: MapActionForm): AxiosPromise<Game> => {
      return ws.post(endpoints.province.removeFromHre, form);
    },
    changeTradeGood: (form: MapActionForm): AxiosPromise<Game> => {
      return ws.post(endpoints.province.changeTradeGood, form);
    },
    changeReligion: (form: MapActionForm): AxiosPromise<Game> => {
      return ws.post(endpoints.province.changeReligion, form);
    },
    changeCulture: (form: MapActionForm): AxiosPromise<Game> => {
      return ws.post(endpoints.province.changeCulture, form);
    },
  },
};

export default api;

import * as country from "store/game/country.actions";
import * as game from "store/game/game.actions";
import * as province from "store/game/province.actions";
import * as missionsTree from "store/game/missionstree.actions";
import * as mission from "store/game/mission.actions";
import * as localisation from "store/game/localisation.actions";
import * as init from "store/init/init.actions";

const actions = {
  init,
  game,
  province,
  country,
  missionsTree,
  mission,
  localisation,
};

export default actions;

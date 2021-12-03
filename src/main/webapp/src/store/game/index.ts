import * as game from "./game.actions";
import * as province from "./province.actions";
import * as country from "./country.actions";
import * as localisation from "./localisation.actions";
import * as mission from "./mission.actions";
import * as missionTree from "./missionstree.actions";
import * as bookmark from "./bookmark.actions";
import * as advisor from "./advisor.actions";

export * from "./game.reducer";

export const actions = {
  game,
  province,
  country,
  localisation,
  mission,
  missionTree,
  bookmark,
  advisor,
};

import advisor from "./advisor.i18n";
import api from "./api.i18n";
import country from "./country.i18n";
import global from "./global.i18n";
import home from "./home.i18n";
import localisation from "./localisation.i18n";
import map from "./map.i18n";
import mission from "./mission.i18n";
import missionsTree from "./missionsTree.i18n";
import routes from "./routes.i18n";

const fr: Record<string, string> = {
  ...global,
  ...routes,
  ...home,
  ...map,
  ...api,
  ...country,
  ...missionsTree,
  ...mission,
  ...localisation,
  ...advisor,
};

export default fr;

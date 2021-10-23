import api from "./api.i18n";
import country from "./country.i18n";
import global from "./global.i18n";
import home from "./home.i18n";
import map from "./map.i18n";
import routes from "./routes.i18n";
import missionsTree from "./missionsTree.i18n";

const fr: Record<string, string> = {
  ...global,
  ...routes,
  ...home,
  ...map,
  ...api,
  ...country,
  ...missionsTree,
};

export default fr;

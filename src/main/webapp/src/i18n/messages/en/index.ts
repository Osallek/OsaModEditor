import api from "./api.i18n";
import global from "./global.i18n";
import home from "./home.i18n";
import map from "./map.i18n";
import routes from "./routes.i18n";

const en: Record<string, string> = {
  ...global,
  ...routes,
  ...home,
  ...map,
  ...api,
};

export default en;

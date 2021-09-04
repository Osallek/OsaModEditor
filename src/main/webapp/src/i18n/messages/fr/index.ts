import global from "./global.i18n";
import home from "./home.i18n";
import map from "./map.i18n";
import routes from "./routes.i18n";

const fr: Record<string, string> = {
  ...global,
  ...routes,
  ...home,
  ...map,
};

export default fr;

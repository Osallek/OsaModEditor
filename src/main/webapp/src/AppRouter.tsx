import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Bookmarks, BookmarkForm } from "screens/Bookmarks";
import { Defines } from "screens/Defines";
import { Home } from "screens/Home";
import { Map } from "screens/Map";
import { Menu } from "screens/Menu";
import { RootState } from "store/types";
import { AdvisorForm, Advisors } from "./screens/Advisors";
import { Countries, CountryForm } from "./screens/Country";
import { LocalisationForm, Localisations } from "./screens/Localisations";
import { MissionForm, Missions, MissionsTreeForm, MissionsTrees } from "./screens/Mission";
import Websocket from "utils/websocket.utils";

const AppRouter: React.FC = () => {
  const intl = useIntl();

  const state = useSelector((state: RootState) => {
    return state || {};
  });

  useEffect(() => {
    Websocket.connect();
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "flex", backgroundColor: "#f3f3f3" }}>
      <Container maxWidth={false} style={{ padding: 24 }}>
        <BrowserRouter basename="/editor">
          <Switch>
            {state.game.folderName && <Route path={intl.formatMessage({ id: "routes.menu" })} exact component={Menu} />}
            {state.game.folderName && <Route path={intl.formatMessage({ id: "routes.map" })} exact component={Map} />}
            {state.game.folderName && <Route path={intl.formatMessage({ id: "routes.defines" })} exact component={Defines} />}
            {state.game.folderName && <Route path={intl.formatMessage({ id: "routes.countries" })} exact component={Countries} />}
            {state.game.folderName && <Route path={intl.formatMessage({ id: "routes.country" }) + "/:tag"} exact component={CountryForm} />}
            {state.game.folderName && <Route path={intl.formatMessage({ id: "routes.missionsTrees" })} exact component={MissionsTrees} />}
            {state.game.folderName && <Route path={intl.formatMessage({ id: "routes.missionsTree" }) + "/:name"} exact component={MissionsTreeForm} />}
            {state.game.folderName && <Route path={intl.formatMessage({ id: "routes.missions" })} exact component={Missions} />}
            {state.game.folderName && <Route path={intl.formatMessage({ id: "routes.mission" }) + "/:name"} exact component={MissionForm} />}
            {state.game.folderName && <Route path={intl.formatMessage({ id: "routes.localisations" })} exact component={Localisations} />}
            {state.game.folderName && <Route path={intl.formatMessage({ id: "routes.localisation" }) + "/:name"} exact component={LocalisationForm} />}
            {state.game.folderName && <Route path={intl.formatMessage({ id: "routes.advisors" })} exact component={Advisors} />}
            {state.game.folderName && <Route path={intl.formatMessage({ id: "routes.advisor" }) + "/:name"} exact component={AdvisorForm} />}
            {state.game.folderName && <Route path={intl.formatMessage({ id: "routes.bookmarks" })} exact component={Bookmarks} />}
            {state.game.folderName && <Route path={intl.formatMessage({ id: "routes.bookmark" }) + "/:name"} exact component={BookmarkForm} />}
            <Route path="/" component={state.game.folderName ? Menu : Home} />
          </Switch>
        </BrowserRouter>
      </Container>
    </div>
  );
};

export default AppRouter;

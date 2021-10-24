import { Container } from "@mui/material";
import React from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Defines from "screens/Defines";
import Home from "screens/Home";
import Map from "screens/Map";
import Menu from "screens/Menu";
import { RootState } from "store/types";
import { Countries, CountryForm } from "./screens/Country";
import { MissionForm, Missions, MissionsTreeForm, MissionsTrees } from "./screens/Mission";

const AppRouter: React.FC = () => {
  const intl = useIntl();

  const state = useSelector((state: RootState) => {
    return state || {};
  });

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
            <Route path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </Container>
    </div>
  );
};

export default AppRouter;

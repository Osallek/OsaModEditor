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
import Countries from "./screens/Countries";

const AppRouter: React.FC = () => {
  const intl = useIntl();

  const state = useSelector((state: RootState) => {
    return state || {};
  });

  return (
    <div style={{ minHeight: "100vh", display: "flex" }}>
      <Container maxWidth={false} style={{ paddingBottom: 24 }}>
        <BrowserRouter basename="/editor">
          <Switch>
            {state.game.startDate && <Route path={intl.formatMessage({ id: "routes.menu" })} exact component={Menu} />}
            {state.game.startDate && <Route path={intl.formatMessage({ id: "routes.map" })} exact component={Map} />}
            {state.game.startDate && <Route path={intl.formatMessage({ id: "routes.defines" })} exact component={Defines} />}
            {state.game.startDate && <Route path={intl.formatMessage({ id: "routes.countries" })} exact component={Countries} />}
            <Route path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </Container>
    </div>
  );
};

export default AppRouter;

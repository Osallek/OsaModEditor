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
import CountryForm from "./screens/Countries/CountryForm";

const AppRouter: React.FC = () => {
  const intl = useIntl();

  const state = useSelector((state: RootState) => {
    return state || {};
  });

  return (
    <div style={{ minHeight: "100vh", display: "flex" }}>
      <Container maxWidth={false} style={{ padding: 24 }}>
        <BrowserRouter basename="/editor">
          <Switch>
            {state.game.folderName && <Route path={intl.formatMessage({ id: "routes.menu" })} exact component={Menu} />}
            {state.game.folderName && <Route path={intl.formatMessage({ id: "routes.map" })} exact component={Map} />}
            {state.game.folderName && <Route path={intl.formatMessage({ id: "routes.defines" })} exact component={Defines} />}
            {state.game.folderName && <Route path={intl.formatMessage({ id: "routes.countries" })} exact component={Countries} />}
            {state.game.folderName && <Route path={intl.formatMessage({ id: "routes.country" }) + "/:tag"} exact component={CountryForm} />}
            <Route path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </Container>
    </div>
  );
};

export default AppRouter;

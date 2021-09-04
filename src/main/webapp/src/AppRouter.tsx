import { Container } from "@material-ui/core";
import CountriesMap from "components/map";
import React from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Defines from "screens/Defines";
import Home from "screens/Home";
import Menu from "screens/Menu";
import { RootState } from "store/types";

const AppRouter: React.FC = () => {
  const intl = useIntl();

  const state = useSelector((state: RootState) => {
    return state || {};
  });

  return (
    <div style={{ minHeight: "100vh", display: "flex" }}>
      <Container maxWidth={false}>
        <BrowserRouter basename="/editor">
          <Switch>
            {<Route path={intl.formatMessage({ id: "routes.menu" })} exact component={Menu} />}
            {<Route path={intl.formatMessage({ id: "routes.map" })} exact component={CountriesMap} />}
            {<Route path={intl.formatMessage({ id: "routes.defines" })} exact component={Defines} />}
            <Route path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </Container>
    </div>
  );
};

export default AppRouter;

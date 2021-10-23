import { Grid } from "@mui/material";
import { BackTitle } from "components/global";
import { MissionsList } from "components/mission";
import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "store/types";

const Missions: React.FC<void> = () => {
  const intl = useIntl();
  const history = useHistory();

  useEffect(() => {
    document.title = intl.formatMessage({ id: "global.name" }) + " - " + intl.formatMessage({ id: "global.missions" });
  }, [intl]);

  const { sortedMissions, folderName } = useSelector((state: RootState) => {
    return state.game || {};
  });

  return (
    <Grid container spacing={2} style={{ height: "100%" }}>
      <Grid item>
        <BackTitle handleClick={(event) => history.push(intl.formatMessage({ id: "routes.menu" }))} />
      </Grid>
      <Grid item xs />
      <Grid item xs={10} md={8} lg={8} xl={6} style={{ height: "100%" }}>
        <MissionsList missions={sortedMissions} folderName={folderName} />
      </Grid>
      <Grid item xs />
    </Grid>
  );
};

export default Missions;

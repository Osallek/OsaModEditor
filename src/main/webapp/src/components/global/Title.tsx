import { Grid } from "@mui/material";
import React from "react";
import { useIntl } from "react-intl";

const Title = () => {
  const intl = useIntl();

  return (
    <Grid container justifyContent="center" style={{ minHeight: 90, maxHeight: "calc(100% - 4 00px)", height: "30%" }}>
      <h1>{intl.formatMessage({ id: "home.welcome" })}</h1>
    </Grid>
  );
};

export default Title;

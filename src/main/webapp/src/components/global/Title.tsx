import { Grid } from "@mui/material";
import React from "react";
import { useIntl } from "react-intl";

const Title = () => {
  const intl = useIntl();

  return (
    <Grid container justifyContent="center">
      <h1>{intl.formatMessage({ id: "home.welcome" })}</h1>
    </Grid>
  );
};

export default Title;

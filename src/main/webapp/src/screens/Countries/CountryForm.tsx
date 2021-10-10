import { Card, CardContent, CardHeader, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select/SelectInput";
import { BackTitle } from "components/global";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { RootState } from "store/types";
import { KeyLocalizations, ServerErrors } from "types";
import { localize } from "utils/localisations.utils";
import { snackbarError } from "utils/snackbar.utils";
import Button from "../../components/controls";

interface CountryFormParams {
  tag: string;
}

const CountryForm: React.FC<void> = () => {
  const intl = useIntl();
  const history = useHistory();
  const { tag } = useParams<CountryFormParams>();
  const { enqueueSnackbar } = useSnackbar();

  const { folderName, countries, graphicalCultures, sortedGraphicalCultures, historicalCouncils } = useSelector((state: RootState) => {
    return state.game || {};
  });

  const country = countries[tag];

  if (!tag || !country) {
    snackbarError(ServerErrors.COUNTRY_NOT_FOUND, enqueueSnackbar, intl);
  }

  const [graphicalCulture, setGraphicalCulture] = useState<KeyLocalizations | null>(graphicalCultures[country?.graphicalCulture] ?? null);
  const [historicalCouncil, setHistoricalCouncil] = useState<KeyLocalizations | null>(historicalCouncils[country?.historicalCouncil] ?? null);
  const [historicalScore, setHistoricalScore] = useState<number | null>(country.historicalScore);

  const [modified, setModified] = useState<boolean>(false);

  useEffect(() => {
    if (country) {
      document.title = intl.formatMessage({ id: "global.name" }) + " - " + localize(country);
    }
  }, [intl, country]);

  //getImageUrl(folderName, country.flagFile)

  return country ? (
    <Grid container spacing={2}>
      <Grid item>
        <BackTitle handleClick={(event) => history.push(intl.formatMessage({ id: "routes.countries" }))} />
      </Grid>
      <Grid item xs />
      <Grid item xs={10} md={8} lg={8} xl={6} style={{ height: "100%" }}>
        <Card style={{ backgroundColor: "lightgray" }}>
          <CardHeader
            title={localize(country)}
            titleTypographyProps={{ variant: "h4" }}
            action={
              <Button
                variant="contained"
                color="primary"
                size="large"
                // onClick={handleSubmit}
                disabled={!modified}
                messageKey="global.validate"
                // loading={loading}
              />
            }
          />
          <CardContent>
            <FormControl style={{ margin: 8, width: "calc(100% - 16px)" }}>
              <InputLabel id="graphicalCulture-label">{intl.formatMessage({ id: "country.graphicalCulture" })}</InputLabel>
              <Select
                labelId="graphicalCulture-label"
                label={intl.formatMessage({ id: "country.graphicalCulture" })}
                value={graphicalCulture?.name}
                onChange={(event: SelectChangeEvent) => {
                  if (graphicalCultures[event.target.value as string] !== graphicalCulture) {
                    setGraphicalCulture(graphicalCultures[event.target.value as string]);
                    setModified(true);
                  }
                }}
              >
                {sortedGraphicalCultures &&
                  Object.entries(sortedGraphicalCultures).map(([name, gc]) => (
                    <MenuItem value={gc.name} key={gc.name}>
                      {localize(gc)}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl style={{ margin: 8, width: "calc(100% - 16px)" }}>
              <InputLabel id="historicalCouncil-label">{intl.formatMessage({ id: "country.historicalCouncil" })}</InputLabel>
              <Select
                labelId="historicalCouncil-label"
                label={intl.formatMessage({ id: "country.historicalCouncil" })}
                value={historicalCouncil?.name}
                onChange={(event: SelectChangeEvent) => {
                  if (historicalCouncils[event.target.value as string] !== historicalCouncil) {
                    setHistoricalCouncil(historicalCouncils[event.target.value as string]);
                    setModified(true);
                  }
                }}
              >
                {historicalCouncils &&
                  Object.entries(historicalCouncils).map(([name, hc]) => (
                    <MenuItem value={hc.name} key={hc.name}>
                      {localize(hc)}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <TextField
              id="historical-score-input"
              label={intl.formatMessage({ id: "country.historicalScore" })}
              type="number"
              style={{ margin: 8, width: "calc(100% - 16px)" }}
              value={historicalScore}
              onChange={(event) => {
                if (parseInt(event.target.value) !== historicalScore) {
                  setHistoricalScore(parseInt(event.target.value));
                  setModified(true);
                }
              }}
            />
          </CardContent>
          {/*<Grid item width="100%">
          <Timeline position="left">
            {country.history.map((item, index) => (
              <>
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot color="primary">
                      <IconButton size="small" style={{ padding: 0 }}>
                        <Event style={{ color: "white" }} />
                      </IconButton>
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ m: "auto 0" }}>
                    {item.date ? stringToLocalDate(item.date) : intl.formatMessage({ id: "global.start" })}
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem key={index + "add"}>
                  <TimelineSeparator>
                    <TimelineDot color="primary">
                      <IconButton size="small" style={{ padding: 0 }}>
                        <Add style={{ color: "white" }} />
                      </IconButton>
                    </TimelineDot>
                    {index < country.history.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent />
                </TimelineItem>
              </>
            ))}
          </Timeline>
        </Grid>*/}
        </Card>
      </Grid>
      <Grid item xs />
    </Grid>
  ) : (
    <Grid style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Grid container>
        <Grid item alignSelf="center">
          <BackTitle handleClick={(event) => history.push(intl.formatMessage({ id: "routes.countries" }))} />
        </Grid>
        <Grid item xs />
      </Grid>
    </Grid>
  );
};

export default CountryForm;

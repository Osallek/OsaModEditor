import { Add, Edit, Event } from "@mui/icons-material";
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from "@mui/lab";
import {
    Card,
    CardHeader,
    CardMedia,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput
} from "@mui/material";
import { BackTitle } from "components/global";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { RootState } from "store/types";
import { Country } from "types";
import { stringToLocalDate } from "utils/date.utils";
import { getImageUrl } from "utils/global.utils";
import { localize } from "utils/localisations.utils";

interface Props {
  country: Country;
}

interface CountryFormParams {
  tag: string;
}

const CountryForm: React.FC<Props> = () => {
  const intl = useIntl();
  const history = useHistory();
  const { tag } = useParams<CountryFormParams>();

  const { folderName, countries } = useSelector((state: RootState) => {
    return state.game || {};
  });

  const country = countries[tag];
  const [graphicalCulture, setGraphicalCulture] = useState<string>(country.graphicalCulture);
  const [historicalCouncil, setHistoricalCouncil] = useState<string>(country.historicalCouncil ?? "");

  useEffect(() => {
    document.title = intl.formatMessage({ id: "global.name" }) + " - " + localize(country);
  }, [intl, country]);

  return (
    <Grid style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Grid container>
        <Grid item alignSelf="center">
          <BackTitle handleClick={(event) => history.push(intl.formatMessage({ id: "routes.countries" }))} />
        </Grid>
        <Grid item>
          <h1>{localize(country)}</h1>
        </Grid>
      </Grid>
      <Grid container alignItems="center" flexGrow={1} spacing={4} flexDirection="column">
        {folderName && (
          <Grid item>
            <Card raised>
              <CardHeader
                title="Flag"
                action={
                  <IconButton>
                    <Edit style={{ color: "black" }} />
                  </IconButton>
                }
              />
              <CardMedia component="img" image={getImageUrl(folderName, country.flagFile)} />
            </Card>
          </Grid>
        )}
        <Grid item>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="graphicalCulture">graphicalCulture</InputLabel>
            <OutlinedInput
              id="graphicalCulture"
              value={graphicalCulture}
              onChange={(event) => setGraphicalCulture(event.target.value)}
              startAdornment={<InputAdornment position="start" style={{ display: "none" }} />}
              label="graphicalCulture"
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="historicalCouncil">historicalCouncil</InputLabel>
            <OutlinedInput
              id="historicalCouncil"
              value={historicalCouncil}
              onChange={(event) => setHistoricalCouncil(event.target.value)}
              startAdornment={<InputAdornment position="start" style={{ display: "none" }} />}
              label="historicalCouncil"
            />
          </FormControl>
        </Grid>
        <Grid item width="100%">
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
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CountryForm;

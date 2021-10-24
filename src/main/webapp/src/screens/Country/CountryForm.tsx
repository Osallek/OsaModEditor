import { Upload } from "@mui/icons-material";
import { Box, Button, Card, CardContent, CardHeader, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select/SelectInput";
import api from "api";
import { ChipInput, ColorField, IdeasDialog, LoadButton, MonarchNameTable } from "components/controls";
import { BackTitle } from "components/global";
import { useEventSnackbar } from "hooks/snackbar.hooks";
import { useSnackbar } from "notistack";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { RootState } from "store/types";
import { KeyLocalizations, Pair, ServerErrors, ServerSuccesses } from "types";
import { getImageUrl } from "utils/global.utils";
import { localize } from "utils/localisations.utils";
import { snackbarError } from "utils/snackbar.utils";
import actions from "store/actions";

interface CountryFormParams {
  tag: string;
}

const CountryForm: React.FC<void> = () => {
  const intl = useIntl();
  const history = useHistory();
  const dispatch = useDispatch();
  const { tag } = useParams<CountryFormParams>();
  const { enqueueSnackbar } = useSnackbar();

  const { folderName, countries, graphicalCultures, sortedGraphicalCultures, historicalCouncils } = useSelector((state: RootState) => {
    return state.game || {};
  });

  const country = countries[tag];

  if (!tag || !country) {
    snackbarError(ServerErrors.COUNTRY_NOT_FOUND, enqueueSnackbar, intl);
  }

  const [flagFile, setFlagFile] = useState<string | null>(folderName && getImageUrl(folderName, country.flagFile));
  const [graphicalCulture, setGraphicalCulture] = useState<KeyLocalizations | null>(graphicalCultures[country?.graphicalCulture] ?? null);
  const [historicalCouncil, setHistoricalCouncil] = useState<KeyLocalizations | null>(historicalCouncils[country?.historicalCouncil] ?? null);
  const [historicalScore, setHistoricalScore] = useState<number | null>(country.historicalScore);
  const [color, setColor] = useState<string>(country.color.hex);
  const [historicalIdeaGroups, setHistoricalIdeaGroups] = useState<Array<string>>(country.historicalIdeaGroups);
  const [monarchNames, setMonarchNames] = useState<Array<Pair<string, number>>>(country.monarchNames);
  const [armyNames, setArmyNames] = useState<Array<string>>(country.armyNames ?? []);
  const [fleetNames, setFleetNames] = useState<Array<string>>(country.fleetNames ?? []);
  const [shipNames, setShipNames] = useState<Array<string>>(country.shipNames ?? []);
  const [leaderNames, setLeaderNames] = useState<Array<string>>(country.leaderNames ?? []);
  const [newFlagFile, setNewFlagFile] = useState<File | null>(null);
  const [modified, setModified] = useState<boolean>(false);

  const [, submitFlag] = useEventSnackbar(async (formData: FormData) => {
    if (folderName) {
      const payload = await api.country.flag(country.tag, formData);
      const { file } = payload.data;

      setFlagFile(getImageUrl(folderName, file));
    }
  });

  const [loading, submitEdit] = useEventSnackbar(async (formData: FormData) => {
    await dispatch(actions.country.edit(country.tag, formData));
  }, `api.success.${ServerSuccesses.DEFAULT_SUCCESS}`);

  useEffect(() => {
    if (country) {
      document.title = intl.formatMessage({ id: "global.name" }) + " - " + localize(country);
    }
  }, [intl, country]);

  const handleUploadFlag = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event != null && event.target && event.target.files && event.target.files.length > 0) {
      setNewFlagFile(event.target.files[0]);

      if (event.target.files[0]) {
        const formData = new FormData();
        formData.append("file", event.target.files[0]);

        await submitFlag(formData);
        setModified(true);
      }
    }
  };

  const handleSubmit = async () => {
    if (!loading) {
      const formData = new FormData();

      if (newFlagFile) {
        formData.append("flag", newFlagFile);
      }

      const body = new Blob(
        [
          JSON.stringify({
            graphicalCulture: graphicalCulture?.name,
            historicalCouncil: historicalCouncil?.name,
            historicalScore,
            color,
            historicalIdeaGroups,
            monarchNames,
            armyNames,
            fleetNames,
            shipNames,
            leaderNames,
          }),
        ],
        {
          type: "application/json",
        }
      );

      formData.append("body", body);

      await submitEdit(formData);
    }
  };

  return country ? (
    <Grid container spacing={2}>
      <Grid item>
        <BackTitle handleClick={(event) => history.push(intl.formatMessage({ id: "routes.countries" }))} />
      </Grid>
      <Grid item xs />
      <Grid item xs={12} md={10} xl={8} style={{ height: "100%" }}>
        <Card>
          <CardHeader
            title={localize(country)}
            titleTypographyProps={{ variant: "h4" }}
            action={
              <LoadButton
                key={"button" + country.tag}
                variant="contained"
                color="primary"
                size="large"
                onClick={handleSubmit}
                disabled={!modified}
                messageKey="global.validate"
                loading={loading}
              />
            }
          />
          <CardContent>
            {flagFile && (
              <Grid
                container
                spacing={2}
                style={{
                  marginBottom: 8,
                  marginTop: 8,
                  marginLeft: 0,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box component="img" src={`${flagFile}?${Date.now()}`} style={{ maxHeight: 128 }} />
                <Grid item style={{ paddingTop: 0 }}>
                  <input accept=".tga" id="flag-upload" type="file" style={{ display: "none" }} onChange={handleUploadFlag} />
                  <label htmlFor="flag-upload">
                    <Button variant="contained" endIcon={<Upload />} component="span">
                      {intl.formatMessage({ id: "country.changeFlag" })}
                    </Button>
                  </label>
                </Grid>
              </Grid>
            )}
            <FormControl style={{ marginBottom: 8, marginTop: 8, width: "100%" }}>
              <InputLabel id="graphicalCulture-label">{intl.formatMessage({ id: "country.graphicalCulture" })}</InputLabel>
              <Select
                labelId="graphicalCulture-label"
                label={intl.formatMessage({ id: "country.graphicalCulture" })}
                value={graphicalCulture?.name ?? ""}
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
            <FormControl style={{ marginBottom: 8, marginTop: 8, width: "100%" }}>
              <InputLabel id="historicalCouncil-label">{intl.formatMessage({ id: "country.historicalCouncil" })}</InputLabel>
              <Select
                labelId="historicalCouncil-label"
                label={intl.formatMessage({ id: "country.historicalCouncil" })}
                value={historicalCouncil?.name ?? ""}
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
              style={{ marginBottom: 8, marginTop: 8, width: "100%" }}
              value={historicalScore}
              InputProps={{ inputProps: { min: 0 } }}
              onChange={(event) => {
                const num = parseInt(event.target.value);
                if (num !== historicalScore && num >= 0) {
                  setHistoricalScore(num);
                  setModified(true);
                }
              }}
            />
            <ColorField
              id="color-input"
              label={intl.formatMessage({ id: "country.color" })}
              style={{ marginBottom: 8, marginTop: 8, width: "100%" }}
              value={color}
              onChange={(newColor: string) => {
                setColor(newColor);
                setModified(true);
              }}
            />
            <FormControl style={{ marginBottom: 8, marginTop: 8, width: "100%" }}>
              <IdeasDialog
                buttonKey="country.historicalIdeaGroups"
                title="country.historicalIdeaGroups"
                free={false}
                initialValue={historicalIdeaGroups}
                onValidate={(ideas) => setHistoricalIdeaGroups(ideas)}
              />
            </FormControl>
            <FormControl style={{ marginBottom: 8, marginTop: 8, width: "100%" }}>
              <MonarchNameTable
                initialNames={monarchNames}
                onValidate={(names) => {
                  setMonarchNames(names);
                }}
              />
            </FormControl>
            <ChipInput
              style={{ marginBottom: 8, marginTop: 8, width: "100%" }}
              label="country.armyNames"
              values={armyNames}
              onAdd={(value) => {
                setArmyNames([...armyNames, value]);
              }}
              onDelete={(index) => {
                setArmyNames(armyNames.filter((value, i) => i !== index));
              }}
            />
            <ChipInput
              style={{ marginBottom: 8, marginTop: 8, width: "100%" }}
              label="country.fleetNames"
              values={fleetNames}
              onAdd={(value) => {
                setFleetNames([...fleetNames, value]);
              }}
              onDelete={(index) => {
                setFleetNames(fleetNames.filter((value, i) => i !== index));
              }}
            />
            <ChipInput
              style={{ marginBottom: 8, marginTop: 8, width: "100%" }}
              label="country.shipNames"
              values={shipNames}
              onAdd={(value) => {
                setShipNames([...shipNames, value]);
              }}
              onDelete={(index) => {
                setShipNames(shipNames.filter((value, i) => i !== index));
              }}
            />
            <ChipInput
              style={{ marginBottom: 8, marginTop: 8, width: "100%" }}
              label="country.leaderNames"
              values={leaderNames}
              onAdd={(value) => {
                setLeaderNames([...leaderNames, value]);
              }}
              onDelete={(index) => {
                setLeaderNames(leaderNames.filter((value, i) => i !== index));
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

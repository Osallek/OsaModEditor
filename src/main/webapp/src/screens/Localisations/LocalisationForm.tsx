import { Card, CardContent, CardHeader, Grid, TextField } from "@mui/material";
import { LoadButton } from "components/controls";
import { BackTitle } from "components/global";
import { useEventSnackbar } from "hooks/snackbar.hooks";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import actions from "store/actions";
import { RootState } from "store/types";
import { Localizations, ServerErrors, ServerSuccesses } from "types";
import { snackbarError } from "utils/snackbar.utils";

interface LocalisationFormParams {
  name: string;
}

const LocalisationForm: React.FC<void> = () => {
  const intl = useIntl();
  const history = useHistory();
  const dispatch = useDispatch();
  const { name } = useParams<LocalisationFormParams>();
  const { enqueueSnackbar } = useSnackbar();

  const { localisations } = useSelector((state: RootState) => {
    return state.game || {};
  });

  const localisation = localisations[name];

  if (!name || !localisation) {
    snackbarError(ServerErrors.LOCALISATION_NOT_FOUND, enqueueSnackbar, intl);
  }

  const [english, setEnglish] = useState<string | undefined>(localisation.english);
  const [french, setFrench] = useState<string | undefined>(localisation.french);
  const [german, setGerman] = useState<string | undefined>(localisation.german);
  const [spanish, setSpanish] = useState<string | undefined>(localisation.spanish);

  const [modified, setModified] = useState<boolean>(false);

  const [loading, submitEdit] = useEventSnackbar(async (form: Localizations) => {
    await dispatch(actions.localisation.edit(localisation.name, form));
  }, `api.success.${ServerSuccesses.DEFAULT_SUCCESS}`);

  useEffect(() => {
    if (localisation) {
      document.title = intl.formatMessage({ id: "global.appName" }) + " - " + localisation.name;
    }
  }, [intl, localisation]);

  const handleSubmit = async () => {
    if (!loading) {
      await submitEdit({
        english,
        french,
        spanish,
        german,
      });
    }
  };

  return localisation ? (
    <Grid container spacing={2}>
      <Grid item>
        <BackTitle handleClick={(event) => history.push(intl.formatMessage({ id: "routes.localisations" }))} />
      </Grid>
      <Grid item xs />
      <Grid item xs={12} md={10} xl={8} style={{ height: "100%" }}>
        <Card>
          <CardHeader
            title={localisation.name}
            titleTypographyProps={{ variant: "h4" }}
            action={
              <LoadButton
                key={"button-" + localisation.name}
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
            <TextField
              id="localisation-english"
              label={intl.formatMessage({ id: "global.english" })}
              style={{ marginBottom: 8, marginTop: 8, width: "100%" }}
              value={english ?? ""}
              multiline
              onChange={(event) => {
                if (event.target.value !== english) {
                  setEnglish(event.target.value);
                  setModified(true);
                }
              }}
            />
            <TextField
              id="localisation-french"
              label={intl.formatMessage({ id: "global.french" })}
              style={{ marginBottom: 8, marginTop: 8, width: "100%" }}
              value={french ?? ""}
              multiline
              onChange={(event) => {
                if (event.target.value !== french) {
                  setFrench(event.target.value);
                  setModified(true);
                }
              }}
            />
            <TextField
              id="localisation-german"
              label={intl.formatMessage({ id: "global.german" })}
              style={{ marginBottom: 8, marginTop: 8, width: "100%" }}
              value={german ?? ""}
              multiline
              onChange={(event) => {
                if (event.target.value !== german) {
                  setGerman(event.target.value);
                  setModified(true);
                }
              }}
            />
            <TextField
              id="localisation-spanish"
              label={intl.formatMessage({ id: "global.spanish" })}
              style={{ marginBottom: 8, marginTop: 8, width: "100%" }}
              value={spanish ?? ""}
              multiline
              onChange={(event) => {
                if (event.target.value !== spanish) {
                  setSpanish(event.target.value);
                  setModified(true);
                }
              }}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs />
    </Grid>
  ) : (
    <Grid style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Grid container>
        <Grid item alignSelf="center">
          <BackTitle handleClick={(event) => history.push(intl.formatMessage({ id: "routes.localisation" }))} />
        </Grid>
        <Grid item xs />
      </Grid>
    </Grid>
  );
};

export default LocalisationForm;

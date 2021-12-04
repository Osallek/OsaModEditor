import { Edit } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select/SelectInput";
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
import { AdvisorEdit, Power, ServerErrors, ServerSuccesses } from "types";
import { localize } from "utils/localisations.utils";
import { snackbarError } from "utils/snackbar.utils";
import { ModifiersTable } from "components/modifiers";

interface AdvisorFormParams {
  name: string;
}

const AdvisorForm: React.FC<void> = () => {
  const intl = useIntl();
  const history = useHistory();
  const dispatch = useDispatch();
  const { name } = useParams<AdvisorFormParams>();
  const { enqueueSnackbar } = useSnackbar();

  const { advisors, localisations } = useSelector((state: RootState) => {
    return state.game || {};
  });

  const advisor = advisors[name];

  if (!name || !advisor) {
    snackbarError(ServerErrors.ADVISOR_NOT_FOUND, enqueueSnackbar, intl);
  }

  const [power, setPower] = useState<Power>(advisor.power);
  const [allowOnlyMale, setAllowOnlyMale] = useState<boolean | undefined>(advisor.allowOnlyMale);
  const [allowOnlyFemale, setAllowOnlyFemale] = useState<boolean | undefined>(advisor.allowOnlyFemale);
  const [modifiers, setModifiers] = useState<Record<string, number>>(advisor.modifiers && advisor.modifiers.modifiers ? advisor.modifiers.modifiers : {});
  const [scaledModifiers, setScaledModifiers] = useState<Record<string, number>>(
    advisor.scaledModifiers && advisor.scaledModifiers.modifiers ? advisor.scaledModifiers.modifiers : {}
  );
  const [modified, setModified] = useState<boolean>(false);

  const [loading, submitEdit] = useEventSnackbar(async (form: AdvisorEdit) => {
    await dispatch(actions.advisor.edit(advisor.name, form));
  }, `api.success.${ServerSuccesses.DEFAULT_SUCCESS}`);

  useEffect(() => {
    if (advisor) {
      document.title = intl.formatMessage({ id: "global.appName" }) + " - " + localize(advisor);
    }
  }, [intl, advisor]);

  const handleSubmit = async () => {
    if (!loading) {
      await submitEdit({
        power,
        allowOnlyMale,
        allowOnlyFemale,
        modifiers,
        scaledModifiers,
      });
    }
  };

  return advisor ? (
    <Grid container spacing={2}>
      <Grid item>
        <BackTitle handleClick={(event) => history.push(intl.formatMessage({ id: "routes.advisors" }))} />
      </Grid>
      <Grid item xs />
      <Grid item xs={12} md={10} xl={8} style={{ height: "100%" }}>
        <Card>
          <CardHeader
            title={localize(advisor)}
            titleTypographyProps={{ variant: "h4" }}
            action={
              <LoadButton
                key={"button" + advisor.name}
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
            <FormControl style={{ marginBottom: 8, marginTop: 8, width: "100%", alignItems: "start" }} variant="outlined">
              <InputLabel htmlFor="advisor-name" style={{ top: 9 }}>
                {intl.formatMessage({ id: "global.name" })}
              </InputLabel>
              <OutlinedInput
                id="advisor-name"
                label={intl.formatMessage({ id: "global.name" })}
                style={{ marginBottom: 8, marginTop: 8, width: "100%" }}
                value={localize(localisations[advisor.name])}
                disabled
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={(event) => history.push(intl.formatMessage({ id: "routes.localisation" }) + "/" + advisor.name)} edge="end">
                      {<Edit />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl style={{ marginBottom: 8, marginTop: 8, width: "100%" }}>
              <InputLabel id="power-label">{intl.formatMessage({ id: "advisor.power" })}</InputLabel>
              <Select
                labelId="power-label"
                label={intl.formatMessage({ id: "advisor.power" })}
                value={power}
                onChange={(event: SelectChangeEvent) => {
                  if (Power[event.target.value as keyof typeof Power] !== power) {
                    setPower(Power[event.target.value as keyof typeof Power]);
                    setModified(true);
                  }
                }}
              >
                {Object.values(Power).map((p) => (
                  <MenuItem value={p} key={p}>
                    {intl.formatMessage({ id: "global." + p })}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl style={{ marginBottom: 8, marginTop: 8, width: "100%", alignItems: "start" }}>
              <FormControlLabel
                label={intl.formatMessage({ id: "advisor.allowOnlyMale" })}
                labelPlacement="start"
                control={
                  <Switch
                    checked={allowOnlyMale ?? false}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setAllowOnlyMale(event.target.checked);
                      setModified(true);
                    }}
                  />
                }
              />
            </FormControl>
            <FormControl style={{ marginBottom: 8, marginTop: 8, width: "100%", alignItems: "start" }}>
              <FormControlLabel
                label={intl.formatMessage({ id: "advisor.allowOnlyFemale" })}
                labelPlacement="start"
                control={
                  <Switch
                    checked={allowOnlyFemale ?? false}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setAllowOnlyFemale(event.target.checked);
                      setModified(true);
                    }}
                  />
                }
              />
            </FormControl>
            <FormControl style={{ marginBottom: 8, marginTop: 8, width: "100%" }}>
              <ModifiersTable
                title="advisor.modifiers"
                initialValues={modifiers}
                onValidate={(modifiers) => {
                  setModifiers(modifiers);
                  setModified(true);
                }}
              />
            </FormControl>
            <FormControl style={{ marginBottom: 8, marginTop: 8, width: "100%" }}>
              <ModifiersTable
                title="advisor.scaledModifiers"
                initialValues={scaledModifiers}
                onValidate={(modifiers) => {
                  setScaledModifiers(modifiers);
                  setModified(true);
                }}
              />
            </FormControl>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs />
    </Grid>
  ) : (
    <Grid style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Grid container>
        <Grid item alignSelf="center">
          <BackTitle handleClick={(event) => history.push(intl.formatMessage({ id: "routes.advisors" }))} />
        </Grid>
        <Grid item xs />
      </Grid>
    </Grid>
  );
};

export default AdvisorForm;

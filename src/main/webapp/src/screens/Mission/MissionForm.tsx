import { Clear, Edit } from "@mui/icons-material";
import { MobileDatePicker } from "@mui/lab";
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
  OutlinedInput,
  Switch,
  TextField,
} from "@mui/material";
import { LoadButton } from "components/controls";
import { BackTitle } from "components/global";
import { VirtualizedMissionAutocomplete } from "components/mission";
import { VirtualizedSpriteTypesAutocomplete } from "components/spriteType";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { RootState } from "store/types";
import { Mission, MissionEdit, ServerErrors, ServerSuccesses, SpriteType } from "types";
import { localize } from "utils/localisations.utils";
import { snackbarError } from "utils/snackbar.utils";
import { useEventSnackbar } from "hooks/snackbar.hooks";
import actions from "store/actions";
import { dateToLocalDate } from "utils/date.utils";

interface MissionFormParams {
  name: string;
}

const MissionForm: React.FC<void> = () => {
  const intl = useIntl();
  const history = useHistory();
  const dispatch = useDispatch();
  const { name } = useParams<MissionFormParams>();
  const { enqueueSnackbar } = useSnackbar();

  const { missions, missionsGfx, sortedMissionsGfx, sortedMissions, folderName, startDate, endDate, localisations } = useSelector((state: RootState) => {
    return state.game || {};
  });

  const mission = missions[name];

  if (!name || !mission) {
    snackbarError(ServerErrors.MISSION_NOT_FOUND, enqueueSnackbar, intl);
  }

  let minDate = null;
  let maxDate = null;

  if (startDate) {
    minDate = new Date(startDate);
    minDate.setFullYear(startDate.getFullYear() - 100);
  }

  if (endDate) {
    maxDate = new Date(endDate);
    maxDate.setFullYear(endDate.getFullYear() + 100);
  }

  const [icon, setIcon] = useState<SpriteType | undefined>(mission.icon ? missionsGfx[mission.icon] : undefined);
  const [position, setPosition] = useState<number | undefined>(mission.position);
  const [generic, setGeneric] = useState<boolean | undefined>(mission.generic);
  const [completedBy, setCompletedBy] = useState<Date | null>(mission.completedBy ? new Date(mission.completedBy) : null);
  const [requiredMissions, setRequiredMissions] = useState<Array<Mission>>(
    mission.requiredMissions ? mission.requiredMissions.map((mission) => missions[mission]) : []
  );
  const [modified, setModified] = useState<boolean>(false);

  const [loading, submitEdit] = useEventSnackbar(async (form: MissionEdit) => {
    await dispatch(actions.mission.edit(mission.name, form));
  }, `api.success.${ServerSuccesses.DEFAULT_SUCCESS}`);

  useEffect(() => {
    if (mission) {
      document.title = intl.formatMessage({ id: "global.appName" }) + " - " + localize(mission);
    }
  }, [intl, mission]);

  const handleSubmit = async () => {
    if (!loading) {
      await submitEdit({
        position,
        generic,
        icon: icon?.name,
        completedBy: dateToLocalDate(completedBy),
        requiredMissions: requiredMissions.map((m) => m.name),
      });
    }
  };

  return mission ? (
    <Grid container spacing={2}>
      <Grid item>
        <BackTitle handleClick={(event) => history.push(intl.formatMessage({ id: "routes.missions" }))} />
      </Grid>
      <Grid item xs />
      <Grid item xs={12} md={10} xl={8} style={{ height: "100%" }}>
        <Card>
          <CardHeader
            title={localize(mission)}
            titleTypographyProps={{ variant: "h4" }}
            action={
              <LoadButton
                key={"button" + mission.name}
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
              <InputLabel htmlFor="mission-name" style={{ top: 9 }}>
                {intl.formatMessage({ id: "global.name" })}
              </InputLabel>
              <OutlinedInput
                id="mission-name"
                label={intl.formatMessage({ id: "global.name" })}
                style={{ marginBottom: 8, marginTop: 8, width: "100%" }}
                value={localize(localisations[mission.name + "_title"])}
                disabled
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={(event) => history.push(intl.formatMessage({ id: "routes.localisation" }) + "/" + mission.name)} edge="end">
                      {<Edit />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl style={{ marginBottom: 8, marginTop: 8, width: "100%" }}>
              <VirtualizedSpriteTypesAutocomplete
                value={icon}
                values={sortedMissionsGfx ?? []}
                onChange={(value) => {
                  setIcon(value);
                  setModified(true);
                }}
                folderName={folderName}
              />
            </FormControl>
            <TextField
              id="missions-tree-slot-input"
              label={intl.formatMessage({ id: "mission.position" })}
              type="number"
              style={{ marginBottom: 8, marginTop: 8, width: "100%" }}
              value={position ?? ""}
              InputProps={{
                inputProps: { min: 1 },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => {
                        if (position) {
                          setPosition(undefined);
                          setModified(true);
                        }
                      }}
                      onMouseDown={(event) => event.preventDefault()}
                      edge="end"
                    >
                      <Clear />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(event) => {
                if (!event.target.value) {
                  if (position) {
                    setPosition(undefined);
                    setModified(true);
                  }
                } else {
                  const num = parseInt(event.target.value);
                  if (num !== position) {
                    setPosition(num);
                    setModified(true);
                  }
                }
              }}
            />
            <FormControl style={{ marginBottom: 8, marginTop: 8, width: "100%", alignItems: "start" }}>
              <FormControlLabel
                label={intl.formatMessage({ id: "mission.generic" })}
                labelPlacement="start"
                control={
                  <Switch
                    checked={generic ?? false}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setGeneric(event.target.checked);
                      setModified(true);
                    }}
                  />
                }
              />
            </FormControl>
            <FormControl style={{ marginBottom: 8, marginTop: 8, width: "100%" }}>
              <MobileDatePicker
                autoFocus
                openTo="year"
                views={["year", "month", "day"]}
                label={intl.formatMessage({ id: "mission.completedBy" })}
                defaultCalendarMonth={startDate}
                value={completedBy}
                minDate={minDate}
                maxDate={maxDate}
                allowSameDateSelection
                disableCloseOnSelect
                onChange={() => {}}
                onAccept={(newValue) => {
                  if (newValue !== completedBy) {
                    setCompletedBy(newValue);
                    setModified(true);
                  }
                }}
                clearable
                clearText={intl.formatMessage({ id: "global.clear" })}
                okText={intl.formatMessage({ id: "global.ok" })}
                cancelText={intl.formatMessage({ id: "global.cancel" })}
                showToolbar={false}
                renderInput={(params) => {
                  return <TextField {...params} style={{ width: "100%" }} variant="outlined" />;
                }}
              />
            </FormControl>
            <FormControl style={{ marginBottom: 8, marginTop: 8, width: "100%" }}>
              <VirtualizedMissionAutocomplete
                folderName={folderName}
                value={requiredMissions}
                values={sortedMissions.filter((mission) => mission.name !== name)}
                onChange={(values) => {
                  setRequiredMissions(values);
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
          <BackTitle handleClick={(event) => history.push(intl.formatMessage({ id: "routes.missions" }))} />
        </Grid>
        <Grid item xs />
      </Grid>
    </Grid>
  );
};

export default MissionForm;

import { Card, CardContent, CardHeader, FormControl, FormControlLabel, Grid, Switch, TextField } from "@mui/material";
import { LoadButton } from "components/controls";
import { BackTitle } from "components/global";
import { MissionsList } from "components/mission";
import { useEventSnackbar } from "hooks/snackbar.hooks";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import actions from "store/actions";
import { RootState } from "store/types";
import { MissionsTreeEdit, ServerErrors, ServerSuccesses } from "types";
import { localisationsComparator } from "utils/localisations.utils";
import { snackbarError } from "utils/snackbar.utils";

interface MissionsTreeFormParams {
  name: string;
}

const MissionsTreeForm: React.FC<void> = () => {
  const intl = useIntl();
  const history = useHistory();
  const dispatch = useDispatch();
  const { name } = useParams<MissionsTreeFormParams>();
  const { enqueueSnackbar } = useSnackbar();

  const { missionsTrees, missions, maxMissionsSlots, folderName } = useSelector((state: RootState) => {
    return state.game || {};
  });

  const missionsTree = missionsTrees[name];

  if (!name || !missionsTree) {
    snackbarError(ServerErrors.MISSIONS_TREE_NOT_FOUND, enqueueSnackbar, intl);
  }

  const [slot, setSlot] = useState<number | undefined>(missionsTree.slot);
  const [ai, setAi] = useState<boolean | undefined>(missionsTree.ai);
  const [generic, setGeneric] = useState<boolean | undefined>(missionsTree.generic);
  const [hasCountryShield, setHasCountryShield] = useState<boolean | undefined>(missionsTree.hasCountryShield);
  const [modified, setModified] = useState<boolean>(false);

  const [loading, submitEdit] = useEventSnackbar(async (form: MissionsTreeEdit) => {
    await dispatch(actions.missionsTree.edit(missionsTree.name, form));
  }, `api.success.${ServerSuccesses.DEFAULT_SUCCESS}`);

  useEffect(() => {
    if (missionsTree) {
      document.title = intl.formatMessage({ id: "global.appName" }) + " - " + missionsTree.name;
    }
  }, [intl, missionsTree]);

  const handleSubmit = async () => {
    if (!loading) {
      await submitEdit({ slot, ai, generic, hasCountryShield });
    }
  };

  return missionsTree ? (
    <Grid container spacing={2}>
      <Grid item>
        <BackTitle handleClick={(event) => history.push(intl.formatMessage({ id: "routes.missionsTrees" }))} />
      </Grid>
      <Grid item xs />
      <Grid item xs={12} md={10} xl={8} style={{ height: "100%" }}>
        <Card>
          <CardHeader
            title={missionsTree.name}
            titleTypographyProps={{ variant: "h4" }}
            action={
              <LoadButton
                key={"button" + missionsTree.name}
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
              id="missions-tree-slot-input"
              label={intl.formatMessage({ id: "missionsTree.slot" })}
              type="number"
              style={{ marginBottom: 8, marginTop: 8, width: "100%" }}
              value={slot}
              InputProps={{ inputProps: { min: 1, max: maxMissionsSlots } }}
              onChange={(event) => {
                const num = parseInt(event.target.value);
                if (num !== slot && num > 0 && num <= maxMissionsSlots) {
                  setSlot(num);
                  setModified(true);
                }
              }}
            />
            <FormControl style={{ marginBottom: 8, marginTop: 8, width: "100%", alignItems: "start" }}>
              <FormControlLabel
                label={intl.formatMessage({ id: "missionsTree.ai" })}
                labelPlacement="start"
                control={
                  <Switch
                    checked={ai ?? false}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setAi(event.target.checked);
                      setModified(true);
                    }}
                  />
                }
              />
            </FormControl>
            <FormControl style={{ marginBottom: 8, marginTop: 8, width: "100%", alignItems: "start" }}>
              <FormControlLabel
                label={intl.formatMessage({ id: "missionsTree.generic" })}
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
            <FormControl style={{ marginBottom: 8, marginTop: 8, width: "100%", alignItems: "start" }}>
              <FormControlLabel
                label={intl.formatMessage({ id: "missionsTree.hasCountryShield" })}
                labelPlacement="start"
                control={
                  <Switch
                    checked={hasCountryShield ?? false}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setHasCountryShield(event.target.checked);
                      setModified(true);
                    }}
                  />
                }
              />
            </FormControl>
          </CardContent>
          {missionsTree.missions && missionsTree.missions.length > 0 && (
            <MissionsList missions={missionsTree.missions.map((mission) => missions[mission]).sort(localisationsComparator)} folderName={folderName} inline />
          )}
        </Card>
      </Grid>
      <Grid item xs />
    </Grid>
  ) : (
    <Grid style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Grid container>
        <Grid item alignSelf="center">
          <BackTitle handleClick={(event) => history.push(intl.formatMessage({ id: "routes.missionsTrees" }))} />
        </Grid>
        <Grid item xs />
      </Grid>
    </Grid>
  );
};

export default MissionsTreeForm;

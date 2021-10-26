import { Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select/SelectInput";
import api from "api";
import { FormControl, LoadButton } from "components/controls";
import { Title } from "components/global";
import LabeledLinearProgress from "components/global/LabeledLinearProgress";
import { useEventSnackbar } from "hooks/snackbar.hooks";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import actions from "store/actions";
import { RootState } from "store/types";

const Home: React.FC<void> = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const history = useHistory();

  const {
    installFolder = null,
    mods = null,
    version,
  } = useSelector((state: RootState) => {
    return state.init || {};
  });

  const [install, setInstall] = useState<string>("");
  const [mod, setMod] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [loading, submitInitGame] = useEventSnackbar(async (installFolder: string, mod: string) => {
    try {
      await dispatch(actions.game.postInit(installFolder, mod));
    } finally {
      if (progressTimer) {
        clearInterval(progressTimer);
      }
    }

    history.push(intl.formatMessage({ id: "routes.menu" }));
  });
  let progressTimer: NodeJS.Timeout | null = null;

  useEffect(() => {
    dispatch(actions.init.getInit());
  }, [dispatch]);

  useEffect(() => {
    if (installFolder) {
      setInstall(installFolder);
    }
  }, [installFolder]);

  useEffect(() => {
    document.title = intl.formatMessage({ id: "global.name" });
  }, [intl]);

  useEffect(() => {
    return () => {
      if (progressTimer) {
        clearInterval(progressTimer);
      }
    };
  }, []);

  const handleSubmit = async () => {
    if (installFolder && mod) {
      progressTimer = setInterval(() => {
        handleGetProgress();
      }, 500);

      await submitInitGame(installFolder, mod);
    }
  };

  const handleGetProgress = async () => {
    try {
      const { data } = await api.game.progress();
      setProgress(data);

      if (data >= 100 && progressTimer) {
        clearInterval(progressTimer);
      }
    } catch (e) {}
  };

  return (
    <>
      <Grid container direction="column" style={{ height: "100%" }}>
        <Title />
        <Grid container justifyContent="center" direction="column" spacing={2} style={{ flexGrow: 1 }}>
          <Grid item xs />
          <Grid container item justifyContent="center">
            <Grid item xs={12} md={8}>
              <TextField
                variant="outlined"
                label={intl.formatMessage({ id: "home.installFolder" })}
                value={install}
                onChange={(event) => setInstall(event.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container item justifyContent="center">
            <Grid item xs={12} sm={10} md={6} lg={4}>
              <FormControl variant="filled" fullWidth>
                <InputLabel>{intl.formatMessage({ id: "home.mod" })}</InputLabel>
                <Select value={mod} onChange={(event: SelectChangeEvent) => setMod(event.target.value as string)} required>
                  {mods &&
                    mods.map((m) => (
                      <MenuItem value={m.id} key={m.id}>
                        {m.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container item justifyContent="center">
            <LoadButton
              variant="contained"
              size="large"
              color="primary"
              onClick={handleSubmit}
              disabled={!mod || !installFolder || loading}
              messageKey="global.validate"
            />
          </Grid>
          <Grid container item justifyContent="center">
            <Grid item xs={12} md={8}>
              <LabeledLinearProgress progress={progress} message={"home.progress"} display={loading} />
            </Grid>
          </Grid>
          <Grid item xs />
        </Grid>
      </Grid>
      {version && (
        <Typography align="center" variant="subtitle2">
          {intl.formatMessage({ id: "home.version" })}: {version}
        </Typography>
      )}
    </>
  );
};

export default Home;

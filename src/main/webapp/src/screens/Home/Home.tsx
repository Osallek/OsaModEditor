import { Grid, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import { SelectChangeEvent } from "@material-ui/core/Select/SelectInput";
import Button, { FormControl } from "components/controls";
import { Title } from "components/global";
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

  useEffect(() => {
    dispatch(actions.init.getInit());
  }, [dispatch]);

  const { installFolder = null, mods = null } = useSelector((state: RootState) => {
    return state.init || {};
  });

  const [install, setInstall] = useState<string>("");
  const [mod, setMod] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (installFolder) {
      setInstall(installFolder);
    }
  }, [installFolder]);

  const handleSubmit = async () => {
    if (installFolder && mod) {
      try {
        setLoading(true);
        await dispatch(actions.game.postInit(installFolder, mod));
        history.push(intl.formatMessage({ id: "routes.menu" }));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Grid container direction="column" height="100%">
      <Title />
      <Grid container justifyContent="center" direction="column" spacing={3}>
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
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={handleSubmit}
            disabled={!mod || !installFolder}
            messageKey="global.validate"
            loading={loading}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;

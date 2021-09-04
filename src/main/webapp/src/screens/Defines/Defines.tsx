import { Collapse, Grid, List, ListItem, ListItemButton, ListItemText, TextField } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { BackTitle } from "components/global";
import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "store/types";
import Button from "../../components/controls";
import actions from "../../store/actions";

const Defines: React.FC<void> = () => {
  const intl = useIntl();
  const history = useHistory();
  const dispatch = useDispatch();

  const initDefines = useSelector((state: RootState) => {
    return state.game.defines;
  });
  const [open, setOpen] = useState<number | null>(null);
  const [defines, setDefines] = useState<Record<string, Record<string, string>>>(initDefines ? initDefines : {});
  const [loading, setLoading] = useState<boolean>(false);

  const handleClickItem = (index: number) => {
    if (open === index) {
      setOpen(null);
    } else {
      setOpen(index);
    }
  };

  const handleChangeValue = (key: string, subKey: string, value: string) => {
    if (initDefines) {
      setDefines({
        ...defines,
        [key]: {
          ...defines[key],
          [subKey]: value,
        },
      });
    }
  };

  const getChangedValues = (): Record<string, Record<string, string>> => {
    const changedValues: Record<string, Record<string, string>> = {};

    if (initDefines) {
      for (const [key, value] of Object.entries(defines)) {
        changedValues[key] = {};

        for (const [subKey, subValue] of Object.entries(value)) {
          if (initDefines[key][subKey] !== subValue) {
            changedValues[key][subKey] = subValue;
          }
        }
      }

      for (const [key, value] of Object.entries(changedValues)) {
        if (!value || Object.keys(value).length < 1) {
          delete changedValues[key];
        }
      }
    }

    return changedValues;
  };

  const handleSubmit = async () => {
    if (!loading) {
      try {
        setLoading(true);
        await dispatch(actions.game.changeDefines(getChangedValues()));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Grid container alignItems="center">
        <Grid item>
          <BackTitle handleClick={(event) => history.push(intl.formatMessage({ id: "routes.menu" }))} />
        </Grid>
        <Grid item>
          <h1>
            <FormattedMessage id="global.defines" />
          </h1>
        </Grid>
        <Grid item xs />
        <Grid item justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
            disabled={Object.keys(getChangedValues()).length < 1}
            messageKey="global.validate"
            loading={loading}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8} lg={6} style={{ backgroundColor: "lightgray", height: "100%" }}>
          <List component="nav" sx={{ backgroundColor: "lightgray" }}>
            {defines &&
              Object.entries(defines).map(([key, value], index) => (
                <>
                  <ListItemButton key={key} onClick={() => handleClickItem(index)}>
                    <ListItemText primary={key} key={key + index} />
                    {open === index ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={open === index} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding dense key={index + key}>
                      {Object.entries(value).map(([subKey, subValue]) => (
                        <ListItem key={key + subKey + index}>
                          <TextField
                            variant="filled"
                            key={index + key + subKey}
                            label={subKey}
                            value={subValue}
                            onChange={(event) => {
                              handleChangeValue(key, subKey, event.target.value);
                            }}
                            fullWidth
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </>
              ))}
          </List>
        </Grid>
      </Grid>
    </>
  );
};

export default Defines;

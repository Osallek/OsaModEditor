import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Card, CardContent, CardHeader, Collapse, Grid, List, ListItem, ListItemButton, ListItemText, TextField } from "@mui/material";
import { BackTitle } from "components/global";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "store/types";
import Button from "../../components/controls";
import { useEventSnackbar } from "../../hooks/snackbar.hooks";
import actions from "../../store/actions";
import { ServerSuccesses } from "../../types";

const Defines: React.FC<void> = () => {
  const intl = useIntl();
  const history = useHistory();
  const dispatch = useDispatch();

  const initDefines = useSelector((state: RootState) => {
    return state.game.defines;
  });
  const [open, setOpen] = useState<number | null>(null);
  const [defines, setDefines] = useState<Record<string, Record<string, string>>>(initDefines ? initDefines : {});
  const [loading, submitChangeDefine] = useEventSnackbar(async (defines: Record<string, Record<string, string>>) => {
    await dispatch(actions.game.changeDefines(defines));
  }, `api.success.${ServerSuccesses.DEFAULT_SUCCESS}`);

  useEffect(() => {
    document.title = intl.formatMessage({ id: "global.name" }) + " - " + intl.formatMessage({ id: "global.defines" });
  }, [intl]);

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
      await submitChangeDefine(getChangedValues());
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item>
        <BackTitle handleClick={(event) => history.push(intl.formatMessage({ id: "routes.menu" }))} />
      </Grid>
      <Grid item xs />
      <Grid item xs={10} md={8} lg={8} xl={6} style={{ height: "100%" }}>
        <Card style={{ backgroundColor: "lightgray" }}>
          <CardHeader
            title={intl.formatMessage({ id: "global.defines" })}
            titleTypographyProps={{ variant: "h4" }}
            action={
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleSubmit}
                disabled={Object.keys(getChangedValues()).length < 1}
                messageKey="global.validate"
                loading={loading}
              />
            }
          />
          <CardContent>
            <List component="nav" sx={{ backgroundColor: "lightgray" }}>
              {Object.entries(defines).map(([key, value], index) => (
                <>
                  <ListItemButton key={index} onClick={() => handleClickItem(index)}>
                    <ListItemText primary={key} key={key + index} />
                    {open === index ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={open === index} key={index + key + index} timeout="auto" unmountOnExit>
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
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs />
    </Grid>
  );
};

export default Defines;

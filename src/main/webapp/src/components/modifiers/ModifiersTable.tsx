import { Add, Delete } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputLabel, MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select/SelectInput";
import { makeStyles } from "@mui/styles";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FormControl } from "components/controls";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { RootState } from "store/types";
import { ModifierScope, Pair } from "types";
import { copyRecord } from "utils/global.utils";

interface Props {
  title: string;
  initialValues: Record<string, number>;
  onValidate: (names: Record<string, number>) => void;
}

const useStyles = makeStyles({
  root: {
    "& .no-padding": {
      padding: 0,
    },
  },
});

const ModifiersTable = ({ initialValues = {}, onValidate, title }: Props) => {
  const intl = useIntl();
  const classes = useStyles();

  const { sortedModifiers } = useSelector((state: RootState) => {
    return state.game || {};
  });

  const [open, setOpen] = useState<boolean>(false);
  const [selectedModifiers, setSelectedModifiers] = useState<Record<string, number>>(copyRecord(initialValues));
  const [newModifier, setNewModifier] = useState<Pair<string, number>>({
    key: "",
    value: 0,
  });

  const reset = () => {
    setSelectedModifiers(copyRecord(initialValues));
    setNewModifier({
      key: "",
      value: 0,
    });
  };

  const columns: GridColDef[] = [
    { field: "id", hide: true },
    {
      field: "name",
      headerName: intl.formatMessage({ id: "modifiers.name" }),
      flex: 15,
      editable: true,
      sortable: false,
      disableReorder: true,
      filterable: false,
      disableExport: true,
      cellClassName: "no-padding",
      renderCell: (params) => {
        return (
          <FormControl variant="outlined" fullWidth>
            <InputLabel />
            <Select
              value={params.formattedValue as string}
              onChange={(event: SelectChangeEvent) => {
                event.preventDefault();
                if (params.id === "") {
                  setNewModifier((prevState) => {
                    return {
                      ...prevState,
                      key: event.target.value as string,
                    };
                  });
                } else {
                  const copy = copyRecord(selectedModifiers);

                  const val = copy[params.id];
                  delete copy[params.id];
                  copy[event.target.value as string] = val;

                  setSelectedModifiers(copy);
                }
              }}
              required
            >
              {sortedModifiers
                .filter((m) => ModifierScope.COUNTRY === m.scope)
                .filter((m) => (params.formattedValue as string) === m.id || !selectedModifiers.hasOwnProperty(m.id))
                .map((m) => (
                  <MenuItem value={m.id} key={m.id}>
                    {m.id}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        );
      },
    },
    {
      field: "value",
      headerName: intl.formatMessage({ id: "modifiers.value" }),
      flex: 2,
      editable: true,
      sortable: false,
      disableReorder: true,
      filterable: false,
      disableExport: true,
      type: "number",
    },
    {
      field: "action",
      headerName: " ",
      align: "right",
      flex: 1,
      editable: false,
      sortable: false,
      disableReorder: true,
      filterable: false,
      disableExport: true,
      renderCell: (params) => {
        return params.id === "" ? (
          <IconButton
            onClick={() => {
              if (newModifier.key) {
                const copy = copyRecord(selectedModifiers);
                copy[newModifier.key] = newModifier.value;

                setSelectedModifiers(copy);
                setNewModifier({
                  key: "",
                  value: 0,
                });
              }
            }}
            disabled={newModifier.key === "" || selectedModifiers.hasOwnProperty(newModifier.key)}
          >
            <Add />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => {
              //Trick to prevent No row with id#X found (https://github.com/mui-org/material-ui-x/issues/2714)
              setTimeout(() => {
                if (params.id !== "") {
                  const copy = copyRecord(selectedModifiers);
                  delete copy[params.id];
                  setSelectedModifiers(copy);
                }
              });
            }}
          >
            <Delete />
          </IconButton>
        );
      },
    },
  ];

  const rows = Object.entries(selectedModifiers).map(([key, value]) => {
    return {
      id: key,
      name: key,
      value: value,
    };
  });
  rows.push({
    id: "",
    name: newModifier.key,
    value: newModifier.value,
  });

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => {
          setOpen(true);
          reset();
        }}
      >
        {intl.formatMessage({ id: title })}
      </Button>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={open}
        onClose={(event) => setOpen(false)}
        PaperProps={{
          style: {
            backgroundColor: "white",
          },
        }}
      >
        <DialogTitle>{intl.formatMessage({ id: title })}</DialogTitle>
        <DialogContent className={classes.root}>
          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight
            disableColumnSelector
            disableColumnMenu
            disableSelectionOnClick
            hideFooterSelectedRowCount
            hideFooter={Object.keys(selectedModifiers).length < 100}
            pagination
            rowsPerPageOptions={[]}
            showCellRightBorder
            showColumnRightBorder
            onCellEditCommit={(params) => {
              if (params.id === "") {
                if (params.field === "name") {
                  setNewModifier((prevState) => {
                    return {
                      ...prevState,
                      key: params.value as string,
                    };
                  });
                } else if (params.field === "value") {
                  setNewModifier((prevState) => {
                    return {
                      ...prevState,
                      value: params.value as number,
                    };
                  });
                }
              } else {
                const copy = copyRecord(selectedModifiers);

                if (params.field === "name") {
                  const val = copy[params.id];
                  delete copy[params.id];
                  copy[params.value as string] = val;
                } else if (params.field === "value") {
                  copy[params.id] = params.value as number;
                }

                setSelectedModifiers(copy);
              }
            }}
          />
        </DialogContent>
        <DialogActions style={{ padding: "16px 24px" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => {
              if (selectedModifiers !== initialValues) {
                onValidate(selectedModifiers);
              }

              setOpen(false);
            }}
          >
            {intl.formatMessage({ id: "global.validate" })}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModifiersTable;

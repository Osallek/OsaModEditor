import { Add, Delete } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Pair } from "types";
import { copyRecord } from "utils/global.utils";

interface Props {
  initialNames: Record<string, number>;
  onValidate: (names: Record<string, number>) => void;
}

const MonarchNameTable = ({ initialNames = {}, onValidate }: Props) => {
  const intl = useIntl();

  const [open, setOpen] = useState<boolean>(false);
  const [selectedNames, setSelectedNames] = useState<Record<string, number>>(copyRecord(initialNames));
  const [newName, setNewName] = useState<Pair<string, number>>({
                                                                 key: "",
                                                                 value: 0
                                                               });

  const reset = () => {
    setSelectedNames(copyRecord(initialNames));
    setNewName({
                 key: "",
                 value: 0
               });
  };

  const columns: GridColDef[] = [
    { field: "id", hide: true },
    {
      field: "name",
      headerName: intl.formatMessage({ id: "country.monarchNames.name" }),
      flex: 15,
      editable: true,
      sortable: false,
      disableReorder: true,
      filterable: false,
      disableExport: true
    },
    {
      field: "weight",
      headerName: intl.formatMessage({ id: "country.monarchNames.weight" }),
      flex: 2,
      editable: true,
      sortable: false,
      disableReorder: true,
      filterable: false,
      disableExport: true,
      type: "number"
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
        return params.id === -1 ? (
          <IconButton
            onClick={() => {
              if (newName.key) {
                const copy = copyRecord(selectedNames);
                const val = copy[params.id];
                delete copy[params.id];
                copy[newName.key as string] = val;

                setSelectedNames(copy);
                setNewName({
                             key: "",
                             value: 0
                           });
              }
            }}
          >
            <Add />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => {
              //Trick to prevent No row with id#X found (https://github.com/mui-org/material-ui-x/issues/2714)
              setTimeout(() => {
                const copy = copyRecord(selectedNames);
                Object.entries(copy).forEach(([name, weight], i) => {
                  if (i !== (params.id as number)) {
                    delete copy[name];
                  }
                });
              });
            }}
          >
            <Delete />
          </IconButton>
        );
      }
    }
  ];

  const rows = Object.entries(selectedNames).map(([name, weight], index) => {
    return {
      id: index,
      name,
      weight
    };
  });
  rows.push({
              id: -1,
              name: newName.key,
              weight: newName.value
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
        {intl.formatMessage({ id: "country.monarchNames" })}
      </Button>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={open}
        onClose={(event) => setOpen(false)}
        PaperProps={{
          style: {
            backgroundColor: "white"
          }
        }}
      >
        <DialogTitle>{intl.formatMessage({ id: "country.monarchNames" })}</DialogTitle>
        <DialogContent>
          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight
            disableColumnSelector
            disableColumnMenu
            disableSelectionOnClick
            hideFooterSelectedRowCount
            hideFooter={selectedNames.length < 100}
            pagination
            rowsPerPageOptions={[]}
            showCellRightBorder
            showColumnRightBorder
            onCellEditCommit={(params) => {
              if (params.id === -1) {
                if (params.field === "name") {
                  setNewName({
                               key: params.value as string,
                               value: newName.value
                             });
                } else if (params.field === "weight") {
                  setNewName({
                               key: newName.key,
                               value: params.value as number
                             });
                }
              } else {
                const copy = copyRecord(selectedNames);
                const names = Object.keys(copy);
                const name = names[params.id as number];

                if (params.field === "name") {
                  copy[params.value as string] = copy[name];
                  delete copy[name];
                } else if (params.field === "weight") {
                  copy[name] = params.value as number;
                }

                setSelectedNames(copy);
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
              onValidate(selectedNames);
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

export default MonarchNameTable;

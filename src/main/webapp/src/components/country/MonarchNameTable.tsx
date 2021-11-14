import { Add, Delete } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Pair } from "types";

interface Props {
  initialNames: Array<Pair<string, number>>;
  onValidate: (names: Array<Pair<string, number>>) => void;
}

const MonarchNameTable = ({ initialNames = [], onValidate }: Props) => {
  const intl = useIntl();

  const [open, setOpen] = useState<boolean>(false);
  const [selectedNames, setSelectedNames] = useState<Array<Pair<string, number>>>(
    initialNames.map((value) => {
      return {
        ...value,
      };
    }) ?? []
  );
  const [newName, setNewName] = useState<Pair<string, number>>({
    key: "",
    value: 0,
  });

  const reset = () => {
    setSelectedNames(
      initialNames.map((value) => {
        return {
          ...value,
        };
      }) ?? []
    );
    setNewName({
      key: "",
      value: 0,
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
      disableExport: true,
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
        return params.id === -1 ? (
          <IconButton
            onClick={() => {
              if (newName.key) {
                const copy = [...selectedNames];
                copy.push(newName);

                setSelectedNames(copy);
                setNewName({
                  key: "",
                  value: 0,
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
                setSelectedNames(selectedNames.filter((value, i) => i !== (params.id as number)));
              });
            }}
          >
            <Delete />
          </IconButton>
        );
      },
    },
  ];

  const rows = selectedNames.map((value, index) => {
    return {
      id: index,
      name: value.key,
      weight: value.value,
    };
  });
  rows.push({
    id: -1,
    name: newName.key,
    weight: newName.value,
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
            backgroundColor: "white",
          },
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
                    value: newName.value,
                  });
                } else if (params.field === "weight") {
                  setNewName({
                    key: newName.key,
                    value: params.value as number,
                  });
                }
              } else {
                const copy = [...selectedNames];

                if (params.field === "name") {
                  copy[params.id as number].key = params.value as string;
                } else if (params.field === "weight") {
                  copy[params.id as number].value = params.value as number;
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

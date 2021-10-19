import { Chip, TextField } from "@mui/material";
import React, { useState } from "react";
import { useIntl } from "react-intl";

interface Props {
  label: string;
  values: Array<string>;
  onAdd: (value: string) => void;
  onDelete: (index: number) => void;
  style?: React.CSSProperties;
}

const ChipInput = ({ label, values = [], onAdd, onDelete, style }: Props) => {
  const intl = useIntl();

  const [value, setValue] = useState<string>("");

  return (
    <TextField
      fullWidth
      style={{ ...style }}
      label={intl.formatMessage({ id: label })}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      inputProps={{
        style: {
          paddingLeft: "20px",
          paddingTop: "2px",
        },
      }}
      InputProps={{
        style: {
          display: "flex",
          flexDirection: "column",
          paddingTop: "14px",
          alignItems: "start",
        },
        startAdornment: (
          <div>
            {values.map((value, index) => (
              <Chip key={value + index} onDelete={(event) => onDelete(index)} label={value} style={{ margin: "2px" }} />
            ))}
          </div>
        ),
      }}
      onKeyPress={(event) => {
        if (event.key === "Enter") {
          if (value && value.length > 0) {
            onAdd(value);
            setValue("");
          }
        }
      }}
    />
  );
};

export default ChipInput;

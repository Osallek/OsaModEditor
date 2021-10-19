import { InputAdornment, TextField } from "@mui/material";
import { BaseTextFieldProps } from "@mui/material/TextField/TextField";
import { ColorPicker } from "material-ui-color";
import React from "react";

interface Props extends BaseTextFieldProps {
  value: string;
  onChange: (color: string) => void;
}

const regex = new RegExp("^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$");

const ColorField = ({ value, onChange, ...otherProps }: Props) => {
  return (
    <TextField
      value={value}
      variant="outlined"
      onChange={(event) => {
        const val = event.target.value.startsWith("#") ? event.target.value : "#" + event.target.value;
        if (val !== value && regex.test(val)) {
          onChange(val);
        }
      }}
      {...otherProps}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <ColorPicker
              onChange={(newColor) => {
                if ("#" + newColor.hex !== value) {
                  onChange("#" + newColor.hex);
                }
              }}
              value={value}
              disableAlpha
              hideTextfield
            />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default ColorField;

import { FormControl as MFormControl } from "@mui/material";
import { FormControlTypeMap } from "@mui/material/FormControl/FormControl";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";
import React, { ReactElement } from "react";

interface Props extends DefaultComponentProps<FormControlTypeMap> {
  children?: ReactElement[];
}

const FormControl = (props: Props) => {
  let { style } = props;
  style = {
    ...style,
    minWidth: 160,
  };

  return (
    <MFormControl {...props} style={style}>
      {props.children}
    </MFormControl>
  );
};

export default FormControl;

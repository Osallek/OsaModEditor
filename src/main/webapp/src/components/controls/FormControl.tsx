import { FormControl as MFormControl } from "@material-ui/core";
import { FormControlTypeMap } from "@material-ui/core/FormControl/FormControl";
import { DefaultComponentProps } from "@material-ui/core/OverridableComponent";
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

import { IconButton } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import React, { MouseEventHandler } from "react";

interface Props {
  handleClick: MouseEventHandler;
}

const BackTitle = ({ handleClick }: Props) => {
  return (
    <IconButton color="inherit" onClick={handleClick}>
      <ArrowBack fontSize="large" />
    </IconButton>
  );
};

export default BackTitle;

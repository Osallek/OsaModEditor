import { IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
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

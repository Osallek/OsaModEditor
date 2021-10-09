import { LinearProgress, Typography } from "@mui/material";
import React from "react";
import { useIntl } from "react-intl";

interface Props {
  display?: boolean;
  message: string;
  progress: number;
}

const LabeledLinearProgress = ({ display = true, message, progress }: Props) => {
  const intl = useIntl();

  return display ? (
    <>
      <Typography align="center">{intl.formatMessage({ id: message })}</Typography>
      <LinearProgress variant="determinate" value={progress} />
      <Typography variant="body2" color="text.secondary">{`${progress}%`}</Typography>
    </>
  ) : (
    <div style={{ height: 48 }} />
  );
};

export default LabeledLinearProgress;

import { LoadingButton } from "@mui/lab";
import { LoadingButtonProps } from "@mui/lab/LoadingButton/LoadingButton";
import { Tooltip } from "@mui/material";
import * as React from "react";
import { useIntl } from "react-intl";

interface Props extends LoadingButtonProps {
  icon: React.ReactNode;
  tooltipKey?: string;
}

const LoadIcon = ({ icon, tooltipKey, style, ...others }: Props) => {
  const intl = useIntl();

  //https://mui.com/components/tooltips/#disabled-elements
  return tooltipKey ? (
    <Tooltip title={intl.formatMessage({ id: tooltipKey })}>
      <span style={{ paddingTop: 2 }}>
        <LoadingButton size="small" style={{ ...style, minWidth: 36 }} {...others}>
          {icon}
        </LoadingButton>
      </span>
    </Tooltip>
  ) : (
    <LoadingButton size="small" style={{ ...style, padding: 0, minWidth: 36 }} {...others}>
      {icon}
    </LoadingButton>
  );
};

export default LoadIcon;

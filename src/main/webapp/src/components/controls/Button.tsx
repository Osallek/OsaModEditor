import { LoadingButton } from "@mui/lab";
import { LoadingButtonProps } from "@mui/lab/LoadingButton/LoadingButton";
import { useIntl } from "react-intl";

interface Props extends LoadingButtonProps {
  messageKey: string;
}

const Button = ({ messageKey, ...others }: Props) => {
  const intl = useIntl();

  return <LoadingButton {...others}>{intl.formatMessage({ id: messageKey })}</LoadingButton>;
};

export default Button;

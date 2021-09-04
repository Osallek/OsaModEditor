import { LoadingButton } from "@material-ui/lab";
import { LoadingButtonProps } from "@material-ui/lab/LoadingButton/LoadingButton";
import { useIntl } from "react-intl";

interface Props extends LoadingButtonProps {
  messageKey: string;
}

const Button = ({ messageKey, ...others }: Props) => {
  const intl = useIntl();

  return <LoadingButton {...others}>{intl.formatMessage({ id: messageKey })}</LoadingButton>;
};

export default Button;

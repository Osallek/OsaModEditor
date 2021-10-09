import { ProviderContext } from "notistack";
import { IntlShape } from "react-intl";
import { ServerErrors } from "types/api.types";

export const snackbarServerErrorRecognized = (error: any, enqueueSnackbar: ProviderContext["enqueueSnackbar"], intl: IntlShape): boolean => {
  const serverError = error?.response?.data?.error;

  if (serverError && Object.values(ServerErrors).includes(serverError)) {
    enqueueSnackbar(intl.formatMessage({ id: `api.error.${serverError}` }), { variant: "error" });
    return true;
  }

  return false;
};

export const snackbarServerErrorUnknown = (error: any, enqueueSnackbar: ProviderContext["enqueueSnackbar"], intl: IntlShape) =>
  enqueueSnackbar(intl.formatMessage({ id: `api.error.${ServerErrors.DEFAULT_ERROR}` }), { variant: "error" });

export const snackbarHandleServerError = (error: any, enqueueSnackbar: ProviderContext["enqueueSnackbar"], intl: IntlShape) => {
  if (!snackbarServerErrorRecognized(error, enqueueSnackbar, intl)) {
    snackbarServerErrorUnknown(error, enqueueSnackbar, intl);
  }
};

export const snackbarError = (error: ServerErrors, enqueueSnackbar: ProviderContext["enqueueSnackbar"], intl: IntlShape) => {
  snackbarHandleServerError(
    {
      response: {
        data: {
          error: error,
        },
      },
    },
    enqueueSnackbar,
    intl
  );
};

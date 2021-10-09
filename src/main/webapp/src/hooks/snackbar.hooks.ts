import { useState } from "react";
import { useSnackbar } from "notistack";
import { useIntl } from "react-intl";

import { snackbarHandleServerError } from "utils/snackbar.utils";

export const useEventSnackbar = (callbackFn: (...args: any) => any, successMessageIntlId?: string): [boolean, (...arg: any) => Promise<any>] => {
  const [isLoading, setIsLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const intl = useIntl();

  const apiCallWithSnackbar = async (...args: any): Promise<any> => {
    setIsLoading(true);
    try {
      const payload = await callbackFn(...args);

      if (successMessageIntlId) {
        enqueueSnackbar(intl.formatMessage({ id: successMessageIntlId }), { variant: "success" });
      }

      return payload;
    } catch (error) {
      snackbarHandleServerError(error, enqueueSnackbar, intl);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return [isLoading, apiCallWithSnackbar];
};

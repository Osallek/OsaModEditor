import { Province, ProvinceHistory } from "types";
import { dateToLocalDate } from "./date.utils";

export const getHistory = (province: Province, date: Date | null): ProvinceHistory | null => {
  let history = null;
  const dateString = dateToLocalDate(date);

  if (province.history && province.history.length > 0) {
    if (dateString) {
      for (const h of province.history) {
        if (!h.date || h.date <= dateString) {
          history = h;
        } else {
          break;
        }
      }
    } else {
      history = province.history[0];
    }
  }

  return history;
};

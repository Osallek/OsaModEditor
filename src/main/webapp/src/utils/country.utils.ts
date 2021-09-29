import { Country, CountryHistory } from "types";
import { dateToLocalDate } from "./date.utils";

export const getCountryHistory = (country: Country, date: Date | null): CountryHistory => {
  let history: CountryHistory = country.history[0];
  const dateString = dateToLocalDate(date);

  if (country.history && country.history.length > 0 && dateString) {
    for (const h of country.history) {
      if (!h.date || h.date <= dateString) {
        history = {
          ...history,
          ...h,
        };
      } else {
        break;
      }
    }
  }

  return history;
};

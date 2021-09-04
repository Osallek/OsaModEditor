import { LocalizationProvider } from "@material-ui/lab";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import { ThemeProvider } from "@material-ui/styles";
import enDateLocale from "date-fns/locale/en-US";
import frDateLocale from "date-fns/locale/fr";
import { en, fr } from "i18n/messages";
import React from "react";
import ReactDOM from "react-dom";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import store from "./store";
import theme from "./theme";

export const locale = navigator.language;
let messages = en;
let dateLocale = enDateLocale;

if (locale.startsWith("fr")) {
  messages = fr;
  dateLocale = frDateLocale;
}

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <IntlProvider locale={locale} messages={messages}>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={dateLocale}>
            <App />
          </LocalizationProvider>
        </IntlProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

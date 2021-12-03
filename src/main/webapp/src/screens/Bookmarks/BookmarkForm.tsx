import { MobileDatePicker } from "@mui/lab";
import { Card, CardContent, CardHeader, FormControl, FormControlLabel, Grid, Switch, TextField } from "@mui/material";
import { LoadButton } from "components/controls";
import { VirtualizedCountriesAutocomplete } from "components/country";
import { BackTitle } from "components/global";
import { VirtualizedMissionAutocomplete } from "components/mission";
import { VirtualizedProvinceAutocomplete } from "components/province";
import { useEventSnackbar } from "hooks/snackbar.hooks";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import actions from "store/actions";
import { RootState } from "store/types";
import { BookmarkEdit, ServerErrors, ServerSuccesses } from "types";
import { dateToLocalDate } from "utils/date.utils";
import { localize } from "utils/localisations.utils";
import { snackbarError } from "utils/snackbar.utils";

interface BookmarkFormParams {
  name: string;
}

const BookmarkForm: React.FC<void> = () => {
  const intl = useIntl();
  const history = useHistory();
  const dispatch = useDispatch();
  const { name } = useParams<BookmarkFormParams>();
  const { enqueueSnackbar } = useSnackbar();

  const { bookmarks, startDate, endDate, sortedCountries, countries, provinces, sortedProvinces, folderName } = useSelector((state: RootState) => {
    return state.game || {};
  });

  const bookmark = bookmarks[name];

  if (!name || !bookmark) {
    snackbarError(ServerErrors.BOOKMARK_NOT_FOUND, enqueueSnackbar, intl);
  }

  const [isDefault, setDefault] = useState<boolean | null>(bookmark.default);
  const [date, setDate] = useState<Date | null>(bookmark.date ? new Date(bookmark.date) : null);
  const [center, setCenter] = useState<number | null>(bookmark.center);
  const [selectedCountries, setSelectedCountries] = useState<Array<string>>(bookmark.countries);
  const [easyCountries, setEasyCountries] = useState<Array<string>>(bookmark.easyCountries);
  const [modified, setModified] = useState<boolean>(false);

  const [loading, submitEdit] = useEventSnackbar(async (form: BookmarkEdit) => {
    await dispatch(actions.bookmark.edit(bookmark.name, form));
  }, `api.success.${ServerSuccesses.DEFAULT_SUCCESS}`);

  useEffect(() => {
    if (bookmark) {
      document.title = intl.formatMessage({ id: "global.name" }) + " - " + localize(bookmark);
    }
  }, [intl, bookmark]);

  const handleSubmit = async () => {
    if (!loading) {
      await submitEdit({
        default: isDefault,
        date: dateToLocalDate(date),
        center,
        countries: selectedCountries,
        easyCountries,
      });
    }
  };

  return bookmark ? (
    <Grid container spacing={2}>
      <Grid item>
        <BackTitle handleClick={(event) => history.push(intl.formatMessage({ id: "routes.bookmarks" }))} />
      </Grid>
      <Grid item xs />
      <Grid item xs={12} md={10} xl={8} style={{ height: "100%" }}>
        <Card>
          <CardHeader
            title={localize(bookmark)}
            titleTypographyProps={{ variant: "h4" }}
            action={
              <LoadButton
                key={"button" + bookmark.name}
                variant="contained"
                color="primary"
                size="large"
                onClick={handleSubmit}
                disabled={!modified}
                messageKey="global.validate"
                loading={loading}
              />
            }
          />
          <CardContent>
            <FormControl style={{ marginBottom: 8, marginTop: 8, width: "100%", alignItems: "start" }}>
              <FormControlLabel
                label={intl.formatMessage({ id: "bookmark.default" })}
                labelPlacement="start"
                control={
                  <Switch
                    checked={isDefault ?? false}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setDefault(event.target.checked);
                      setModified(true);
                    }}
                  />
                }
              />
            </FormControl>
            <FormControl style={{ marginBottom: 8, marginTop: 8, width: "100%" }}>
              <MobileDatePicker
                autoFocus
                openTo="year"
                views={["year", "month", "day"]}
                label={intl.formatMessage({ id: "bookmark.date" })}
                defaultCalendarMonth={startDate}
                value={date}
                minDate={startDate}
                maxDate={endDate}
                allowSameDateSelection
                disableCloseOnSelect
                onChange={() => {}}
                onAccept={(newValue) => {
                  if (newValue !== date) {
                    setDate(newValue);
                    setModified(true);
                  }
                }}
                clearable
                clearText={intl.formatMessage({ id: "global.clear" })}
                okText={intl.formatMessage({ id: "global.ok" })}
                cancelText={intl.formatMessage({ id: "global.cancel" })}
                showToolbar={false}
                renderInput={(params) => {
                  return <TextField {...params} style={{ width: "100%" }} variant="outlined" />;
                }}
              />
            </FormControl>
            <FormControl style={{ marginBottom: 8, marginTop: 8, width: "100%" }}>
              <VirtualizedProvinceAutocomplete
                label="bookmark.center"
                value={center ? provinces[center] : undefined}
                values={sortedProvinces.filter((province) => province.name !== name)}
                onChange={(value) => {
                  setCenter(value.id);
                  setModified(true);
                }}
              />
            </FormControl>
            <FormControl style={{ marginBottom: 8, marginTop: 8, width: "100%" }}>
              <VirtualizedCountriesAutocomplete
                label="bookmark.countries"
                folderName={folderName}
                value={selectedCountries.map((value) => countries[value])}
                values={sortedCountries.filter((country) => !selectedCountries.includes(country.tag))}
                onChange={(values) => {
                  setSelectedCountries(values.map((value) => value.tag));
                  setModified(true);
                }}
              />
            </FormControl>
            <FormControl style={{ marginBottom: 8, marginTop: 8, width: "100%" }}>
              <VirtualizedCountriesAutocomplete
                label="bookmark.easyCountries"
                folderName={folderName}
                value={easyCountries.map((value) => countries[value])}
                values={sortedCountries.filter((country) => !easyCountries.includes(country.tag))}
                onChange={(values) => {
                  setEasyCountries(values.map((value) => value.tag));
                  setModified(true);
                }}
              />
            </FormControl>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs />
    </Grid>
  ) : (
    <Grid style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Grid container>
        <Grid item alignSelf="center">
          <BackTitle handleClick={(event) => history.push(intl.formatMessage({ id: "routes.bookmarks" }))} />
        </Grid>
        <Grid item xs />
      </Grid>
    </Grid>
  );
};

export default BookmarkForm;

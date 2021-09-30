import { KeyboardArrowRight } from "@mui/icons-material";
import { Autocomplete, Avatar, Grid, ListItem, ListItemAvatar, ListItemButton, ListItemText, TextField } from "@mui/material";
import { BackTitle } from "components/global";
import React, { useRef } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { RootState } from "store/types";
import { Country } from "types";
import { getImageUrl } from "utils/global.utils";
import { localize } from "utils/localisations.utils";

const Countries: React.FC<void> = () => {
  const intl = useIntl();
  const history = useHistory();

  const { folderName, sortedCountries } = useSelector((state: RootState) => {
    return state.game || {};
  });

  const listRef = useRef<FixedSizeList<Country>>(null);
  const scrollTo = (country: Country | null) => {
    if (listRef && listRef.current && country) {
      listRef.current.scrollToItem(sortedCountries?.indexOf(country) ?? 0, "start");
    }
  };

  const Row = ({ index, isScrolling, style }: ListChildComponentProps<Country>) => {
    const country: Country | null = sortedCountries ? sortedCountries[index] : null;
    return country ? (
      <ListItem style={style} key={index} disablePadding>
        <ListItemButton onClick={(event) => {}}>
          {folderName && (
            <ListItemAvatar>
              <Avatar src={getImageUrl(folderName, country.flagFile)} />
            </ListItemAvatar>
          )}
          <ListItemText primary={isScrolling ? "Scrolling" : sortedCountries ? localize(country) : ""} />
          <KeyboardArrowRight />
        </ListItemButton>
      </ListItem>
    ) : (
      <></>
    );
  };

  return (
    <Grid style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Grid container>
        <Grid item alignSelf="center">
          <BackTitle handleClick={(event) => history.push(intl.formatMessage({ id: "routes.menu" }))} />
        </Grid>
        <Grid item>
          <h1>
            <FormattedMessage id="global.countries" />
          </h1>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" flexGrow={1} spacing={2}>
        <Grid item xs={12} sm={3} lg={2}>
          <Autocomplete
            style={{ width: "100%" }}
            disableListWrap
            options={sortedCountries ?? []}
            onChange={(event, value) => scrollTo(value)}
            getOptionLabel={(option) => localize(option)}
            isOptionEqualToValue={(option, value) => option.tag === value.tag}
            renderInput={(params) => <TextField {...params} variant="filled" label={intl.formatMessage({ id: "global.country" })} />}
          />
        </Grid>
        <Grid item xs={12} sm={8} lg={6}>
          {sortedCountries && (
            <div style={{ backgroundColor: "lightgray", height: "100%", width: "100%" }}>
              <AutoSizer>
                {({ height, width }) => (
                  <FixedSizeList ref={listRef} height={height} width={width} itemCount={sortedCountries?.length} itemSize={50}>
                    {Row}
                  </FixedSizeList>
                )}
              </AutoSizer>
            </div>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Countries;

import { KeyboardArrowRight } from "@mui/icons-material";
import { Autocomplete, Avatar, Card, CardContent, CardHeader, Grid, ListItem, ListItemAvatar, ListItemButton, ListItemText, TextField } from "@mui/material";
import { BackTitle } from "components/global";
import React, { useEffect, useRef } from "react";
import { useIntl } from "react-intl";
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

  useEffect(() => {
    document.title = intl.formatMessage({ id: "global.name" }) + " - " + intl.formatMessage({ id: "global.countries" });
  }, [intl]);

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
      <>
        <ListItem style={style} key={index} disablePadding>
          <ListItemButton onClick={(event) => history.push(intl.formatMessage({ id: "routes.country" }) + "/" + country.tag)}>
            {folderName && (
              <ListItemAvatar>
                <Avatar src={getImageUrl(folderName, country.flagFile)} />
              </ListItemAvatar>
            )}
            <ListItemText primary={isScrolling ? "Scrolling" : sortedCountries ? localize(country) : ""} />
            <KeyboardArrowRight />
          </ListItemButton>
        </ListItem>
      </>
    ) : (
      <></>
    );
  };

  return (
    <Grid container spacing={2} style={{ height: "100%" }}>
      <Grid item>
        <BackTitle handleClick={(event) => history.push(intl.formatMessage({ id: "routes.menu" }))} />
      </Grid>
      <Grid item xs />
      <Grid item xs={10} md={8} lg={8} xl={6} style={{ height: "100%" }}>
        <Card style={{ backgroundColor: "lightgray", height: "100%" }}>
          <CardHeader
            title={intl.formatMessage({ id: "global.countries" })}
            titleTypographyProps={{ variant: "h4" }}
            action={
              <Autocomplete
                style={{ minWidth: "300px" }}
                disableListWrap
                options={sortedCountries ?? []}
                onChange={(event, value) => scrollTo(value)}
                getOptionLabel={(option) => localize(option)}
                isOptionEqualToValue={(option, value) => option.tag === value.tag}
                renderInput={(params) => <TextField {...params} variant="filled" label={intl.formatMessage({ id: "global.search" })} />}
              />
            }
          />
          {sortedCountries && (
            <CardContent style={{ height: "calc(100% - 120px)", width: "calc(100% - 32px)" }}>
              <AutoSizer>
                {({ height, width }) => (
                  <FixedSizeList ref={listRef} height={height - 24} width={width} itemCount={sortedCountries?.length} itemSize={50}>
                    {Row}
                  </FixedSizeList>
                )}
              </AutoSizer>
            </CardContent>
          )}
        </Card>
      </Grid>
      <Grid item xs />
    </Grid>
  );
};

export default Countries;

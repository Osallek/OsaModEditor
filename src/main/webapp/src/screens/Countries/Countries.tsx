import { Grid, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { BackTitle } from "components/global";
import React, { useEffect, useRef } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { RootState } from "store/types";
import { Country } from "../../types";
import { localize } from "../../utils/localisations.utils";

const Countries: React.FC<void> = () => {
  const intl = useIntl();
  const history = useHistory();

  const { sortedCountries } = useSelector((state: RootState) => {
    return state.game || {};
  });

  const listRef = useRef<FixedSizeList<Country>>(null);

  const Row = ({ index, isScrolling, style }: ListChildComponentProps<Country>) => {
    return (
      <ListItem style={style} key={index} disablePadding>
        <ListItemButton
          onClick={(event) => {
            if (listRef && listRef.current) {
              listRef.current.scrollToItem(100, "center");
            }
          }}
        >
          <ListItemText primary={isScrolling ? "Scrolling" : sortedCountries ? localize(sortedCountries[index]) : ""} />
        </ListItemButton>
      </ListItem>
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
      <Grid container justifyContent="center" flexGrow={1}>
        <Grid item xs={12} md={8} lg={6} style={{ backgroundColor: "lightgray" }}>
          {sortedCountries && (
            <AutoSizer>
              {({ height, width }) => (
                <FixedSizeList ref={listRef} height={height} width={width} itemCount={sortedCountries?.length} itemSize={50}>
                  {Row}
                </FixedSizeList>
              )}
            </AutoSizer>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Countries;

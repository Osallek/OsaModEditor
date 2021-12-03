import { KeyboardArrowRight } from "@mui/icons-material";
import { Autocomplete, Card, CardContent, CardHeader, Grid, ListItem, ListItemButton, ListItemText, TextField } from "@mui/material";
import { BackTitle } from "components/global";
import React, { useEffect, useRef } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { RootState } from "store/types";
import { Bookmark } from "types";
import { localize } from "utils/localisations.utils";

const Bookmarks: React.FC<void> = () => {
  const intl = useIntl();
  const history = useHistory();

  useEffect(() => {
    document.title = intl.formatMessage({ id: "global.name" }) + " - " + intl.formatMessage({ id: "global.bookmarks" });
  }, [intl]);

  const { sortedBookmarks } = useSelector((state: RootState) => {
    return state.game || {};
  });

  const listRef = useRef<FixedSizeList<Bookmark>>(null);
  const scrollTo = (bookmark: Bookmark | null) => {
    if (listRef && listRef.current && bookmark) {
      listRef.current.scrollToItem(sortedBookmarks?.indexOf(bookmark) ?? 0, "start");
    }
  };

  const Row = ({ index, style }: ListChildComponentProps<Bookmark>) => {
    const bookmark: Bookmark | null = sortedBookmarks ? sortedBookmarks[index] : null;
    return bookmark ? (
      <>
        <ListItem style={style} key={index} disablePadding>
          <ListItemButton onClick={(event) => history.push(intl.formatMessage({ id: "routes.bookmark" }) + "/" + bookmark.name)}>
            <ListItemText
              primary={(sortedBookmarks ? localize(bookmark) : "") + (bookmark.date ? " (" + new Date(bookmark.date).toLocaleDateString() + ")" : "")}
            />
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
      <Grid item xs={12} md={10} xl={8} style={{ height: "100%" }}>
        <Card style={{ height: "100%" }}>
          <CardHeader
            title={intl.formatMessage({ id: "global.bookmarks" })}
            titleTypographyProps={{ variant: "h4" }}
            action={
              <Autocomplete
                style={{ minWidth: "300px" }}
                disableListWrap
                options={sortedBookmarks ?? []}
                onChange={(event, value) => scrollTo(value)}
                getOptionLabel={(option) => localize(option)}
                isOptionEqualToValue={(option, value) => option.name === value.name}
                renderInput={(params) => <TextField {...params} variant="filled" label={intl.formatMessage({ id: "global.search" })} />}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.name}>
                      {localize(option)}
                    </li>
                  );
                }}
              />
            }
          />
          {sortedBookmarks && (
            <CardContent style={{ height: "calc(100% - 120px)", width: "calc(100% - 32px)" }}>
              <AutoSizer>
                {({ height, width }) => (
                  <FixedSizeList ref={listRef} height={height - 24} width={width} itemCount={sortedBookmarks?.length} itemSize={50}>
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

export default Bookmarks;

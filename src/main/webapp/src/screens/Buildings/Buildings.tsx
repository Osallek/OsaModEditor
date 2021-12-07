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
import { Building } from "types";
import { getImageUrl } from "utils/global.utils";
import { localize } from "utils/localisations.utils";

const Buildings: React.FC<void> = () => {
  const intl = useIntl();
  const history = useHistory();

  useEffect(() => {
    document.title = intl.formatMessage({ id: "global.appName" }) + " - " + intl.formatMessage({ id: "global.buildings" });
  }, [intl]);

  const { sortedBuildings, folderName } = useSelector((state: RootState) => {
    return state.game || {};
  });

  const listRef = useRef<FixedSizeList<Building>>(null);
  const scrollTo = (building: Building | null) => {
    if (listRef && listRef.current && building) {
      listRef.current.scrollToItem(sortedBuildings?.indexOf(building) ?? 0, "start");
    }
  };

  const Row = ({ index, isScrolling, style }: ListChildComponentProps<Building>) => {
    const building: Building | null = sortedBuildings ? sortedBuildings[index] : null;
    return building ? (
      <>
        <ListItem style={style} key={index} disablePadding>
          <ListItemButton onClick={(event) => history.push(intl.formatMessage({ id: "routes.building" }) + "/" + building.name)}>
            {folderName && building.sprite && (
              <ListItemAvatar>
                <Avatar src={getImageUrl(folderName, building.sprite)} variant="square" />
              </ListItemAvatar>
            )}
            <ListItemText primary={isScrolling ? "Scrolling" : sortedBuildings ? localize(building) : ""} />
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
            title={intl.formatMessage({ id: "global.buildings" })}
            titleTypographyProps={{ variant: "h4" }}
            action={
              <Autocomplete
                style={{ minWidth: "300px" }}
                disableListWrap
                options={sortedBuildings ?? []}
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
          {sortedBuildings && (
            <CardContent style={{ height: "calc(100% - 120px)", width: "calc(100% - 32px)" }}>
              <AutoSizer>
                {({ height, width }) => (
                  <FixedSizeList ref={listRef} height={height - 24} width={width} itemCount={sortedBuildings?.length} itemSize={50}>
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

export default Buildings;

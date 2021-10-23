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
import { MissionsTree } from "types";
import { localize } from "../../utils/localisations.utils";

const MissionsTrees: React.FC<void> = () => {
  const intl = useIntl();
  const history = useHistory();

  useEffect(() => {
    document.title = intl.formatMessage({ id: "global.name" }) + " - " + intl.formatMessage({ id: "global.missionsTrees" });
  }, [intl]);

  const { sortedMissionsTrees } = useSelector((state: RootState) => {
    return state.game || {};
  });

  const listRef = useRef<FixedSizeList<MissionsTree>>(null);
  const scrollTo = (missionsTree: MissionsTree | null) => {
    if (listRef && listRef.current && missionsTree) {
      listRef.current.scrollToItem(sortedMissionsTrees?.indexOf(missionsTree) ?? 0, "start");
    }
  };

  const Row = ({ index, isScrolling, style }: ListChildComponentProps<MissionsTree>) => {
    const missionsTree: MissionsTree | null = sortedMissionsTrees ? sortedMissionsTrees[index] : null;
    return missionsTree ? (
      <>
        <ListItem style={style} key={index} disablePadding>
          <ListItemButton onClick={(event) => history.push(intl.formatMessage({ id: "routes.missionsTree" }) + "/" + missionsTree.name)}>
            <ListItemText primary={isScrolling ? "Scrolling" : sortedMissionsTrees ? missionsTree.name : ""} />
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
        <Card style={{ height: "100%" }}>
          <CardHeader
            title={intl.formatMessage({ id: "global.missionsTrees" })}
            titleTypographyProps={{ variant: "h4" }}
            action={
              <Autocomplete
                style={{ minWidth: "300px" }}
                disableListWrap
                options={sortedMissionsTrees ?? []}
                onChange={(event, value) => scrollTo(value)}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.name === value.name}
                renderInput={(params) => <TextField {...params} variant="filled" label={intl.formatMessage({ id: "global.search" })} />}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.name}>
                      {option.name}
                    </li>
                  );
                }}
              />
            }
          />
          {sortedMissionsTrees && (
            <CardContent style={{ height: "calc(100% - 120px)", width: "calc(100% - 32px)" }}>
              <AutoSizer>
                {({ height, width }) => (
                  <FixedSizeList ref={listRef} height={height - 24} width={width} itemCount={sortedMissionsTrees?.length} itemSize={50}>
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

export default MissionsTrees;

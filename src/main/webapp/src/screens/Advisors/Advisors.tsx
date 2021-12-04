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
import { Advisor } from "types";
import { getImageUrl } from "../../utils/global.utils";
import { localize } from "../../utils/localisations.utils";

const Advisors: React.FC<void> = () => {
  const intl = useIntl();
  const history = useHistory();

  useEffect(() => {
    document.title = intl.formatMessage({ id: "global.appName" }) + " - " + intl.formatMessage({ id: "global.advisors" });
  }, [intl]);

  const { sortedAdvisors, folderName } = useSelector((state: RootState) => {
    return state.game || {};
  });

  const listRef = useRef<FixedSizeList<Advisor>>(null);
  const scrollTo = (advisor: Advisor | null) => {
    if (listRef && listRef.current && advisor) {
      listRef.current.scrollToItem(sortedAdvisors?.indexOf(advisor) ?? 0, "start");
    }
  };

  const Row = ({ index, isScrolling, style }: ListChildComponentProps<Advisor>) => {
    const advisor: Advisor | null = sortedAdvisors ? sortedAdvisors[index] : null;
    return advisor ? (
      <>
        <ListItem style={style} key={index} disablePadding>
          <ListItemButton onClick={(event) => history.push(intl.formatMessage({ id: "routes.advisor" }) + "/" + advisor.name)}>
            {folderName && advisor.sprite && (
              <ListItemAvatar>
                <Avatar src={getImageUrl(folderName, advisor.sprite)} variant="square" />
              </ListItemAvatar>
            )}
            <ListItemText primary={isScrolling ? "Scrolling" : sortedAdvisors ? localize(advisor) : ""} />
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
            title={intl.formatMessage({ id: "global.advisors" })}
            titleTypographyProps={{ variant: "h4" }}
            action={
              <Autocomplete
                style={{ minWidth: "300px" }}
                disableListWrap
                options={sortedAdvisors ?? []}
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
          {sortedAdvisors && (
            <CardContent style={{ height: "calc(100% - 120px)", width: "calc(100% - 32px)" }}>
              <AutoSizer>
                {({ height, width }) => (
                  <FixedSizeList ref={listRef} height={height - 24} width={width} itemCount={sortedAdvisors?.length} itemSize={50}>
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

export default Advisors;

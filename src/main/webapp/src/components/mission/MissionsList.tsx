import { KeyboardArrowRight } from "@mui/icons-material";
import { Autocomplete, Avatar, Card, CardContent, CardHeader, ListItem, ListItemAvatar, ListItemButton, ListItemText, TextField } from "@mui/material";
import React, { useRef } from "react";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { Mission } from "types";
import { localize } from "utils/localisations.utils";
import { getImageUrl } from "utils/global.utils";

interface Props {
  missions: Array<Mission>;
  folderName: string | null;
  inline?: boolean;
}

const MissionsList = ({ missions, folderName, inline = false }: Props) => {
  const intl = useIntl();
  const history = useHistory();

  const listRef = useRef<FixedSizeList<Mission>>(null);
  const scrollTo = (mission: Mission | null) => {
    if (listRef && listRef.current && mission) {
      listRef.current.scrollToItem(missions?.indexOf(mission) ?? 0, "start");
    }
  };

  const Row = ({ index, isScrolling, style }: ListChildComponentProps<Mission>) => {
    const mission: Mission | null = missions ? missions[index] : null;
    return mission ? (
      <>
        <ListItem style={style} key={index} disablePadding>
          <ListItemButton onClick={(event) => history.push(intl.formatMessage({ id: "routes.mission" }) + "/" + mission.name)}>
            {folderName && mission.iconFile && (
              <ListItemAvatar>
                <Avatar src={`${getImageUrl(folderName, mission.iconFile)}?${Date.now()}`} />
              </ListItemAvatar>
            )}
            <ListItemText primary={isScrolling ? "Scrolling" : missions ? localize(mission) : ""} />
            <KeyboardArrowRight />
          </ListItemButton>
        </ListItem>
      </>
    ) : (
      <></>
    );
  };

  return (
    <Card elevation={inline ? 0 : 1} style={{ height: "100%" }}>
      <CardHeader
        title={intl.formatMessage({ id: "global.missions" })}
        titleTypographyProps={{ variant: "h4" }}
        action={
          !inline && (
            <Autocomplete
              style={{ minWidth: "300px" }}
              disableListWrap
              options={missions ?? []}
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
          )
        }
      />
      {missions && (
        <CardContent style={{ height: inline ? "100%" : "calc(100% - 120px)", width: inline ? "" : "calc(100% - 32px)" }}>
          <AutoSizer style={{ height: inline ? missions.length * 56 : "" }}>
            {({ height, width }) => (
              <FixedSizeList ref={listRef} height={height - (inline ? 0 : 24)} width={width} itemCount={missions.length} itemSize={50}>
                {Row}
              </FixedSizeList>
            )}
          </AutoSizer>
        </CardContent>
      )}
    </Card>
  );
};

export default MissionsList;

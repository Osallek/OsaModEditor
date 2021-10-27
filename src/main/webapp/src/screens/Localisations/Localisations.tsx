import { Clear, Done, Help, KeyboardArrowRight, MoreVert } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select/SelectInput";
import { BackTitle } from "components/global";
import { VirtualizedLocalizationsAutocomplete } from "components/localisation";
import React, { useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { RootState } from "store/types";
import { Eu4Language, KeyLocalizations } from "types";

const Localisations: React.FC<void> = () => {
  const intl = useIntl();
  const history = useHistory();

  useEffect(() => {
    document.title = intl.formatMessage({ id: "global.name" }) + " - " + intl.formatMessage({ id: "global.localisations" });
  }, [intl]);

  const { sortedLocalisations } = useSelector((state: RootState) => {
    return state.game || {};
  });

  const [localisations, setLocalisations] = useState<Array<KeyLocalizations>>(sortedLocalisations ?? []);
  const [filter, setFilter] = useState<string>("");
  const [anchorMore, setAnchorMore] = React.useState<null | HTMLElement>(null);
  const moreOpen = Boolean(anchorMore);

  const listRef = useRef<FixedSizeList<KeyLocalizations>>(null);
  const scrollTo = (localisation: KeyLocalizations | null) => {
    if (listRef && listRef.current && localisation) {
      listRef.current.scrollToItem(localisations.indexOf(localisation) ?? 0, "start");
    }
  };

  useEffect(() => {
    if (filter) {
      setLocalisations(sortedLocalisations.filter((localisation) => !localisation[filter as keyof typeof localisation]));
    } else {
      setLocalisations(sortedLocalisations);
    }
  }, [sortedLocalisations, filter]);

  const Row = ({ index, style }: ListChildComponentProps<KeyLocalizations>) => {
    const localisation: KeyLocalizations | null = localisations ? localisations[index] : null;

    return localisation ? (
      <>
        <ListItem style={style} key={index} disablePadding secondaryAction={<KeyboardArrowRight />}>
          <ListItemButton onClick={(event) => history.push(intl.formatMessage({ id: "routes.localisation" }) + "/" + localisation.name)}>
            <ListItemText primary={localisation ? localisation.name : ""} style={{ flex: "0 1 auto", marginRight: "8px" }} />
            {Object.values(Eu4Language).map((value) => (
              <Chip
                key={"chip-" + value + "-" + localisation.name}
                label={intl.formatMessage({ id: "global." + value })}
                icon={localisation[value] ? <Done /> : <Clear />}
                color={localisation[value] ? "success" : "error"}
                style={{ margin: "0 8px" }}
              />
            ))}
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
            title={intl.formatMessage({ id: "global.localisations" })}
            titleTypographyProps={{ variant: "h4" }}
            action={
              <Grid container spacing={2}>
                <Grid item>
                  <FormControl style={{ minWidth: "300px" }}>
                    <InputLabel id="localisations-filter">{intl.formatMessage({ id: "localisation.filter" })}</InputLabel>
                    <Select
                      labelId="localisations-filter"
                      label={intl.formatMessage({ id: "localisation.filter" })}
                      value={filter}
                      onChange={(event: SelectChangeEvent) => {
                        if ((event.target.value as string) !== filter) {
                          setFilter(event.target.value as string);
                        }
                      }}
                      endAdornment={
                        filter && (
                          <IconButton onClick={() => setFilter("")} style={{ marginRight: "4px" }}>
                            <Clear />
                          </IconButton>
                        )
                      }
                    >
                      {Object.values(Eu4Language).map((value) => (
                        <MenuItem value={value} key={"localisation-filter-" + value}>
                          {intl.formatMessage({ id: "global." + value })}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <VirtualizedLocalizationsAutocomplete values={localisations} onChange={(value) => scrollTo(value)} />
                </Grid>
                <Grid item style={{ alignSelf: "center" }}>
                  <IconButton style={{ color: "black" }} onClick={(event) => setAnchorMore(event.currentTarget)}>
                    <MoreVert fontSize="large" />
                  </IconButton>
                  <Menu anchorEl={anchorMore} open={moreOpen} onClose={() => setAnchorMore(null)}>
                    <MenuItem onClick={() => setAnchorMore(null)}>
                      {intl.formatMessage({ id: "localisation.generate" })}
                      <Tooltip title={intl.formatMessage({ id: "localisation.generate.tooltip" })}>
                        <Help fontSize="small" style={{ marginLeft: "4px" }} color="action" />
                      </Tooltip>
                    </MenuItem>
                    {Object.values(Eu4Language)
                      .filter((value) => Eu4Language.ENGLISH !== value)
                      .map((value) => (
                        <MenuItem key={"localisation-copy-" + value} onClick={() => setAnchorMore(null)}>
                          {intl.formatMessage(
                            { id: "localisation.copy" },
                            {
                              from: intl.formatMessage({ id: "localisation." + value }),
                              to: intl.formatMessage({ id: "localisation.english" }),
                            }
                          )}
                        </MenuItem>
                      ))}
                  </Menu>
                </Grid>
              </Grid>
            }
          />
          {
            <CardContent style={{ height: "calc(100% - 120px)", width: "calc(100% - 32px)" }}>
              <AutoSizer>
                {({ height, width }) => (
                  <FixedSizeList ref={listRef} height={height - 24} width={width} itemCount={localisations.length} itemSize={50}>
                    {Row}
                  </FixedSizeList>
                )}
              </AutoSizer>
            </CardContent>
          }
        </Card>
      </Grid>
      <Grid item xs />
    </Grid>
  );
};

export default Localisations;

import { Clear, Done, Help, KeyboardArrowRight, MoreVert, Warning } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Select,
  Switch,
  Tooltip,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select/SelectInput";
import { BackTitle } from "components/global";
import { VirtualizedLocalizationsAutocomplete } from "components/localisation";
import { useEventSnackbar } from 'hooks/snackbar.hooks';
import React, { useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import actions from 'store/actions';
import { RootState } from "store/types";
import { Eu4Language, ModdedKeyLocalizations, ServerSuccesses } from "types";

const Localisations: React.FC<void> = () => {
  const intl = useIntl();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = intl.formatMessage({ id: "global.name" }) + " - " + intl.formatMessage({ id: "global.localisations" });
  }, [intl]);

  const { sortedLocalisations } = useSelector((state: RootState) => {
    return state.game || {};
  });

  const [localisations, setLocalisations] = useState<Array<ModdedKeyLocalizations>>(sortedLocalisations ?? []);
  const [filter, setFilter] = useState<string>("");
  const [modded, setModded] = useState<boolean>(false);
  const [anchorMore, setAnchorMore] = React.useState<null | HTMLElement>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const moreOpen = Boolean(anchorMore);
  const [loadingGenerate, submitGenerate] = useEventSnackbar(async () => {
    await dispatch(actions.location.missing());
  }, `api.success.${ ServerSuccesses.DEFAULT_SUCCESS }`);

  const listRef = useRef<FixedSizeList<ModdedKeyLocalizations>>(null);
  const scrollTo = (localisation: ModdedKeyLocalizations | null) => {
    if (listRef && listRef.current && localisation) {
      listRef.current.scrollToItem(localisations.indexOf(localisation) ?? 0, "start");
    }
  };

  const handleGenerate = async () => {
    if (!loading) {
      setAnchorMore(null);
      await submitGenerate();
    }
  }

  useEffect(() => {
    setLocalisations(sortedLocalisations.filter((localisation) => {
      if (modded && !localisation.modded) {
        return false;
      }

      if (filter && localisation[filter as keyof typeof localisation]) {
        return false;
      }

      return true;
    }));
  }, [sortedLocalisations, filter, modded]);

  useEffect(() => {
    setLoading(loadingGenerate);
  }, [loadingGenerate]);

  const Row = ({ index, style }: ListChildComponentProps<ModdedKeyLocalizations>) => {
    const localisation: ModdedKeyLocalizations | null = localisations ? localisations[index] : null;

    return localisation ? (
      <>
        <ListItem style={ { ...style, backgroundColor: localisation.modded ? "" : "#f3f3f3" } } key={ index } disablePadding
                  secondaryAction={ <KeyboardArrowRight/> }>
          <ListItemButton onClick={ (event) => history.push(intl.formatMessage({ id: "routes.localisation" }) + "/" + localisation.name) }>
            <ListItemText primary={ localisation ? localisation.name : "" } style={ { flex: "0 1 auto", marginRight: "8px" } }/>
            { Object.values(Eu4Language).map((value) => (
              <Chip
                key={ "chip-" + value + "-" + localisation.name }
                label={ intl.formatMessage({ id: "global." + value }) }
                icon={ localisation[value] ? <Done/> : "" === localisation[value] ? <Warning/> : <Clear/> }
                color={ localisation[value] ? "success" : "" === localisation[value] ? "warning" : "error" }
                style={ { margin: "0 8px" } }
              />
            )) }
          </ListItemButton>
        </ListItem>
      </>
    ) : (
      <></>
    );
  };

  return (
    <Grid container spacing={ 2 } style={ { height: "100%" } }>
      <Grid item>
        <BackTitle handleClick={ (event) => history.push(intl.formatMessage({ id: "routes.menu" })) }/>
      </Grid>
      <Grid item xs/>
      <Grid item xs={ 12 } md={ 10 } xl={ 8 } style={ { height: "100%" } }>
        <Card style={ { height: "100%" } }>
          <CardHeader
            title={ intl.formatMessage({ id: "global.localisations" }) }
            titleTypographyProps={ { variant: "h4" } }
            action={
              <Grid container alignItems="center" spacing={ 2 }>
                <Grid item>
                  <FormControlLabel
                    label={ intl.formatMessage({ id: "global.onlyModded" }) }
                    labelPlacement="start"
                    control={
                      <Switch
                        checked={ modded }
                        onChange={ (event: React.ChangeEvent<HTMLInputElement>) => {
                          setModded(event.target.checked);
                        } }
                      />
                    }
                  />
                </Grid>
                <Grid item>
                  <FormControl style={ { minWidth: "300px" } }>
                    <InputLabel id="localisations-filter">{ intl.formatMessage({ id: "localisation.filter" }) }</InputLabel>
                    <Select
                      labelId="localisations-filter"
                      label={ intl.formatMessage({ id: "localisation.filter" }) }
                      value={ filter }
                      onChange={ (event: SelectChangeEvent) => {
                        if ((event.target.value as string) !== filter) {
                          setFilter(event.target.value as string);
                        }
                      } }
                      endAdornment={
                        filter && (
                          <IconButton onClick={ () => setFilter("") } style={ { marginRight: "4px" } }>
                            <Clear/>
                          </IconButton>
                        )
                      }
                    >
                      { Object.values(Eu4Language).map((value) => (
                        <MenuItem value={ value } key={ "localisation-filter-" + value }>
                          { intl.formatMessage({ id: "global." + value }) }
                        </MenuItem>
                      )) }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <VirtualizedLocalizationsAutocomplete values={ localisations } onChange={ (value) => scrollTo(value) }/>
                </Grid>
                <Grid item style={ { alignSelf: "center" } }>
                  <IconButton style={ { color: "black" } } onClick={ (event) => setAnchorMore(event.currentTarget) }>
                    <MoreVert fontSize="large"/>
                  </IconButton>
                  <Menu anchorEl={ anchorMore } open={ moreOpen } onClose={ () => setAnchorMore(null) }>
                    <MenuItem onClick={ () => handleGenerate() }>
                      { intl.formatMessage({ id: "localisation.generate" }) }
                      <Tooltip title={ intl.formatMessage({ id: "localisation.generate.tooltip" }) }>
                        <Help fontSize="small" style={ { marginLeft: "4px" } } color="action"/>
                      </Tooltip>
                    </MenuItem>
                    { Object.values(Eu4Language)
                      .filter((value) => Eu4Language.ENGLISH !== value)
                      .map((value) => (
                        <MenuItem key={ "localisation-copy-" + value } onClick={ () => setAnchorMore(null) }>
                          { intl.formatMessage(
                            { id: "localisation.copy" },
                            {
                              from: intl.formatMessage({ id: "localisation." + value }),
                              to: intl.formatMessage({ id: "localisation.english" }),
                            }
                          ) }
                        </MenuItem>
                      )) }
                  </Menu>
                </Grid>
              </Grid>
            }
          />
          {
            <CardContent style={ { height: "calc(100% - 120px)", width: "calc(100% - 32px)" } }>
              <AutoSizer>
                { ({ height, width }) => (
                  <FixedSizeList ref={ listRef } height={ height - 24 } width={ width } itemCount={ localisations.length } itemSize={ 50 }>
                    { Row }
                  </FixedSizeList>
                ) }
              </AutoSizer>
            </CardContent>
          }
        </Card>
      </Grid>
      <Grid item xs/>
    </Grid>
  );
};

export default Localisations;

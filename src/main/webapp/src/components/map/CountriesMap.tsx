import { Autocomplete, Grid, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import { SelectChangeEvent } from "@material-ui/core/Select/SelectInput";
import { MobileDatePicker } from "@material-ui/lab";
import Button, { FormControl } from "components/controls";
import { BackTitle } from "components/global";
import { Feature } from "geojson";
import { GeoJSON as LeafletGeoJSON, Layer, LeafletMouseEvent, Path } from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { GeoJSON, MapContainer } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "store/types";
import {
    getProvinceStyle,
    getTargets,
    MapAction,
    mapActions,
    MapActionType,
    MapMod,
    mapMods,
    onClickProvince
} from "utils/map.utils";
import { Localizations, Province } from "../../types";
import { localize } from "../../utils/localisations.utils";
import "./CountriesMap.css";

const CountriesMap: React.FC<void> = () => {
  const intl = useIntl();
  const history = useHistory();
  const dispatch = useDispatch();

  const geoJsonLayerRef = useRef<LeafletGeoJSON<any> | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [mapMod, setMapMod] = useState<MapMod>(MapMod.OWNER);
  const [mapActionType, setMapActionType] = useState<MapActionType>(MapActionType.APPLY_TO_SELECTION);
  const [mapAction, setMapAction] = useState<MapAction>(MapAction.CHANGE_OWNER);
  const [mapActionTargets, setMapActionTargets] = useState<Array<Localizations>>([]);
  const [mapActionTarget, setMapActionTarget] = useState<Localizations | null>(null);
  const [targetLoading, setTargetLoading] = useState<boolean>(false);
  const [selectedProvinces, setSelectedProvinces] = useState<Array<number>>([]);

  const gameState = useSelector((state: RootState) => {
    return state.game || {};
  });

  const onProvinceClick = useCallback(
    (event: LeafletMouseEvent) => {
      const id = event.target.feature.id as number;
      let includes = selectedProvinces.includes(id);
      const { provinces } = gameState;

      if (mapMods[mapMod].canSelect && provinces && provinces[id] && !(provinces[id].ocean || provinces[id].impassable || provinces[id].lake)) {
        if (includes) {
          setSelectedProvinces((prevState) => prevState.filter((value) => value !== id));
        } else {
          setSelectedProvinces((prevState) => [...prevState, id]);
        }

        onClickProvince(id, event.target as Path, mapMod, gameState, !includes);
      } else {
        onClickProvince(id, event.target as Path, mapMod, gameState, false);
      }
    },
    [mapMod, gameState, selectedProvinces]
  );

  const provinceToolTip = useCallback(
    (event: LeafletMouseEvent, layer: Layer) => {
      const id = event.target.feature.id as number;
      const { provinces } = gameState;

      if (provinces) {
        const province = provinces[id] as Province;

        if (!(provinces[id].ocean || provinces[id].impassable || provinces[id].lake)) {
          layer.bindTooltip(localize(mapMods[mapMod].tooltip(province, date, gameState)));
        }
      }
    },
    [mapMod, gameState, date]
  );

  const { startDate, endDate, geoJson } = gameState;
  let minDate = null;
  let maxDate = null;

  if (startDate) {
    minDate = new Date(startDate);
    minDate.setFullYear(startDate.getFullYear() - 100);
  }

  if (endDate) {
    maxDate = new Date(endDate);
    maxDate.setFullYear(endDate.getFullYear() + 100);
  }

  useEffect(() => {
    if (!mapMods[mapMod].canSelect) {
      setSelectedProvinces([]);
    }
  }, [mapMod]);

  useEffect(() => {
    if (geoJsonLayerRef.current) {
      geoJsonLayerRef.current?.getLayers().forEach((layer: Layer) => {
        layer.off("click");

        layer.on({
          click: onProvinceClick,
        });
      });
    }
  }, [mapMod, gameState, onProvinceClick]);

  useEffect(() => {
    if (geoJsonLayerRef.current) {
      geoJsonLayerRef.current?.getLayers().forEach((layer: Layer) => {
        layer.off("mouseover");

        layer.on({
          mouseover: (event) => {
            provinceToolTip(event, layer);
            layer.openTooltip();
          },
        });
      });
    }
  }, [mapMod, gameState, provinceToolTip, date]);

  useEffect(() => {
    if (!mapMods[mapMod].actions.includes(mapAction)) {
      setMapAction(mapMods[mapMod].actions[0]);
    }
  }, [mapMod, gameState]);

  useEffect(() => {
    setMapActionTargets(getTargets(mapAction, gameState));
  }, [mapAction, gameState]);

  useEffect(() => {
    return () => {
      setSelectedProvinces([]);
    };
  }, []);

  const onChangeMapMod = (event: SelectChangeEvent) => {
    const mm = MapMod[event.target.value as keyof typeof MapMod];
    const ma = mapMods[mm].actions[0];
    setMapMod(mm);
    setMapAction(ma);
    setMapActionTargets(getTargets(ma, gameState));
  };

  const provinceStyle = (feature: Feature | undefined) => {
    return getProvinceStyle(feature?.id as number, mapMod, date, gameState, selectedProvinces);
  };

  const onEachProvince = (feature: Feature, layer: Layer) => {
    if (feature.id && gameState.provinces) {
      layer.on({
        click: onProvinceClick,
        mouseover: (event) => {
          provinceToolTip(event, layer);
          layer.openTooltip();
        },
        mouseout: (event) => layer.unbindTooltip(),
      });
    }
  };

  const optionLabel = (localisations: Localizations) => {
    return localize(localisations);
  };

  const optionEquals = (option: Localizations, value: Localizations): boolean => {
    return option.french === value.french && option.english === value.english && option.german === value.german && option.spanish === value.spanish;
  };

  const handleSubmitTarget = async () => {
    if (mapActions[mapAction] && (mapActions[mapAction].noTarget || mapActionTarget)) {
      try {
        setTargetLoading(true);
        await dispatch(mapActions[mapAction].action(selectedProvinces, date, mapActionTarget));
        setSelectedProvinces([]);
      } finally {
        setTargetLoading(false);
      }
    }
  };

  return (
    <Grid container flexDirection="column" style={{ height: "100%", paddingBottom: 12 }}>
      <Grid container alignItems="center" spacing={3} style={{ paddingBottom: 12 }}>
        <Grid item>
          <BackTitle handleClick={(event) => history.push(intl.formatMessage({ id: "routes.menu" }))} />
        </Grid>
        <Grid item>
          <h1>
            <FormattedMessage id="global.map" />
          </h1>
        </Grid>
        <Grid item xs={6} md={3} lg={2}>
          <FormControl variant="filled" style={{ width: "100%" }}>
            <InputLabel>{intl.formatMessage({ id: "map.mapMod" })}</InputLabel>
            <Select value={MapMod[mapMod]} onChange={onChangeMapMod} required>
              {Object.keys(MapMod)
                .filter((value) => {
                  return isNaN(Number(value));
                })
                .map((m) => (
                  <MenuItem value={m} key={m}>
                    {intl.formatMessage({ id: "map.mapMod." + m })}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={3} lg={2} xl={1}>
          <MobileDatePicker
            autoFocus
            openTo="year"
            views={["year", "month", "day"]}
            label={intl.formatMessage({ id: "map.date" })}
            defaultCalendarMonth={startDate}
            value={date}
            minDate={minDate}
            maxDate={maxDate}
            allowSameDateSelection
            disableCloseOnSelect
            onChange={() => {}}
            onAccept={(newValue) => {
              setDate(newValue);
            }}
            clearable
            clearText={intl.formatMessage({ id: "global.clear" })}
            okText={intl.formatMessage({ id: "global.ok" })}
            cancelText={intl.formatMessage({ id: "global.cancel" })}
            showToolbar={false}
            renderInput={(params) => {
              return <TextField {...params} disabled style={{ width: "100%" }} variant="outlined" />;
            }}
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3} xl={2}>
          <FormControl variant="filled" style={{ width: "100%" }}>
            <InputLabel>{intl.formatMessage({ id: "map.action.type" })}</InputLabel>
            <Select
              value={MapActionType[mapActionType]}
              onChange={(event: SelectChangeEvent) => {
                setMapActionType(MapActionType[event.target.value as keyof typeof MapActionType]);
              }}
              required
            >
              {Object.keys(MapActionType)
                .filter((value) => {
                  return isNaN(Number(value));
                })
                .map((m) => (
                  <MenuItem value={m} key={m}>
                    {intl.formatMessage({ id: "map.action.type." + m })}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        {MapActionType.APPLY_TO_SELECTION === mapActionType && mapMods[mapMod].actions.length > 0 && (
          <Grid item xs={6} md={4} lg={3} xl={2}>
            <FormControl variant="filled" style={{ width: "100%" }}>
              <InputLabel>{intl.formatMessage({ id: "map.action" })}</InputLabel>
              <Select
                value={MapAction[mapAction]}
                onChange={(event: SelectChangeEvent) => {
                  setMapAction(MapAction[event.target.value as keyof typeof MapAction]);
                }}
                required
              >
                {mapMods[mapMod].actions
                  .map((m) => MapAction[m])
                  .map((m) => (
                    <MenuItem value={m} key={m}>
                      {intl.formatMessage({ id: "map.action." + m })}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
        )}
        {MapActionType.APPLY_TO_SELECTION === mapActionType &&
          ((mapAction && mapActions[mapAction].noTarget) || (mapActionTargets && mapActionTargets.length > 0)) && (
            <>
              {!mapActions[mapAction].noTarget && (
                <Grid item xs={6} md={3} lg={2}>
                  <Autocomplete
                    style={{ width: "100%" }}
                    disableListWrap
                    options={mapActionTargets}
                    onChange={(event, value) => setMapActionTarget(value)}
                    getOptionLabel={optionLabel}
                    isOptionEqualToValue={optionEquals}
                    renderInput={(params) => <TextField {...params} variant="filled" label={intl.formatMessage({ id: "map.action.target" })} />}
                  />
                </Grid>
              )}
              <Grid item justifyContent="center">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleSubmitTarget}
                  disabled={(!mapActions[mapAction].noTarget && mapActionTarget === null) || selectedProvinces.length === 0}
                  messageKey="global.validate"
                  loading={targetLoading}
                />
              </Grid>
            </>
          )}
      </Grid>
      <MapContainer
        style={{ flexGrow: 1, backgroundColor: "lightgray" }}
        zoom={4}
        minZoom={3}
        center={[30, 0]}
        zoomControl={false}
        maxBounds={[
          [-70, -180],
          [70, 180],
        ]}
        maxBoundsViscosity={1.0}
      >
        {geoJson && <GeoJSON data={geoJson} style={provinceStyle} onEachFeature={onEachProvince} ref={geoJsonLayerRef} />}
      </MapContainer>
    </Grid>
  );
};

export default CountriesMap;

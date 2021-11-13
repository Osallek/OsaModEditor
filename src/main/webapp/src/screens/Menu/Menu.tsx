import { Grid } from "@mui/material";
import { GridSize } from "@mui/material/Grid/Grid";
import { GridItem, Title } from "components/global";
import React, { useEffect } from "react";
import { useIntl } from "react-intl";

interface Item {
  xs?: GridSize;
  sm?: GridSize;
  md?: GridSize;
  lg?: GridSize;
  xl?: GridSize;
  link: string;
  text: string;
}

const Menu: React.FC<void> = () => {
  const intl = useIntl();

  const items: Array<Item> = [
    {
      xs: 12,
      sm: 6,
      md: 4,
      lg: 4,
      xl: 3,
      link: intl.formatMessage({ id: "routes.map" }),
      text: intl.formatMessage({ id: "global.map" }),
    },
    {
      xs: 12,
      sm: 6,
      md: 4,
      lg: 4,
      xl: 3,
      link: intl.formatMessage({ id: "routes.defines" }),
      text: intl.formatMessage({ id: "global.defines" }),
    },
    {
      xs: 12,
      sm: 6,
      md: 4,
      lg: 4,
      xl: 3,
      link: intl.formatMessage({ id: "routes.countries" }),
      text: intl.formatMessage({ id: "global.countries" }),
    },
    {
      xs: 12,
      sm: 6,
      md: 4,
      lg: 4,
      xl: 3,
      link: intl.formatMessage({ id: "routes.missions" }),
      text: intl.formatMessage({ id: "global.missions" }),
    },
    {
      xs: 12,
      sm: 6,
      md: 4,
      lg: 4,
      xl: 3,
      link: intl.formatMessage({ id: "routes.missionsTrees" }),
      text: intl.formatMessage({ id: "global.missionsTrees" }),
    },
    {
      xs: 12,
      sm: 6,
      md: 4,
      lg: 4,
      xl: 3,
      link: intl.formatMessage({ id: "routes.localisations" }),
      text: intl.formatMessage({ id: "global.localisations" }),
    },
    {
      xs: 12,
      sm: 6,
      md: 4,
      lg: 4,
      xl: 3,
      link: intl.formatMessage({ id: "routes.advisors" }),
      text: intl.formatMessage({ id: "global.advisors" }),
    },
  ];

  useEffect(() => {
    document.title = intl.formatMessage({ id: "global.name" }) + " - " + intl.formatMessage({ id: "global.menu" });
  }, [intl]);

  return (
    <>
      <Title />
      <Grid container spacing={2}>
        {items &&
          items.map((item, index) => (
            <GridItem key={index} link={item.link} text={item.text} xs={item.xs} sm={item.sm} md={item.md} lg={item.lg} xl={item.xl} />
          ))}
      </Grid>
    </>
  );
};

export default Menu;

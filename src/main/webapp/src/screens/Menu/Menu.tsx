import { Grid } from "@mui/material";
import { GridSize } from "@mui/material/Grid/Grid";
import { GridItem, Title } from "components/global";
import React from "react";
import { useIntl } from "react-intl";

interface Item {
  xs?: GridSize;
  sm?: GridSize;
  md?: GridSize;
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
      xl: 3,
      link: intl.formatMessage({ id: "routes.map" }),
      text: intl.formatMessage({ id: "global.map" }),
    },
    {
      xs: 12,
      sm: 6,
      md: 4,
      xl: 3,
      link: intl.formatMessage({ id: "routes.defines" }),
      text: intl.formatMessage({ id: "global.defines" }),
    },
  ];

  return (
    <div>
      <Title />
      <Grid container spacing={3}>
        {items && items.map((item, index) => <GridItem key={index} link={item.link} text={item.text} xs={item.xs} sm={item.sm} md={item.md} xl={item.xl} />)}
      </Grid>
    </div>
  );
};

export default Menu;

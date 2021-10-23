import { Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material";
import { GridSize } from "@mui/material/Grid/Grid";
import React from "react";
import { useHistory } from "react-router-dom";

interface Props {
  xs?: GridSize;
  sm?: GridSize;
  md?: GridSize;
  lg?: GridSize;
  xl?: GridSize;
  link: string;
  text: string;
}

const GridItem = ({ xs, sm, md, lg, xl, link, text }: Props) => {
  const history = useHistory();

  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
      <Card variant="outlined" style={{ backgroundColor: "#f3f3f3" }}>
        <CardActionArea onClick={() => history.push(link)}>
          <CardContent color="primary">
            <Typography align="center" variant="h3">
              {text}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default GridItem;

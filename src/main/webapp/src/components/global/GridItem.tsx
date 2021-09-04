import { Card, CardActionArea, CardContent, Grid, Typography } from "@material-ui/core";
import { GridSize } from "@material-ui/core/Grid/Grid";
import React from "react";
import { useHistory } from "react-router-dom";

interface Props {
  xs?: GridSize;
  sm?: GridSize;
  md?: GridSize;
  xl?: GridSize;
  link: string;
  text: string;
}

const GridItem = ({ xs, sm, md, xl, link, text }: Props) => {
  const history = useHistory();

  return (
    <Grid item xs={xs} sm={sm} md={md} xl={xl}>
      <Card variant="outlined">
        <CardActionArea onClick={() => history.push(link)}>
          <CardContent color="primary">
            <Typography align="center" variant="h2">
              {text}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default GridItem;

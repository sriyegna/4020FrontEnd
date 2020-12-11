import React from "react";
import SingleSelect from "../inputs/select/SingleSelect";
import { Grid, Paper, Box, CircularProgress } from "@material-ui/core";
import USA from "@svg-maps/usa";
import Canada from "@svg-maps/canada";
import MapChart from "./maps/MapChart";
import { MOBILITY_OPTIONS } from "../../utils/constants";
import "./styles.scss";
import { useSelector } from "react-redux";

const ChartPanel = (props) => {
  const { country } = props;
  const [selected, setSelected] = React.useState(MOBILITY_OPTIONS[0]);
  const data = useSelector((state) => state.data.obj);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box display="flex" justifyContent="center">
          <SingleSelect
            options={[...MOBILITY_OPTIONS]}
            label="Metric"
            selected={selected}
            setSelected={setSelected}
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box m={3}>
          <Paper elevation={3}>
            {data ? (
              <MapChart
                country={country}
                map={country === "United States" ? USA : Canada}
                data={data}
                metric={selected}
              />
            ) : (
              <Box display="flex" justifyContent="center">
                <CircularProgress disableShrink />
              </Box>
            )}
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ChartPanel;

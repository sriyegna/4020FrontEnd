import React from "react";
import SingleSelect from "../inputs/select/SingleSelect";
import { Grid, Paper, Box } from "@material-ui/core";
import USA from "@svg-maps/usa";
import Canada from "@svg-maps/canada";
import MapChart from "./maps/MapChart";
import { MOBILITY_OPTIONS } from "../../utils/constants";
import "./styles.scss";
import Server from "../../utils/Server";
import DatePicker from "../datePicker/DatePicker";

const ChartPanel = (props) => {
  const { country } = props;
  const [selected, setSelected] = React.useState(MOBILITY_OPTIONS[0]);
  const [fromDate, setFromDate] = React.useState(
    new Date("2020-03-01T00:00:00")
  );
  const [toDate, setToDate] = React.useState(new Date());
  const [data, setData] = React.useState();

  React.useEffect(() => {
    Server.get(
      `/mobility/apple?countryName=${country}&fromDate=${fromDate}&toDate=${toDate}`
    )
      .then((response) => {
        setData(response.data);
        // updateCountry(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [country]);

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
        <Box display="flex" justifyContent="center">
          <Box mx={1}>
            <DatePicker label="From" date={fromDate} setDate={setFromDate} />
          </Box>
          <Box mx={1}>
            <DatePicker label="To" date={toDate} setDate={setToDate} />
          </Box>
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
              "Loading"
            )}
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ChartPanel;

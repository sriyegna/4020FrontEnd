import React from "react";
import MultiSelect from "../inputs/select/MultiSelect";
import { Grid, Button, Box } from "@material-ui/core";
import Search from "../inputs/search/Search";
import CovidTable from "../covidTable/CovidTable";
import DatePicker from "../datePicker/DatePicker";
import { MOBILITY_OPTIONS } from "../../utils/constants";
import Server from "../../utils/Server";

const TablePanel = (props) => {
  const { changeCountry, country } = props;

  const [selectedMobility, setSelectedMobility] = React.useState([
    ...MOBILITY_OPTIONS,
  ]);

  const [fromDate, setFromDate] = React.useState(
    new Date("2020-03-01T00:00:00")
  );
  const [toDate, setToDate] = React.useState(new Date());

  const [search, setSearch] = React.useState("");

  const [data, setData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);

  const updateCountry = (response) => {
    const data = [];
    for (const [key, value] of Object.entries(response)) {
      data.push({
        region: key,
        driving: value.driving,
        "public transit": value.transit,
        walking: value.walking,
      });
    }
    setData(data);
  };

  React.useEffect(() => {
    Server.get(
      `/mobility/apple?countryName=${country}&fromDate=${fromDate}&toDate=${toDate}`
    )
      .then((response) => {
        updateCountry(response.data.regions);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [fromDate, toDate, country]);

  React.useEffect(() => {
    setFilteredData(
      data.filter((x) => x.region.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, data]);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" mt={2}>
            <Box mx={1}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => changeCountry("USA")}
              >
                USA
              </Button>
            </Box>
            <Box mx={1}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => changeCountry("CAN")}
              >
                Canada
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <MultiSelect
              options={MOBILITY_OPTIONS}
              label="Mobility"
              selected={selectedMobility}
              setSelected={setSelectedMobility}
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
          <Box display="flex" justifyContent="center" mx={3}>
            <Search search={search} setSearch={setSearch} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box m={2}>
            <CovidTable data={filteredData} options={[...selectedMobility]} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default TablePanel;

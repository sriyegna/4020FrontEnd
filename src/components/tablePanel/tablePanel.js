import React from "react";
import MultiSelect from "../inputs/select/MultiSelect";
import { Grid, Button, Box, Typography, Link } from "@material-ui/core";
import Search from "../inputs/search/Search";
import CovidTable from "../covidTable/CovidTable";
import DatePicker from "../datePicker/DatePicker";
import { MOBILITY_OPTIONS } from "../../utils/constants";
import Server from "../../utils/Server";
import { useDispatch, useSelector } from "react-redux";
import {
  setObj,
  setArr,
  clearObj,
  clearArr,
  setLoading,
  clearLoading,
} from "../../redux/actions/mobility";

const TablePanel = (props) => {
  const { changeCountry, country } = props;
  const dispatch = useDispatch();

  const [selectedMobility, setSelectedMobility] = React.useState([
    ...MOBILITY_OPTIONS,
  ]);

  const [fromDate, setFromDate] = React.useState(
    new Date("2020-01-13T00:00:00")
  );
  const [toDate, setToDate] = React.useState(new Date("2020-11-21T00:00:00"));

  const [search, setSearch] = React.useState("");

  // const [data, setData] = React.useState([]);
  const data = useSelector((state) => state.data.arr);
  const loading = useSelector((state) => state.data.loading);
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
    // setData(data);
    dispatch(setArr(data));
  };

  React.useEffect(() => {
    dispatch(clearObj());
    dispatch(clearArr());
    dispatch(setLoading());
    Server.get(
      `/mobility/apple?countryName=${country}&fromDate=${fromDate}&toDate=${toDate}`
    )
      .then((response) => {
        updateCountry(response.data.regions);
        dispatch(setObj(response.data));
        dispatch(clearLoading());
      })
      .catch((e) => {
        console.log(e);
        dispatch(clearArr());
        dispatch(clearObj());
        dispatch(clearLoading());
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
            <CovidTable
              data={filteredData}
              options={[...selectedMobility]}
              loading={loading}
            />
            {!loading ? (
              <>
                {country === "Canada" ? (
                  <Typography align="center" variant="h6">
                    *No data is available for Nunavut*
                  </Typography>
                ) : null}
                <Typography align="center">
                  Data is relative to a base value of 100 taken on 2020/01/13.
                </Typography>
                <Typography align="center">
                  <Link href="https://covid19.apple.com/mobility">
                    *Data is based on Apple Mobility Data.*
                  </Link>
                </Typography>
              </>
            ) : null}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default TablePanel;

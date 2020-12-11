import "./App.css";
import React from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Grid, Box } from "@material-ui/core";
import TablePanel from "./components/tablePanel/tablePanel";
import ChartPanel from "./components/chartPanel/ChartPanel";

function App() {
  const [country, setCountry] = React.useState("Canada");

  const changeCountry = (country) => {
    setCountry(country === "USA" ? "United States" : "Canada");
  };

  return (
    <div>
      <Header />
      <Grid container>
        <Grid item sm={12} md={6}>
          <Box borderRight={2}>
            <TablePanel changeCountry={changeCountry} country={country} />
          </Box>
        </Grid>
        <Grid item sm={12} md={6}>
          <Box>
            <ChartPanel country={country} />
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default App;

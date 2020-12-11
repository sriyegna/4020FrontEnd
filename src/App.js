import "./App.css";
import React from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Grid, Box } from "@material-ui/core";
import TablePanel from "./components/tablePanel/tablePanel";
import ChartPanel from "./components/chartPanel/ChartPanel";
import { Provider } from "react-redux";
import store from "./redux/store";
import ReportPDF from "./assets/Report.pdf";

function App() {
  const [country, setCountry] = React.useState("Canada");

  const changeCountry = (country) => {
    setCountry(country === "USA" ? "United States" : "Canada");
  };

  return (
    <div>
      <Header />
      <Box mt={3}>
        <Provider store={store}>
          <Grid container>
            <Grid item sm={12} md={6}>
              <Box>
                <TablePanel changeCountry={changeCountry} country={country} />
              </Box>
            </Grid>
            <Grid item sm={12} md={6}>
              <Box>
                <ChartPanel country={country} />
              </Box>
            </Grid>
          </Grid>
          <Grid item sm={12}>
            <Box my={3}>
              <embed
                src={ReportPDF}
                type="application/pdf"
                className="iframeClass"
              />
            </Box>
          </Grid>
        </Provider>
      </Box>
      <Footer />
    </div>
  );
}

export default App;

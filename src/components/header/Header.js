import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import About from "../about/About";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 999,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "left",
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              COVID-19 Emissions vs Mobility Visualization
            </Typography>
            <About />
          </Toolbar>
        </AppBar>
      </div>
      <div style={{ visibility: "hidden" }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              COVID-19 Emissions vs Mobility Visualization
            </Typography>
            <About />
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default Header;

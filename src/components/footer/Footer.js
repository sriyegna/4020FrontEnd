import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "left",
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="body1" className={classes.title}>
            Developed for University of Guelph CIS4020 W20
          </Typography>
          <Typography variant="body1">
            Srinath Natarajan, Connor Geddes, Mohit Desai
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Footer;

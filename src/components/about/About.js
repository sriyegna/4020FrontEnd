import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
  Box,
} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";

const About = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <>
      <Button onClick={handleClickOpen} color="inherit">
        About
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">About</DialogTitle>
        <DialogContent dividers={true}>
          <Typography>
            This is a visualization to visualize stuff.... More dummy text....
          </Typography>
          <Box my={2}>
            <TableContainer component={Paper} elevation={3}>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Metric</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Driving</TableCell>
                    <TableCell>Description 1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Public Transit</TableCell>
                    <TableCell>Description 1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Walking</TableCell>
                    <TableCell>Description 1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Emissions</TableCell>
                    <TableCell>Description 1</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Typography variant="subtitle2">
            Developed by Srinath Natarajan, Connor Geddes, Mohit Desai
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default About;

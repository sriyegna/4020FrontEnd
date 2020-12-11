import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const DatePicker = (props) => {
  // The first commit of Material-UI
  const { date, setDate, label } = props;

  const handleDateChange = (date) => {
    setDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
        id="date-picker-inline"
        label={label}
        value={date}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
        minDate={new Date("2020-01-13T00:00:00")}
        maxDate={new Date("2020-11-21T00:00:00")}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;

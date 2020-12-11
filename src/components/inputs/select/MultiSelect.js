import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MultiSelect = (props) => {
  const classes = useStyles();
  const { options, label, selected, setSelected } = props;

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-mutiple-checkbox-label">{label}</InputLabel>
      <Select
        labelId="demo-mutiple-checkbox-label"
        id="demo-mutiple-checkbox"
        multiple
        value={selected}
        onChange={handleChange}
        input={<Input />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            <Checkbox checked={selected.indexOf(option) > -1} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelect;

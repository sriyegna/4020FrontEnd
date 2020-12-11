import React from "react";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import SearchIcon from "@material-ui/icons/Search";

const Search = (props) => {
  const { search, setSearch } = props;

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel htmlFor="standard-adornment">Search</InputLabel>
      <Input
        id="standard-adornment"
        value={search}
        onChange={handleChange}
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default Search;

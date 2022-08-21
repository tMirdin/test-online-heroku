import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";

const Filter = ({ type, setType }) => {
  return (
    <div>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Филтрация</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="all"
          name="radio-buttons-group"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          <FormControlLabel value="all" control={<Radio />} label="All" />
          <FormControlLabel value="Laptop" control={<Radio />} label="Laptop" />
          <FormControlLabel value="Phone" control={<Radio />} label="Phone" />
          <FormControlLabel
            value="Accessories"
            control={<Radio />}
            label="Accessories"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default Filter;

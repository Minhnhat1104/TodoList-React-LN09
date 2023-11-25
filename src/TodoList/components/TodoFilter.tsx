import {
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React, { useContext } from "react";
import { FilterInterface, FilterMode } from "../types";
import { TodoContext } from "./TodoProvider";

interface FilterProps {}

const Filter = (props: FilterProps) => {
  const { filter: value, onFilterChange } = useContext(TodoContext) || {};

  return (
    <>
      <TextField
        value={value?.keyword || ""}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => onFilterChange && onFilterChange(e.target.value, "keyword")}
        size="small"
        placeholder="Type to search..."
      />

      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          value={value?.mode}
          onChange={(
            event: React.ChangeEvent<HTMLInputElement>,
            value: string
          ) => onFilterChange && onFilterChange(value, "mode")}
          name="radio-buttons-group"
          row
        >
          <FormControlLabel
            value={FilterMode.All}
            control={<Radio />}
            label="all"
          />
          <FormControlLabel
            value={FilterMode.Done}
            control={<Radio />}
            label="Done"
          />
          <FormControlLabel
            value={FilterMode.NotDone}
            control={<Radio />}
            label="Not Done"
          />
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default Filter;

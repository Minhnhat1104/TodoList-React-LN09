import {
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React, { useContext } from "react";
import { FilterMode, TodoDispatchType } from "../types";
import { TodoContext } from "./TodoProvider";

interface FilterProps {}

const Filter = (props: FilterProps) => {
  const { filter: value, todoDispatch } = useContext(TodoContext) || {};

  const handleFilterChange = (nVal: any, field: "mode" | "keyword") => {
    const newFilter = {
      ...value,
      [field]: nVal,
    };

    todoDispatch &&
      todoDispatch({
        type: TodoDispatchType.UPDATE_FILTER,
        filter: newFilter,
      });
  };

  return (
    <>
      <TextField
        value={value?.keyword || ""}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) =>
          handleFilterChange && handleFilterChange(e.target.value, "keyword")
        }
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
          ) => handleFilterChange && handleFilterChange(value, "mode")}
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

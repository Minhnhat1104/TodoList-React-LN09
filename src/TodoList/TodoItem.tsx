import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import React from "react";
import { TodoItem } from "./type";

interface TodoItemProps {
  value: TodoItem;
  onChecked: (checked: boolean) => void;
}

const Item = (props: TodoItemProps) => {
  const { onChecked, value } = props;
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={value.checked}
          onChange={(
            event: React.ChangeEvent<HTMLInputElement>,
            checked: boolean
          ) => onChecked(checked)}
        />
      }
      label={value.name}
    />
  );
};

export default Item;

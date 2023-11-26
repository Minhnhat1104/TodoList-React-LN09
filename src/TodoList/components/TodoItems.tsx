import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import React, { useContext } from "react";
import { TodoDispatchType, TodoItem } from "../types";
import { TodoContext } from "./TodoProvider";

interface TodoItemsProps {}

const TodoItems = (props: TodoItemsProps) => {
  const { items, todoDispatch } = useContext(TodoContext) || {};

  const handleCheck = (item: TodoItem, isChecked: boolean) => {
    todoDispatch &&
      todoDispatch({
        type: TodoDispatchType.CHECK,
        data: item,
        isChecked: isChecked,
      });
  };

  return (
    <FormGroup>
      {items?.map((_item: TodoItem, i: number) => (
        <FormControlLabel
          key={_item?.id}
          control={
            <Checkbox
              checked={_item.checked}
              onChange={(
                event: React.ChangeEvent<HTMLInputElement>,
                checked: boolean
              ) => handleCheck(_item, checked)}
            />
          }
          label={_item.name}
        />
      ))}
    </FormGroup>
  );
};

export default TodoItems;

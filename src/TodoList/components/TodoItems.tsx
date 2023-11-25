import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import React from "react";
import { TodoItem } from "../types";
import { getTodoList, updateTodoList } from "../utils";

interface TodoItemsProps {
  items: TodoItem[];
  onRefresh: () => void;
}

const TodoItems = (props: TodoItemsProps) => {
  const { items, onRefresh } = props;

  const handleCheck = (itemId: string, isChecked: boolean) => {
    const items = getTodoList();
    const newItems = items.map((_item: TodoItem) => {
      if (_item.id === itemId) {
        return {
          ..._item,
          checked: isChecked,
        };
      } else {
        return _item;
      }
    });
    updateTodoList(newItems);
    onRefresh();
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
              ) => handleCheck(_item.id, checked)}
            />
          }
          label={_item.name}
        />
      ))}
    </FormGroup>
  );
};

export default TodoItems;

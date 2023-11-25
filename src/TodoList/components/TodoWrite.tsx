import { Add } from "@mui/icons-material";
import { Button, Stack, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { TodoItem } from "../types";
import { generateUuid, getTodoList, updateTodoList } from "../utils";
import { TodoContext } from "./TodoProvider";

interface TodoWriteProps {}

const TodoWrite = (props: TodoWriteProps) => {
  const { onRefresh } = useContext(TodoContext) || {};

  // state
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [addValue, setAddValue] = useState<string>("");

  const handeSave = () => {
    let items = getTodoList();
    const newItems: TodoItem[] = [
      ...items,
      {
        id: generateUuid(),
        checked: false,
        name: addValue,
      },
    ];

    updateTodoList(newItems);
    onRefresh && onRefresh();
    setAddValue("");
    setIsAdding(false);
  };

  return (
    <>
      {!isAdding ? (
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setIsAdding(true)}
        >
          Add
        </Button>
      ) : (
        <Stack spacing={1}>
          <TextField
            size="small"
            placeholder="Type new todo..."
            value={addValue}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setAddValue(e.target.value)}
          />
          <Stack direction="row" justifyContent="flex-end" spacing={1}>
            <Button variant="outlined" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handeSave}>
              Save
            </Button>
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default TodoWrite;

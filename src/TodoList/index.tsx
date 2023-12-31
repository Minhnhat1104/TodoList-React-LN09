import { Box, Stack, Typography, useTheme } from "@mui/material";
import { blue } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { getTodoList } from "./utils";
import { FilterInterface, FilterMode, TodoItem } from "./types";
import TodoFilter from "./components/TodoFilter";
import TodoWrite from "./components/TodoWrite";
import TodoItems from "./components/TodoItems";

const TodoList = () => {
  const theme = useTheme();

  const [renderItems, setRenderItems] = useState<TodoItem[]>([]);
  const [filter, setFilter] = useState<FilterInterface>({
    keyword: "",
    mode: FilterMode.All,
  });

  const refreshItems = () => {
    let items = getTodoList();
    if (filter.keyword !== "") {
      items = items?.filter((_item: TodoItem) =>
        _item?.name?.includes(filter.keyword)
      );
    }

    if (filter.mode === FilterMode.Done) {
      items = items?.filter((_item: TodoItem) => _item?.checked === true);
    } else if (filter.mode === FilterMode.NotDone) {
      items = items?.filter((_item: TodoItem) => _item?.checked === false);
    }

    setRenderItems(items);
  };

  useEffect(() => {
    refreshItems();
  }, [filter]);

  const handleFilterChange = (nVal: any, field: "mode" | "keyword") => {
    setFilter((prev: any) => ({
      ...prev,
      [field]: nVal,
    }));
  };

  return (
    <Box display="flex" width="100%" height="100vh">
      <Stack margin="auto" spacing={1} sx={{ background: blue[100] }} p={2}>
        <Typography variant="h4" textAlign="center">
          Todo List
        </Typography>

        {/* Filter */}
        <TodoFilter value={filter} onChange={handleFilterChange} />

        {/* Todo Items */}
        <TodoItems items={renderItems} onRefresh={refreshItems} />

        {/* Add */}
        <TodoWrite onRefresh={refreshItems} />
      </Stack>
    </Box>
  );
};

export default TodoList;

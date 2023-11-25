import React, { createContext, useEffect, useState } from "react";
import { FilterInterface, FilterMode, TodoItem } from "../types";
import { getTodoList } from "../utils";

interface TodoProviderProps {
  children: any;
}

interface TodoContext {
  items: TodoItem[];
  filter: FilterInterface;
  onRefresh?: () => void;
  onFilterChange?: (nVal: any, field: "mode" | "keyword") => void;
}

export const TodoContext = createContext<TodoContext | null>(null);

const TodoProvider = (props: TodoProviderProps) => {
  const { children } = props;

  const [items, setItems] = useState<TodoItem[]>([]);
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

    setItems(items);
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
    <TodoContext.Provider
      value={{
        items,
        filter,
        onRefresh: refreshItems,
        onFilterChange: handleFilterChange,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;

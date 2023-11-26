import React, { createContext, useEffect, useReducer } from "react";
import {
  TodoActionInterface,
  FilterInterface,
  FilterMode,
  TodoItem,
  TodoDispatchType,
  TodoStateInterface,
} from "../types";
import { generateUuid, getTodoList, updateTodoList } from "../utils";

interface TodoProviderProps {
  children: any;
}

interface TodoContextInterface {
  items: TodoItem[];
  filter: FilterInterface;
  todoDispatch?: (action: TodoActionInterface) => void;
  onFilterChange?: (nVal: any, field: "mode" | "keyword") => void;
}

const handleRefresh = (filter?: FilterInterface) => {
  let items = getTodoList();
  if (filter?.keyword !== "") {
    items = items?.filter((_item: TodoItem) =>
      _item?.name?.includes(filter?.keyword || "")
    );
  }

  if (filter?.mode === FilterMode.Done) {
    items = items?.filter((_item: TodoItem) => _item?.checked === true);
  } else if (filter?.mode === FilterMode.NotDone) {
    items = items?.filter((_item: TodoItem) => _item?.checked === false);
  }

  return items;
};

const todoReducer = (
  state: TodoStateInterface,
  action: TodoActionInterface
): TodoStateInterface => {
  if (action.type === TodoDispatchType.ADD) {
    let items = getTodoList();
    const newItems: TodoItem[] = [
      ...items,
      {
        id: generateUuid(),
        checked: false,
        name: action.addValue || "",
      },
    ];

    updateTodoList(newItems);
    return {
      ...state,
      items: handleRefresh(state.filter),
    };
  } else if (action.type === TodoDispatchType.CHECK) {
    const items = getTodoList();
    const newItems = items.map((_item: TodoItem) => {
      if (_item.id === action.data?.id) {
        return {
          ..._item,
          checked: action?.isChecked || false,
        };
      } else {
        return _item;
      }
    });
    updateTodoList(newItems);
    return {
      ...state,
      items: handleRefresh(state.filter),
    };
  } else if (action.type === TodoDispatchType.REFRESH) {
    return {
      ...state,
      items: handleRefresh(state.filter),
    };
  } else if (action.type === TodoDispatchType.UPDATE_FILTER && action.filter) {
    return {
      items: handleRefresh(action.filter),
      filter: action.filter,
    };
  }

  return {
    items: [],
    filter: filterDefaultValue,
  };
};

export const TodoContext = createContext<TodoContextInterface | null>(null);

const filterDefaultValue: FilterInterface = {
  keyword: "",
  mode: FilterMode.All,
};

const TodoProvider = (props: TodoProviderProps) => {
  const { children } = props;

  const defaultValue: TodoStateInterface = {
    items: [],
    filter: filterDefaultValue,
  };
  const [todoState, todoDispatch] = useReducer(todoReducer, defaultValue);

  useEffect(() => {
    todoDispatch({
      type: TodoDispatchType.REFRESH,
    });
  }, []);

  return (
    <TodoContext.Provider
      value={{
        items: todoState.items,
        filter: todoState.filter,
        todoDispatch: todoDispatch,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;

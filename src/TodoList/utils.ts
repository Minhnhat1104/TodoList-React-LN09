import { KEY_LOCALSTORAGE_TODO_LIST } from "./constant";

export const getTodoList = () => {
  const todoListJSON = localStorage.getItem(KEY_LOCALSTORAGE_TODO_LIST);
  let newItems = todoListJSON ? JSON.parse(todoListJSON) : [];

  return newItems;
};

export const updateTodoList = (items: any[]) => {
  localStorage.setItem(KEY_LOCALSTORAGE_TODO_LIST, JSON.stringify(items));
};

import { KEY_LOCALSTORAGE_TODO_LIST } from "../constants";
import { v4 as uuidv4 } from "uuid";

export const getTodoList = () => {
  const todoListJSON = localStorage.getItem(KEY_LOCALSTORAGE_TODO_LIST);
  let newItems = todoListJSON ? JSON.parse(todoListJSON) : [];

  return newItems;
};

export const updateTodoList = (items: any[]) => {
  localStorage.setItem(KEY_LOCALSTORAGE_TODO_LIST, JSON.stringify(items));
};

export const generateUuid = () => {
  return uuidv4();
};

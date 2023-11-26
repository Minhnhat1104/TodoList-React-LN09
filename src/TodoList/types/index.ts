export enum FilterMode {
  All = "All",
  Done = "Done",
  NotDone = "NotDone",
}

export interface TodoItem {
  checked: boolean;
  name: string;
  id: string;
}

export interface FilterInterface {
  keyword?: string;
  mode?: FilterMode;
}

export interface TodoStateInterface {
  filter: FilterInterface;
  items: TodoItem[];
}

export enum TodoDispatchType {
  ADD = "ADD",
  CHECK = "CHECK",
  REFRESH = "REFRESH",
  UPDATE_FILTER = "UPDATE_FILTER",
}

export interface TodoActionInterface {
  type: TodoDispatchType;
  data?: TodoItem;
  isChecked?: boolean; // for update checked
  addValue?: string; // for create new
  filter?: FilterInterface; // for update Filter
}

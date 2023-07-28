import { Dispatch, createContext } from "react";

export type Task = {
  text: string;
  id: string;
  done: boolean;
};
type AddAction = {
  type: "add";
  payload: {
    id: string;
    text: string;
  };
};
type DeleteAction = {
  type: "delete";
  payload: {
    id: string;
  };
};
type EditAction = {
  type: "edit";
  payload: {
    text: string;
    id: string;
  };
};

type UpdateAction = {
  type: "updateStatus";
  payload: {
    id: string;
    status: boolean;
  };
};
type Action = AddAction | EditAction | DeleteAction | UpdateAction;
export function taskReducer(tasks: Task[], action: Action): Task[] {
  switch (action.type) {
    case "add":
      return [
        ...tasks,
        {
          text: action.payload.text,
          id: action.payload.id,
          done: false,
        },
      ];
    case "delete":
      return tasks.filter((task) => task.id != action.payload.id);
    case "edit":
      return tasks.map((task) => {
        if (task.id == action.payload.id) {
          return {
            text: action.payload.text,
            id: task.id,
            done: false,
          };
        } else {
          return task;
        }
      });
    case "updateStatus":
      return tasks.map((task) => {
        if (task.id == action.payload.id) {
          return {
            text: task.text,
            id: task.id,
            done: action.payload.status,
          };
        } else {
          return task;
        }
      });
    default:
      throw new Error("Invalid action type");
  }
}
type TodoContext = { taskList: Task[]; dispatch: Dispatch<Action> };
const context = createContext<TodoContext | undefined>(undefined);

export default context;

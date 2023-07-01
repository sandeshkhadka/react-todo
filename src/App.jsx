import { useReducer } from "react";
import Screen from "./components/Screen";
import TodoContext from "./todoContext";

function taskReducer(tasks, action) {
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
    case "edited":
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
        }else {
          return task;
        }
      });
    default:
      throw new Error("Invalid action type");
  }
}
const App = () => {
  const taskReducerHook = useReducer(taskReducer, []);
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <TodoContext.Provider value={taskReducerHook}>
        <Screen />
      </TodoContext.Provider>
    </div>
  );
};

export default App;

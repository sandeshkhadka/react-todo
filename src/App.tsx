import { useReducer } from "react";
import Screen from "./components/Screen";
import context, { taskReducer } from "./todoContext";

const App = () => {
  const [taskList, dispatch] = useReducer(taskReducer, []);
  const taskReducerHook = { taskList, dispatch };
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <context.Provider value={taskReducerHook}>
        <h1 className="text-4xl text-gray-500">React Todo</h1>
        <Screen />
      </context.Provider>
    </div>
  );
};

export default App;

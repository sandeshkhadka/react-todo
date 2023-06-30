import { useContext, useId, useState } from "react";
import Task from "./Task";
import TodoContext from "../todoContext";

const Screen = () => {
  const [taskList, dispatch] = useContext(TodoContext);
  const [id, setId] = useState(0);
  function generateId() {
    const tmp = id;
    setId((id) => id + 1);
    return tmp;
  }
  return (
    <div className="w-1/2 h-1/2 bg-gray-200">
      {taskList
        ? taskList.map((task) => (
            <Task content={task.text} id={task.id} key={task.id} />
          ))
        : null}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const todoText = formData.get("todoInput");
          dispatch({
            type: "add",
            payload: {
              text: todoText,
              id: generateId(),
            },
          });
        }}
      >
        <input type="text" name="todoInput" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Screen;

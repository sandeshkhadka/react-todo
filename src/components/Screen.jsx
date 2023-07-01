import { useContext, useRef, useState } from "react";
import Task from "./Task";
import TodoContext from "../todoContext";

const Screen = () => {
  const [taskList, dispatch] = useContext(TodoContext);
  const [id, setId] = useState(0);
  const todoInput = useRef();
  function generateId() {
    const tmp = id;
    setId((id) => id + 1);
    return tmp;
  }
  return (
    <div className="w-1/2  bg-gray-200">
      {taskList
        ? taskList.map((task) => <Task taskObj={task} key={task.id} />)
        : null}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const todoText = formData.get("todoInput");
          if (todoText) {
            dispatch({
              type: "add",
              payload: {
                text: todoText,
                id: generateId(),
              },
            });
          }
          todoInput.current.value = "";
        }}
      >
        <input type="text" ref={todoInput} name="todoInput" />
        <button
          type="submit"
          className="px-2 text-2xl border border-black cursor-pointer "
        >
          Add
        </button>
      </form>
      <button
        type="button"
        className="text-2xl border border-black px-2 py-1"
        onClick={() => {
          console.log(taskList);
        }}
      >
        LogAll
      </button>
    </div>
  );
};

export default Screen;

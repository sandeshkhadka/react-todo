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
    <div className="w-1/2 py-1 bg-gray-200 h-1/2 flex flex-col-reverse justify-end overflow-auto gap-1">
      <div className="overflow-scroll">
        {taskList
          ? taskList.map((task) => <Task taskObj={task} key={task.id} />)
          : null}
      </div>
      <form
        className="text-2xl px-2 py-1 flex justify-between gap-2"
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
        <input
          type="text"
          ref={todoInput}
          name="todoInput"
          className="basis-5/6"
        />
        <button
          type="submit"
          className="pb-2 pt-1 text-2xl border border-black cursor-pointer basis-1/6"
        >
          Add
        </button>
      </form>
      <button
        type="button"
        className=" hidden text-2xl border border-black px-2 py-1"
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

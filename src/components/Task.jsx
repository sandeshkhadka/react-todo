import { useContext } from "react";
import TodoContext from "../todoContext";

const Task = ({ content, id }) => {
  const [_, dispatch] = useContext(TodoContext);
  return (
    <div className="text-2xl p-2 w-full flex flex-row gap-3">
      <div>
        {content}id={id}
      </div>
      <button
        className="border border-black cursor-pointer"
        type="button"
        onClick={(e) => {
          dispatch({ type: "delete", payload: { id: id } });
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default Task;

import { useContext, useRef, useState } from "react";
import TodoContext from "../todoContext";
const Task = (props) => {
  const { text, id, done } = props.taskObj;
  const [_, dispatch] = useContext(TodoContext);
  const [underEdit, setUnderEdit] = useState(false);
  const [content, setContent] = useState(text);
  const [marked, setMarked] = useState(done);
  const editBox = useRef();
  function handleEditClick() {
    setUnderEdit(true);
  }
  function handleSumbitClick() {
    setUnderEdit(false);
    dispatch({
      type: "edited",
      payload: {
        text: content,
        id: id,
      },
    });
  }
  function handleMark() {
    setMarked(true);
    dispatch({
      type: "updateStatus",
      payload: {
        id: id,
        status: true,
      },
    });
  }
  function handleUnMark() {
    setMarked(false);
    dispatch({
      type: "updateStatus",
      payload: {
        id: id,
        status: false,
      },
    });
  }
  return (
    <div className="text-2xl p-2 w-full flex flex-row gap-3">
      <div
        className={`${underEdit ? "hidden" : ""} ${
          marked ? "line-through" : ""
        }`}
      >
        {content}
      </div>
      <input
        ref={editBox}
        type="text"
        value={content}
        className={underEdit ? "" : "hidden"}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />

      <button
        className={`border border-black cursor-pointer ${
          underEdit ? "hidden" : ""
        }`}
        type="button"
        onClick={() => {
          dispatch({ type: "delete", payload: { id: id } });
        }}
      >
        Delete
      </button>
      <button
        type="button"
        onClick={handleEditClick}
        className={`border border-black cursor-pointer ${
          underEdit || marked ? "hidden" : ""
        }`}
      >
        Edit
      </button>
      <button
        type="button"
        onClick={handleSumbitClick}
        className={`border border-black cursor-pointer ${
          underEdit ? "" : "hidden"
        }`}
      >
        Submit
      </button>
      <button
        type="button"
        className={`border border-black cursor-pointer ${
          marked || underEdit ? "hidden" : ""
        }`}
        onClick={handleMark}
      >
        Mark
      </button>
      <button
        type="button"
        className={`border border-black cursor-pointer ${
          marked ? "" : "hidden"
        }`}
        onClick={handleUnMark}
      >
        Unmark
      </button>
    </div>
  );
};
export default Task;

import spinner from "../../assets/images/spinner.svg";
import { useState } from "react";
import useTodos from "./../../hooks/use-todos";
import {
  MdEditSquare,
  MdDeleteForever,
  MdEditNote,
  MdDoneAll,
  MdRemoveDone,
} from "react-icons/md";
import toast from "react-hot-toast";

const Todo = ({ _id, title, completed }) => {
  const {
    updateTodoTitle,
    updateTodoCompleted,
    deleteUserTodo,
    isUpdateTodoLoading,
    isUpdateTodoCompletedLoading,
    isDeleteTodoLoading,
  } = useTodos();

  const [isEditMode, setIsEditMode] = useState(false);
  const [todoTitle, setTodoTitle] = useState(title);

  const checkTodoTitleLength = () => {
    if (todoTitle.length < 3) {
      toast.error("title must be at least 3 characters");
      setTodoTitle(title);
      return;
    }

    if (todoTitle.length > 10) {
      toast.error("title must be at most 10 characters");
      setTodoTitle(title);
      return;
    }
  };

  const handleEditTodoTitle = async () => {
    setIsEditMode(!isEditMode);

    checkTodoTitleLength();

    if (
      isEditMode &&
      todoTitle !== title &&
      todoTitle.length >= 3 &&
      todoTitle.length <= 10
    ) {
      await updateTodoTitle(_id, todoTitle);
    }

    return;
  };

  const handleEditTodoCompleted = async () => {
    checkTodoTitleLength();

    if (todoTitle.length >= 3 && todoTitle.length <= 10) {
      await updateTodoCompleted(_id, {
        title: todoTitle,
        completed: !completed,
      });
    }

    setIsEditMode(false);
  };

  return (
    <div className="flex items-center justify-between text-center font-semibold  md:text-3xl mb-10 text-white gap-x-4">
      {isEditMode ? (
        <input
          type="text"
          name="title"
          placeholder="Edit Todo Title"
          className="w-full rounded-2xl  p-4 outline-none text-lg font-medium text-purple-700"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
        />
      ) : (
        <p
          className={`${
            completed && "line-through text-yellow-400 transition-all"
          }`}
        >
          {title}
        </p>
      )}

      <div className="flex items-center justify-center gap-x-4">
        <button
          onClick={handleEditTodoTitle}
          className="flex items-center justify-center rounded-full bg-slate-50 text-purple-700 w-[25px] h-[25px] md:w-[40px] md:h-[40px] hover:bg-purple-700 hover:text-slate-50 transition-all"
        >
          {isEditMode ? (
            isUpdateTodoLoading ? (
              <img src={spinner} alt="spinner" />
            ) : (
              <MdEditNote />
            )
          ) : (
            <MdEditSquare />
          )}
        </button>

        <button
          onClick={() => deleteUserTodo(_id)}
          className="flex items-center justify-center rounded-full bg-slate-50 text-purple-700 w-[25px] h-[25px] md:w-[40px] md:h-[40px] hover:bg-purple-700 hover:text-slate-50 transition-all"
        >
          {isDeleteTodoLoading ? (
            <img src={spinner} alt="spinner" />
          ) : (
            <MdDeleteForever />
          )}
        </button>

        <button
          onClick={handleEditTodoCompleted}
          className="flex items-center justify-center rounded-full bg-slate-50 text-purple-700 w-[25px] h-[25px] md:w-[40px] md:h-[40px] hover:bg-purple-700 hover:text-slate-50 transition-all"
        >
          {completed ? (
            isUpdateTodoCompletedLoading ? (
              <img src={spinner} alt="spinner" />
            ) : (
              <MdRemoveDone />
            )
          ) : isUpdateTodoCompletedLoading ? (
            <img src={spinner} alt="spinner" />
          ) : (
            <MdDoneAll />
          )}
        </button>
      </div>
    </div>
  );
};

export default Todo;

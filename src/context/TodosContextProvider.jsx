import { createContext, useState } from "react";
import axios from "../api/axios";
import toast from "react-hot-toast";

export const TodosContext = createContext();

const TodosContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [isGetTodosLoading, setIsGetTodosLoading] = useState(false);
  const [isUpdateTodoLoading, setIsUpdateTodoLoading] = useState(false);
  const [isUpdateTodoCompletedLoading, setIsUpdateTodoCompletedLoading] =
    useState(false);
  const [isDeleteTodoLoading, setIsDeleteTodoLoading] = useState(false);

  const getUserTodos = async () => {
    try {
      setIsGetTodosLoading(true);

      const res = await axios.get("/api/v1/todos", {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      });

      setIsGetTodosLoading(false);

      setTodos(res.data.data.todos);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsGetTodosLoading(false);
    }
  };

  const updateTodoTitle = async (id, title) => {
    try {
      setIsUpdateTodoLoading(true);

      await axios.patch(
        `/api/v1/todos/${id}`,
        {
          title,
        },
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        }
      );

      setIsUpdateTodoLoading(false);

      toast.success("Title Updated Successfully!");

      await getUserTodos();
    } catch (error) {
      toast.error(error.response.data.message);
      setIsUpdateTodoLoading(false);
    }
  };

  const updateTodoCompleted = async (id, todoUpdateData) => {
    try {
      setIsUpdateTodoCompletedLoading(true);

      await axios.patch(`/api/v1/todos/${id}`, todoUpdateData, {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      });

      setIsUpdateTodoCompletedLoading(false);

      toast.success("Done");

      await getUserTodos();
    } catch (error) {
      toast.error(error.response.data.message);
      setIsUpdateTodoCompletedLoading(false);
    }
  };

  const deleteUserTodo = async (id) => {
    try {
      setIsDeleteTodoLoading(true);

      await axios.delete(`/api/v1/todos/${id}`, {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      });

      setIsDeleteTodoLoading(false);

      toast.success("Todo Successfully Deleted!");

      await getUserTodos();
    } catch (error) {
      toast.error(error.response.data.message);
      setIsDeleteTodoLoading(false);
    }
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        getUserTodos,
        isGetTodosLoading,
        isUpdateTodoLoading,
        isUpdateTodoCompletedLoading,
        isDeleteTodoLoading,
        updateTodoTitle,
        updateTodoCompleted,
        deleteUserTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;

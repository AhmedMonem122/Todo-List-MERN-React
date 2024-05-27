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

      console.log(res);

      setIsGetTodosLoading(false);

      setTodos(res.data.data.todos);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsGetTodosLoading(false);
      console.log(error);
    }
  };

  const updateTodoTitle = async (id, title) => {
    try {
      setIsUpdateTodoLoading(true);

      const res = await axios.patch(
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

      console.log(res);

      setIsUpdateTodoLoading(false);

      toast.success("Title Updated Successfully!");

      await getUserTodos();
    } catch (error) {
      toast.error(error.response.data.message);
      setIsUpdateTodoLoading(false);
      console.log(error);
    }
  };

  const updateTodoCompleted = async (id, todoUpdateData) => {
    try {
      setIsUpdateTodoCompletedLoading(true);

      const res = await axios.patch(`/api/v1/todos/${id}`, todoUpdateData, {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      });

      console.log(res);

      setIsUpdateTodoCompletedLoading(false);

      toast.success("Done");

      await getUserTodos();
    } catch (error) {
      toast.error(error.response.data.message);
      setIsUpdateTodoCompletedLoading(false);
      console.log(error);
    }
  };

  const deleteUserTodo = async (id) => {
    try {
      setIsDeleteTodoLoading(true);

      const res = await axios.delete(`/api/v1/todos/${id}`, {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      });

      console.log(res);

      setIsDeleteTodoLoading(false);

      toast.success("Todo Successfully Deleted!");

      await getUserTodos();
    } catch (error) {
      toast.error(error.response.data.message);
      setIsDeleteTodoLoading(false);
      console.log(error);
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

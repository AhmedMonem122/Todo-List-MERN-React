import { useContext } from "react";
import { TodosContext } from "../context/TodosContextProvider";

const useTodos = () => {
  return useContext(TodosContext);
};

export default useTodos;

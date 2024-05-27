import { useEffect } from "react";
import useTodos from "./../../hooks/use-todos";
import Todo from "./Todo";

const Todos = () => {
  const { getUserTodos, todos } = useTodos();

  useEffect(() => {
    getUserTodos();
  }, []);

  return (
    <div className="lg:w-1/2 my-[50px] mx-auto p-[20px] rounded-2xl bg-gradient-to-tl from-[#1c1c5a] to-[#8b8080]">
      {todos.map((todo) => (
        <Todo key={todo._id} {...todo} />
      ))}
    </div>
  );
};

export default Todos;

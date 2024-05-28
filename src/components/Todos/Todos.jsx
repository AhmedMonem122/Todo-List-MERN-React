import { useEffect } from "react";
import useTodos from "./../../hooks/use-todos";
import Todo from "./Todo";
import spinner from "../../assets/images/spinner.svg";

const Todos = () => {
  const { getUserTodos, todos, isGetTodosLoading } = useTodos();

  useEffect(() => {
    getUserTodos();
  }, []);

  return (
    <div
      className={`lg:w-1/2 my-[50px] mx-auto p-[20px] rounded-2xl bg-gradient-to-tl from-[#1c1c5a] to-[#8b8080] text-center font-semibold  md:text-3xl mb-10 text-white ${
        isGetTodosLoading && "!w-fit"
      }`}
    >
      {isGetTodosLoading ? (
        <div className="w-14 text-center flex items-center justify-center">
          <img src={spinner} alt="spinner" className="w-full" />
        </div>
      ) : !todos.length ? (
        <p>There are No Todos Till Now! Did You Add Some? 🤔</p>
      ) : (
        todos.map((todo) => <Todo key={todo._id} {...todo} />)
      )}
    </div>
  );
};

export default Todos;

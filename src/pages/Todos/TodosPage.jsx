import spinner from "../../assets/images/spinner.svg";
import Todos from "../../components/Todos/Todos";
import TodosForm from "../../components/TodosForm/TodosForm";

const TodosPage = () => {
  return (
    <div className="container mx-auto">
      <TodosForm />
      <Todos />
    </div>
  );
};

export default TodosPage;

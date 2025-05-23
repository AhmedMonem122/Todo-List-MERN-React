import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "../../api/axios";
import spinner from "../../assets/images/spinner.svg";
import { useEffect, useState } from "react";
import useTodos from "./../../hooks/use-todos";

const TodosForm = () => {
  const { getUserTodos } = useTodos();

  const [isLoading, setIsLoading] = useState(false);

  const todosSchema = Yup.object({
    title: Yup.string().required("Todo Title is Required").min(3).max(10),
  });

  const handleTodoSubmit = async (formValues) => {
    try {
      setIsLoading(true);

      const res = await axios.post("/api/v1/todos", formValues, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("Authorization"),
        },
      });

      if (res.status === 201) {
        toast.success("Successfully created!");
      }

      setIsLoading(false);

      await getUserTodos();
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(todosSchema),
  });

  const onSubmit = (values) => {
    handleTodoSubmit(values);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="lg:w-1/2 my-[50px] mx-auto p-[20px] rounded-2xl bg-gradient-to-tl from-[#1c1c5a] to-[#8b8080]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center flex-col gap-4"
      >
        <div className="flex items-center justify-between gap-x-4">
          <input
            type="text"
            name="title"
            placeholder="Todo Title"
            className="w-full rounded-2xl  p-4 outline-none text-lg font-medium"
            aria-invalid={errors.title ? "true" : "false"}
            {...register("title")}
          />

          <button
            className="rounded-2xl bg-violet-600 text-white p-4 text-lg text-nowrap font-medium"
            type="submit"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <img src={spinner} alt="spinner" width={24} height={24} />
              </div>
            ) : (
              "Add Todo"
            )}
          </button>
        </div>

        {errors.title && (
          <p className=" text-yellow-400">{errors.title.message}</p>
        )}
      </form>
    </div>
  );
};

export default TodosForm;

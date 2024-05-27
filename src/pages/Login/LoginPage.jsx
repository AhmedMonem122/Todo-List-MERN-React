import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../../api/axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import spinner from "../../assets/images/spinner.svg";
import useAuth from "./../../hooks/use-auth";

const LoginPage = () => {
  const { saveUserData } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const navigate = useNavigate();

  const loginSchema = Yup.object({
    email: Yup.string().required("Email is  Required").email("Invalid Email"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password Must Be More Than 6 Characters")
      .max(15, "Password Must Be Less Than 15 Characters"),
  });

  const handleLoginSubmit = async (formValues) => {
    try {
      setIsLoading(true);

      const res = await axios.post("/api/v1/users/signin", formValues, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(res.data);

      if (res.status === 200) {
        toast.success(
          "Congratulations! Welcome to our Todo List Special Application."
        );

        localStorage.setItem("Authorization", `Bearer ${res.data.data.token}`);

        saveUserData();

        navigate("/todos");
      }

      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (values) => {
    handleLoginSubmit(values);
  };

  return (
    <div className="container mx-auto">
      <div className="lg:w-1/2 my-[50px] mx-auto p-[20px] rounded-2xl bg-gradient-to-tl from-[#1c1c5a] to-[#8b8080]">
        <h3 className="text-center font-semibold  text-3xl mb-10 text-white">
          Login
        </h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-center flex-col gap-4"
        >
          <input
            type="email"
            name="email"
            placeholder="email"
            className="rounded-2xl  p-4 outline-none text-lg font-medium"
            aria-invalid={errors.email ? "true" : "false"}
            {...register("email")}
          />

          {errors.email && (
            <p className=" text-yellow-400">{errors.email.message}</p>
          )}

          <div className="relative">
            <input
              type={`${isShowPassword ? "text" : "password"}`}
              placeholder="Password "
              name="password"
              className="rounded-2xl  outline-none p-4 text-lg font-medium w-full"
              aria-invalid={errors.password ? "true" : "false"}
              {...register("password")}
            />

            <div
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-lg font-medium text-violet-600"
              onClick={() => setIsShowPassword(!isShowPassword)}
            >
              {isShowPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </div>
          </div>

          {errors.password && (
            <p className=" text-yellow-400">{errors.password.message}</p>
          )}

          <button
            className="rounded-2xl bg-violet-600 text-white p-4 text-lg font-medium"
            type="submit"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <img src={spinner} alt="spinner" width={24} height={24} />
              </div>
            ) : (
              "Login"
            )}
          </button>

          <div className="flex items-center justify-end text-white">
            <p className="mr-3">Don&apos;t, have an account yet? make yours.</p>
            <Link to="/">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

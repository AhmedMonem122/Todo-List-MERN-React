import { useForm } from "react-hook-form";
import "../App.css";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "../api/axios";
import { Link } from "react-router-dom";
const Register = () => {
  const { handleSubmit, register } = useForm();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const bodyFormData = new FormData();
  bodyFormData.append("firstName", formData.firstName);
  bodyFormData.append("lastName", formData.lastName);
  bodyFormData.append("email", formData.email);
  bodyFormData.append("password", formData.password);
  const onSubmit = async () => {
    try {
      const res = await axios.post("/api/v1/users/signup", bodyFormData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(res.data);

      if (res.status === 201) {
        toast.success("Successfully created!");

        localStorage.setItem(
          "Authorization",
          `Bearer ${res.data.data.user.token}`
        );
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="w-fit my-[50px] mx-auto p-[20px] rounded-2xl flex items-center justify-center bg-gradient-to-tl from-[#1c1c5a] to-[#8b8080]">
      <div>
        <h3 className="text-center font-semibold  text-3xl mb-10 text-white">
          {" "}
          Registration{" "}
        </h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col   w-96  gap-4"
        >
          <input
            type="text"
            name="firstName"
            placeholder="firstName "
            className="rounded-2xl  p-4 outline-none text-lg font-medium"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="lastName "
            className="rounded-2xl  p-4 outline-none text-lg font-medium"
            value={formData.lastName}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="email "
            className="rounded-2xl  p-4 outline-none text-lg font-medium"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password "
            name="password"
            className="rounded-2xl  outline-none p-4 text-lg font-medium"
            value={formData.password}
            onChange={handleChange}
          />

          <button
            className="rounded-2xl bg-violet-600 text-white p-4 text-lg font-medium"
            type="submit"
          >
            Register
          </button>

          <div className="flex items-center justify-end text-white">
            <p className="mr-3">Already, have an account?</p>
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

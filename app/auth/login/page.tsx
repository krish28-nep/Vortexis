"use client";
import { showNotification } from "@/redux/NotificationSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { FaEyeLowVision } from "react-icons/fa6";
import { useDispatch } from "react-redux";

const loginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: `onChange` });

  const dispatch = useDispatch();

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`,
        data
      );
      reset();
      dispatch(
        showNotification({
          message: "Login Successfullt",
          type: "success",
        })
      );
      if (response) {
        console.log(response);
        localStorage.setItem("token", response.data.token);
        document.cookie = `token=${response.data.token}; path=/;`;
      }
      router.push("/")
    } catch (error) {
      dispatch(
        showNotification({
          message: "Failed to Login Account",
          type: "error",
        })
      );
      console.log(error);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 px-6 py-8 w-1/3 text-xl"
      >
        <h1 className="text-4xl font-bold">Login in to Exclusive</h1>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-2xl font-semibold">
            Email
          </label>
          <input
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
            type="text"
            placeholder="Enter your Email"
            className="border-b-2 focus:outline-none focus:border-b-2 px-2 py-2"
          />
          {errors.email && (
            <span className="text-red-500 text-base">
              {String(errors?.email?.message)}
            </span>
          )}
        </div>
        <div className="flex flex-col relative">
          <label htmlFor="password" className="text-2xl font-semibold">
            Password
          </label>
          <input
            {...register("password", {
              required: "Password is required.",
            })}
            type={showPassword ? "text" : "password"}
            placeholder="Enter your Password"
            className="border-b-2 focus:outline-none focus:border-b-2 px-2 py-2 pr-20 w-full"
          />
          {errors.password && (
            <span className="text-red-500 text-base">
              {String(errors?.password?.message)}
            </span>
          )}
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-10 right-4 cursor-pointer"
          >
            {showPassword ? <FaEye /> : <FaEyeLowVision />}
          </div>
        </div>
        <button
          disabled={isSubmitting}
          className="bg-red-400 px-4 py-2 cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
};
export default loginPage;

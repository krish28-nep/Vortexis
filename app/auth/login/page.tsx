"use client";
import { axiosInstance } from "@/lib/axiosinstance";
import { showNotification } from "@/redux/NotificationSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { FaEyeLowVision } from "react-icons/fa6";
import { useDispatch } from "react-redux";

const LoginPage = () => {
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
      await axiosInstance.post("/auth/login", data, { withCredentials: true });

      dispatch(showNotification({ message: "Login Successful", type: "success" }));
      location.href="/"
    } catch (error: any) {
      dispatch(showNotification({ message: error.response?.data?.error || "Login failed", type: "error" }));
      setError("password", { message: error.response?.data?.error || "Login failed" });
    }
  };


  return (
    <div className="flex h-full w-full items-center justify-center my-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 px-6 py-8 w-1/3 text-xl"
      >
        <h1 className="text-4xl font-bold">Login in to Exclusive</h1>

        <div className="flex flex-col gap-2">
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
        <div className="flex flex-col relative gap-2">
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
export default LoginPage;

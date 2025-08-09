"use client"
import axios from "axios";

import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { showNotification } from "@/redux/NotificationSlice";

const Loginpage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
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
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,data
      );
      console.log(response);
      if(response){
        localStorage.setItem("token", response.data.token);
        document.cookie =`token=${response.data.token}; path=/;`
      }
      dispatch(
        showNotification({
          message:"Login Successfull",
          type:"success"
        })
      )
      router.push("/admin/dashboard");
    } catch (errors) {
      console.log(errors);
    }
  };

  return (
    <div className="flex bg-gradient-to-br from-blue-50 to-indigo-100 flex-col h-screen w-screen justify-center items-center">
      <h1 className="self-center mb-10 subHeading-admin">Admin Sign In</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 bg-white shadow-xl px-10 py-6 rounded-xl text-lg"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            {...register("email")}
            type="text"
            id="email"
            className="px-2 py-1 border rounded-lg"
          />
        </div>
        <div className="flex flex-col relative gap-2">
          <label htmlFor="password">Password</label>
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            id="password"
            className="px-2 py-1 border rounded-lg"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 bottom-2 cursor-pointer"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        <button className="border px-2 py-1 bg-green-500 hover:bg-green-700 cursor-pointer rounded-lg mt-5">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Loginpage;

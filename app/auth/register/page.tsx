"use client";
import { showNotification } from "@/redux/NotificationSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, FieldValues, set } from "react-hook-form";
import { useDispatch } from "react-redux";

const page = () => {
  const router = useRouter();
  const serverUrl =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4000";
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const dispatch = useDispatch();
  const onSubmit = async (data: FieldValues) => {
    try {
      const emailResponse = await axios.post(
        `${serverUrl}/api/users/checkEmail`,
        { email: data.email }
      );

      if (emailResponse.data.userExists) {
        setError("email", { message: emailResponse.data.message });
        return;
      } else {
        await axios.post(`${serverUrl}/auth/register`, {...data, role: "customer"});
        dispatch(
          showNotification({
            message: "Registeration succesfull",
            type: "success",
          })
        );
      }
      router.push("/auth/login")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex h-full w-full justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <h1 className="text-4xl font-bold">Create An Account</h1>
          <h2>Enter Your Details</h2>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Name</label>
          <input {...register("name")} type="text" className="border-2 " />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input {...register("email")} type="text" className="border-2 " />
          {errors.email && (
            <span className="text-base text-red-500">
              {String(errors.email)}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            {...register("password")}
            type="password"
            className="border-2 "
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            {...register("confirmPassword")}
            type="password"
            className="border-2 "
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            {...register("phoneNumber")}
            type="text"
            className="border-2 "
          />
        </div>
        <button>Register</button>
      </form>
    </div>
  );
};

export default page;

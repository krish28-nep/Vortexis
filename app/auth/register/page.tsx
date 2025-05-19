"use client";
import "react-phone-number-input/style.css";
import { showNotification } from "@/redux/NotificationSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, FieldValues, set } from "react-hook-form";
import { useDispatch } from "react-redux";
import PhoneInput from "react-phone-number-input";
import { FcGoogle } from "react-icons/fc";
const page = () => {
  const [number, setNumber] = useState<string | undefined>();

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
        await axios.post(`${serverUrl}/auth/register`, {
          ...data,
          phoneNumber: number,
          role: "customer",
        });
        dispatch(
          showNotification({
            message: "Registeration succesfull",
            type: "success",
          })
        );
      }
      router.push("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex h-full w-full justify-center items-center flex-col py-8">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-4">Create An Account</h1>
          <h2>Enter Your Details</h2>
        </div>
        <div className="flex flex-col gap-1">
          <input
            {...register("name")}
            type="text"
            placeholder="Name"
            className="border-b-2 border-neutral-500 focus:outline-none focus:border-black py-2"
          />
        </div>
        <div className="flex flex-col gap-1">
          <input
            {...register("email")}
            type="text"
            placeholder="Email"
            className="border-b-2 border-neutral-500 focus:outline-none focus:border-black py-2"
          />
          {errors.email && (
            <span className="text-base text-red-500">
              {String(errors.email)}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <input
            {...register("password")}
            placeholder="Password"
            type="password"
            className="border-b-2 border-neutral-500 focus:outline-none focus:border-black py-2"
          />
        </div>
        <div className="flex flex-col gap-1">
          <input
            {...register("confirmPassword")}
            placeholder="Confirm Password"
            type="password"
            className="border-b-2 border-neutral-500 focus:outline-none focus:border-black py-2"
          />
        </div>
        <div className="flex flex-col gap-1">
          <PhoneInput
            value={number}
            onChange={setNumber}
            defaultCountry="NP"
            className="border-b-2 border-neutral-500 focus:outline-none focus:border-black py-2"
          />
        </div>
        <button className="bg-red-500 px-2 py-1 text-xl text-neutral-200 cursor-pointer">
          Create Account
        </button>
        <button className="border-1 px-2 py-1 text-xl flex relative justify-center cursor-pointer">
          <FcGoogle size={30} className="absolute top-1.5 left-2" />
          <h1 className="self-center">Sign Up With Google</h1>
        </button>
      </form>
      <h1 className="m-4 text-xl">Already Have An Account? Login</h1>
    </div>
  );
};

export default page;

"use client";

import { addUser } from "@/lib/api/user";
import { showNotification } from "@/redux/NotificationSlice";
import { UserCreateInput, userCreateSchema } from "@/schema/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const AddUserPage = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCreateInput>({ resolver: zodResolver(userCreateSchema) });

  const { mutate: addUserMutation } = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      reset();
      dispatch(
        showNotification({
          message: "User added successfully",
          type: "success",
        })
      );
    //   router.push('/admin/users')
    },
    onError: () => {
      dispatch(
        showNotification({
          message: "Error adding user",
          type: "error",
        })
      );
    },
  });

  const onSubmit = async (data: UserCreateInput) => {
    addUserMutation(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[1280px] space-y-8">
      <h1 className="heading-admin">Add User</h1>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <input
            {...register("name")}
            type="text"
            placeholder="john doe"
            className="input-field"
          />
          {errors.name && <p className="text-error">{errors.name.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <input
            {...register("email")}
            type="text"
            placeholder="johndoe@example.com"
            className="input-field"
          />
          {errors.email && (
            <p className="text-error">{errors.email.message}</p>
          )}
        </div>
      </div>
      <button className="btn-primary">Save</button>
    </form>
  );
};

export default AddUserPage;

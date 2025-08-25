"use client";

import { updateUser } from "@/lib/api/user";
import { showNotification } from "@/redux/NotificationSlice";
import { userUpdateInput, userUpdateSchema } from "@/schema/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const EditUserPage = () => {
  const { id: userId } = useParams();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<userUpdateInput>({ resolver: zodResolver(userUpdateSchema) });

  const { mutate: updateUserMutation } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", Number(userId)] });
      reset();
      dispatch(
        showNotification({
          message: "User Update successfully",
          type: "success",
        })
      );
      //   router.push('/admin/users')
    },
    onError: () => {
      dispatch(
        showNotification({
          message: "Error update user",
          type: "error",
        })
      );
    },
  });

  const onSubmit = async (data: userUpdateInput) => {
    updateUserMutation(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[1280px] space-y-8">
      <h1 className="heading-admin">Add User</h1>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <input
            {...register("name")}
            type="text"
            placeholder="Name of the User"
            className="input-field"
          />
          {errors.name && <p className="text-error">{errors.name.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <input
            {...register("description")}
            type="text"
            placeholder="Description of the category"
            className="input-field"
          />
          {errors.description && (
            <p className="text-error">{errors.description.message}</p>
          )}
        </div>
      </div>
      <button className="btn-primary">Save</button>
    </form>
  );
};

export default EditUserPage;

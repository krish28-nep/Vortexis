"use client";
import { updateCategory } from "@/lib/api/category";
import { showNotification } from "@/redux/NotificationSlice";
import {
  UpdateCategoryInput,
  updateCategorySchema,
} from "@/schema/category.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const EditCategoryPage = () => {
  const { id: categoryId } = useParams();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateCategoryInput>({
    resolver: zodResolver(updateCategorySchema),
  });

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { mutate: updateCategoryMutation } = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      reset();
      dispatch(
        showNotification({
          message: "Category updated successfully",
          type: "success",
        })
      );
    },
    onError: () => {
      dispatch(
        showNotification({
          message: "Error update category",
          type: "error",
        })
      );
    },
  });

  const onSubmit = async (data: UpdateCategoryInput) => {
    updateCategoryMutation({ id: Number(categoryId), dataToSend: data });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-[1280px] space-y-8"
    >
      <h1 className="heading-admin">Edit Category</h1>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <input
            {...register("name")}
            type="text"
            placeholder="Name of the category"
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
      <button className="btn-primary">Update</button>
    </form>
  );
};

export default EditCategoryPage;

"use client";
import { addCategory } from "@/lib/api/category";
import { showNotification } from "@/redux/NotificationSlice";
import { CategoryInput, categorySchema } from "@/schema/category.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const AddCategoryPage = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryInput>({ resolver: zodResolver(categorySchema) });

  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const router = useRouter();

  const { mutate: addCategoryMutation } = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      reset();
      dispatch(
        showNotification({
          message: "Category added successfully",
          type: "success",
        })
      );
      // router.push("/admin/categories");
    },
    onError: () => {
      dispatch(
        showNotification({
          message: "Error adding category",
          type: "error",
        })
      );
    },
  });

  const onSubmit = async (data: CategoryInput) => {
    addCategoryMutation(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[1280px] space-y-8">
      <h1 className="heading-admin">Add Category</h1>
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
      <button className="btn-primary">Save</button>
    </form>
  );
};

export default AddCategoryPage;

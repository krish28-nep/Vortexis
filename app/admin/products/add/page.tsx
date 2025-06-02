"use client";
import { showNotification } from "@/redux/NotificationSlice";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useDispatch } from "react-redux";

const AddPage = () => {
  const [isFlashSale, setIsFlashSale] = useState(false);
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    register,
    formState: { errors, isSubmitting, isSubmitted },
    reset,
    handleSubmit,
    setError,
    watch,
  } = useForm({ mode: "onChange" });
  const addProductImage = async () => {
    if (!imageFile) {
      setError("image", { message: "Product Image is Required" });
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      const res = await axios.post(`${server}/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/formData",
        },
      });
      console.log(res);
      return res.data.file.path;
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = async (data: FieldValues) => {
    try {
      const imageUrl = await addProductImage();
      const res = await axios.post(`${server}/api/products`, {
        ...data,
        imageUrls: imageUrl,
      });
      dispatch(
        showNotification({
          message: "Products added Succesfully",
          type: "success",
        })
      );
      queryClient.invalidateQueries({ queryKey: ["products"] });
      // reset();
      // router.push("./");
    } catch (e) {
      console.log(e);
      dispatch(
        showNotification({
          message: "Error in Products adding",
          type: "success",
        })
      );
    }
  };

  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-8 px-8 m-auto py-4 border-1 border-neutral-300 shadow-xl flex-col"
      >
        <div className="flex flex-col gap-2">
          <h1 className="subHeading-admin">Add New Products</h1>
          <h2 className="text-neutral-500">
            Fill in the details below to add a new product to your inventory
          </h2>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Product Name *</label>
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            placeholder="Enter product name"
            className="border px-2 py-1 rounded-lg"
          />
          {errors.name && (
            <span className="text-base text-red-500">
              {String(errors?.name?.message)}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            rows={3}
            placeholder="Enter product description"
            className="border px-2 py-1 rounded-lg"
          />
          {errors.description && (
            <span className="text-base text-red-500">
              {String(errors?.description?.message)}
            </span>
          )}
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="price">Price($)</label>
            <input
              {...register("price", { required: "price is required" })}
              type="text"
              placeholder="0.00"
              className="border px-2 py-1 rounded-lg"
            />
            {errors.price && (
              <span className="text-base text-red-500">
                {String(errors?.price?.message)}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="discount">Discount Percent(%)</label>
            <input
              {...register("discountPercent", {
                required: "Discount is required",
              })}
              type="text"
              placeholder="0%"
              className="border px-2 py-1 rounded-lg"
            />
            {errors.discountPercent && (
              <span className="text-base text-red-500">
                {String(errors?.discountPercent?.message)}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="stock">Stock Quantity</label>
            <input
              {...register("stock", { required: "Stock quanity is required" })}
              type="text"
              placeholder="0.00"
              className="border px-2 py-1 rounded-lg"
            />
            {errors.stock && (
              <span className="text-base text-red-500">
                {String(errors?.stock?.message)}
              </span>
            )}
          </div>
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="rating">Rating</label>
            <input
              {...register("rating", { required: "Rating is required" })}
              type="number"
              max={5}
              min={0}
              placeholder="select rating"
              className="border px-2 py-1 rounded-lg w-full"
            />
            {errors.rating && (
              <span className="text-base text-red-500">
                {String(errors?.rating?.message)}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="image">Product Images *</label>
          <input
            accept="image/*"
            type="file"
            className="border px-2 py-1 rounded-lg"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setImageFile(e.target.files?.[0]);
              }
            }}
          />
          {imageFile && (
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Preview"
              className="w-20 h-20 object-cover rounded"
            />
          )}
          {errors.imageFile && (
            <span className="text-base text-red-500">
              {String(errors?.imageFile?.message)}
            </span>
          )}
        </div>

        <div className="flex justify-between items-center border rounded-lg px-2 py-1">
          <div className="flex flex-col gap-1">
            <label htmlFor="flash">Flash Sale</label>
            <p className="text-sm text-neutral-500">
              Mark this product as flash sale item
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsFlashSale(!isFlashSale)}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
              isFlashSale ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                isFlashSale ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </button>
        </div>
        <div className="flex justify-around">
          <button
            type="button"
            className="px-2 py-1 rounded-lg bg-red-500 text-neutral-100"
          >
            Cancel
          </button>
          <button className="px-2 py-1 rounded-lg bg-green-500 text-neutral-100">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPage;

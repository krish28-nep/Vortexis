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
  const [images, setImages] = useState<File[]>([]);
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    setError,
  } = useForm({ mode: "onChange" });

  // Create preview URLs
  const createPreviewUrls = (files: File[]) => {
    return files.map((file) => URL.createObjectURL(file));
  };

  // Upload a single image file
  const uploadImage = async (imageFile: File) => {
    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      const res = await axios.post(`${server}/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.file.path; // Adjust based on your API response
    } catch (e) {
      console.error("Image upload failed", e);
      throw e;
    }
  };

  // Handle file input
  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;
    setImages((prev) => [...prev, ...Array.from(selectedFiles)]);
  };

  // Handle form submission
  const onSubmit = async (data: FieldValues) => {
    try {
      if (images.length === 0) {
        setError("images", { message: "At least one image is required" });
        return;
      }

      const imageUrls = await Promise.all(images.map(uploadImage));

      await axios.post(`${server}/api/products`, {
        ...data,
        imageUrls,
        isFlashSale,
      });

      dispatch(
        showNotification({
          message: "Product added successfully",
          type: "success",
        })
      );

      queryClient.invalidateQueries({ queryKey: ["products"] });
      reset();
      setImages([]);
      router.push("./");
    } catch (e) {
      console.error(e);
      dispatch(
        showNotification({
          message: "Error adding product",
          type: "error",
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

        {/* Product Name */}
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
              {String(errors.name.message)}
            </span>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label htmlFor="description">Description *</label>
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
              {String(errors.description.message)}
            </span>
          )}
        </div>

        {/* Price and Discount */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="price">Price($)</label>
            <input
              {...register("price", { required: "Price is required" })}
              type="text"
              placeholder="0.00"
              className="border px-2 py-1 rounded-lg"
            />
            {errors.price && (
              <span className="text-base text-red-500">
                {String(errors.price.message)}
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
                {String(errors.discountPercent.message)}
              </span>
            )}
          </div>
        </div>

        {/* Stock and Rating */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="stock">Stock Quantity</label>
            <input
              {...register("stock", { required: "Stock quantity is required" })}
              type="number"
              placeholder="0"
              className="border px-2 py-1 rounded-lg"
            />
            {errors.stock && (
              <span className="text-base text-red-500">
                {String(errors.stock.message)}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="rating">Rating</label>
            <input
              {...register("rating", { required: "Rating is required" })}
              type="number"
              min={0}
              max={5}
              step="0.1"
              placeholder="Enter rating (0–5)"
              className="border px-2 py-1 rounded-lg"
            />
            {errors.rating && (
              <span className="text-base text-red-500">
                {String(errors.rating.message)}
              </span>
            )}
          </div>
        </div>

        {/* Image Upload */}
        <div className="flex flex-col gap-2">
          <label htmlFor="image">Product Images *</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelection}
            className="border px-2 py-1 rounded-lg"
          />
          {errors.images && (
            <span className="text-base text-red-500">
              {String(errors.images.message)}
            </span>
          )}
          <div className="flex gap-2 flex-wrap mt-2">
            {images.map((file, idx) => (
              <img
                key={idx}
                src={URL.createObjectURL(file)}
                alt={`preview-${idx}`}
                className="w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
        </div>

        {/* Flash Sale Toggle */}
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

        {/* Buttons */}
        <div className="flex justify-around">
          <button
            type="button"
            className="px-2 py-1 rounded-lg bg-red-500 text-neutral-100"
            onClick={() => {
              reset();
              setImages([]);
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-2 py-1 rounded-lg bg-green-500 text-neutral-100"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPage;

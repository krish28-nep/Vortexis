import { Star } from "lucide-react";
import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaRegEye, FaStar } from "react-icons/fa";
import { LuStar } from "react-icons/lu";

type Product = {
  name: string;
  price: number;
  img: string;
  discount: number
};

const ProductCart1: React.FC<Product> = ({ name, price, img, discount }) => {
  return (
    <div className="min-w-[18rem] max-w-[18rem]">
      <div className="relative flex w-full flex-col bg-gray-200 pt-10 group transition-all transform ease-in-out duration-300">
        <div className="absolute top-2 left-2 rounded-lg text-neutral-100 bg-red-500 p-1 z-10">
         -{discount}%
        </div>
        <div className="absolute top-0 right-0 text-2xl p-2 flex flex-col gap-2 z-10">
          <div className="bg-neutral-100 rounded-full p-1">
            <CiHeart />
          </div>
          <div className="bg-neutral-100 rounded-full p-1">
            <FaRegEye />
          </div>
        </div>
        <img className="object-cover h-40 hover:scale-140 transtion-all transform ease-in-out duration-300 z-0" src={img} alt={name} />
        <div className="bg-black text-neutral-100 py-1 flex justify-center scale-0 group-hover:scale-100 transform transition-all ease-in-out duration-300 cursor-pointer">
          Add To Cart
        </div>
      </div>
      <div className="px-4 pb-6">
        <h2 className="font-semibold">{name}</h2>
        <span className="text-red-400">${price}</span>
        <div className="flex gap-1 text-yellow-500 text-xl">
          <FaStar />
          <FaStar />
          <FaStar />
          <LuStar />
          <LuStar />
        </div>
      </div>
    </div>
  );
};

export default ProductCart1;

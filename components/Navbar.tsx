import React from "react";
import { CircleUser, Heart, Search, ShoppingCartIcon } from "lucide-react";

const Navbar = () => {
  return (
    <div className="flex mx-36 my-4 gap-6 items-center text-lg justify-between w-full">
      <h1 className="font-bold cursor-pointer">Exclusive</h1>
      <div className="flex items-center gap-10">
        <h1 className="cursor-pointer">Home</h1>
        <h1 className="cursor-pointer">Contact</h1>
        <h1 className="cursor-pointer">About</h1>
        <h1 className="cursor-pointer">Sign Up</h1>
      </div>
      <div className="flex items-center gap-6 relative">
        <input
          type="text"
          className="border-2 h-8 border-gray-500 py-2 px-4 pr-10 rounded-lg"
        />
        <Search className="absolute right-38 cursor-pointer" />
        <Heart />
        <ShoppingCartIcon />
        <CircleUser />
      </div>
    </div>
  );
};

export default Navbar;

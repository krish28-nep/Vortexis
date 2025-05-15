import React from "react";
import { Heart, ShoppingCartIcon } from "lucide-react";

const Navbar = () => {
  return (
    <div className="flex mx-36 my-4">
      <h1>Exclusive</h1>
      <div className="flex">
        <h1>Home</h1>
        <h1>Contact</h1>
        <h1>About</h1>
        <h1>Sign Up</h1>
      </div>
      <div className="flex">
        <input type="text" />
        <Heart />
        <ShoppingCartIcon />
      </div>
    </div>
  );
};

export default Navbar;

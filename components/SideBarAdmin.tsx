import React from "react";

const SideBarAdmin = () => {
  const adminPages = [
    "Dashboard",
    "User Management",
    "Product Management",
    "Category Management",
    "Cart Management",
    "Order Management",
    "Wishlist Management",
    "Contact Management",
  ];
  return (
    <div className="flex px-4 py-8 font-bold flex-col gap-4 fixed h-screen min-w-[18rem] bg-red-400">
      <h1 className="text-3xl">Exclusive</h1>
      {adminPages &&
        adminPages.map((page, index) => <span className="text-xl" key={index}>{page}</span>)}
    </div>
  );
};

export default SideBarAdmin;

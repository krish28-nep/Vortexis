import React from "react";
import Navbar from "../Navbar";
import Notification from "../general/Notification";
import Footer from "../Footer";

const AdminLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex flex-col h-screen">
      <Notification />
      <div className="my-20 px-4 laptop:px-36">{children}</div>
    </div>
  );
};

export default AdminLayout;


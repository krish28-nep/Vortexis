import React from "react";
import Notification from "../general/Notification";
import SideBarAdmin from "../SideBarAdmin";

const AdminLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex flex-col h-screen">
      <Notification />
      <SideBarAdmin />
      <div className="px-4 laptop:px-36 my-20">{children}</div>
    </div>
  );
};

export default AdminLayout;

import React from "react";
import Navbar from "../Navbar";

const EndUserLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex flex-col">
      <header className="flex sticky w-full h-20 bg-white top-0">
        <Navbar />
      </header>
      {children}
    </div>
  );
};

export default EndUserLayout;

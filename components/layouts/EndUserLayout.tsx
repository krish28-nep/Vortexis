import React from "react";
import Navbar from "../Navbar";
import Notification from "../general/Notification";
import Footer from "../Footer";

const EndUserLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex flex-col h-screen">
      <Notification />
      <header className="flex sticky w-full h-20 bg-white top-0">
        <Navbar />
      </header>
      <div className="px-4 laptop:px-36 my-8">{children}</div>
      <footer className="">
        <Footer />
      </footer>
    </div>
  );
};

export default EndUserLayout;

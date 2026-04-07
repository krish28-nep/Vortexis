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
      <header className="flex fixed z-50 w-full h-20 bg-white top-0">
        <Navbar />
      </header>
      <div className="mx-auto w-[1580px] my-26">{children}</div>
      <footer className="">
        <Footer />
      </footer>
    </div>
  );
};

export default EndUserLayout;

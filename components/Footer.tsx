import React from "react";
import { IoMdSend } from "react-icons/io";

const Footer = () => {
  return (
    <div className="px-6 py-4 laptop:px-20 laptop:py-10 bg-neutral-900 flex flex-col">
      <div className="grid grid-cols-2 laptop:grid-cols-4 text-neutral-200 gap-10 laptop:gap-20 mx-auto">
        <div className="flex flex-col gap-3">
          <h1 className="text-xl tablet:text-3xl font-semibold">Exclusive</h1>
          <h1 className="text-sm :text-base">Subscribe</h1>
          <h1 className="text-sm tablet:text-base">
            Get 10% off your first order
          </h1>
          <div className="relative">
            <input
              className="border-1 px-4 py-2 pr-8 tablet:pr-12 w-full text-sm tablet:text-base"
              type="text"
              placeholder="Enter your email"
            />
            <IoMdSend className="absolute right-3 top-2 cursor-pointer text-base tablet:text-2xl" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-lg tablet:text-2xl font-semibold">Support</h1>
          <ul className="space-y-2 text-sm tablet:text-base">
            <li>
              111 Bijay sarani, Dhaka,
              <br />
              DH 1515, Bangladesh
            </li>
            <li>exclusive@gmail.com</li>
            <li>+99015-88888-9999</li>
          </ul>
        </div>
        <div className="space-y-1">
          <h1 className="text-lg tablet:text-2xl font-semibold">Account</h1>
          <ul className="space-y-2 text-sm tablet:text-base">
            <li>My Account</li>
            <li>Login / Register</li>
            <li>Cart</li>
            <li>Wishlist</li>
            <li>Shop</li>
          </ul>
        </div>
        <div className="space-y-1">
          <h1 className="text-lg tablet:text-2xl font-semibold">Quick Link</h1>
          <ul className="space-y-2 text-sm tablet:text-base">
            <li>Privacy</li>
            <li>Terms Of USe</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
      <div className="text-neutral-600 mt-8 self-center">
        Copyright Rimel 2022. All right reserved
      </div>
    </div>
  );
};

export default Footer;

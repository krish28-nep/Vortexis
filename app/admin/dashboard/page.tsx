
import React from "react";
import { FaBox, FaDollarSign, FaRegEye, FaUsers } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";

const DashboardPage = () => {
  return (
    <div className="bg-gray-100 flex flex-col gap-10 my-10 px-8 shadow-2xl py-4">
      <div>
        <h1 className="font-semibold text-2xl">Dashboard</h1>
        <p>Overview of your admin panel statistics and recent activity.</p>
      </div>
      <div className="flex justify-between ">
        <div className="border w-48 pl-4 py-4 flex items-center rounded-lg bg-white gap-2">
          <FaUsers
            size={50}
            className="border text-white bg-blue-500 p-3 rounded-lg"
          />
          <div className="flex flex-col">
            <p className="text-sm">Total Users</p>
            <p className="text-xl">4</p>
          </div>
        </div>
        <div className="border w-48 pl-4 py-4 flex items-center rounded-lg bg-white gap-2">
          <FaBox
            size={50}
            className="border text-white bg-green-500 p-3 rounded-lg"
          />
          <div className="flex flex-col">
            <p className="text-sm">Total Products</p>
            <p className="text-xl">4</p>
          </div>
        </div>
        <div className="border w-48 pl-4 py-4 flex items-center rounded-lg bg-white gap-2">
          <IoCartOutline
            size={50}
            className="border text-white bg-purple-500 p-3 rounded-lg"
          />
          <div className="flex flex-col">
            <p className="text-sm">Total Orders</p>
            <p className="text-xl">4</p>
          </div>
        </div>
        <div className="border w-48 pl-4 py-4 flex items-center rounded-lg bg-white gap-2">
          <FaDollarSign
            size={50}
            className="border text-white bg-yellow-500 p-3 rounded-lg"
          />
          <div className="flex flex-col">
            <p className="text-sm">Total Revenue</p>
            <p className="text-xl">$799.92</p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between">
          <h2>Recent Orders</h2>
          <p className="flex items-center gap-2">
            View All <FaRegEye />
          </p>
        </div>
        <table className="min-w-full bg-white rounded-lg shadow overflow-hidden mt-4">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-left">
              <th className="py-3 px-4 font-semibold">Order ID</th>
              <th className="py-3 px-4 font-semibold">Customer Name</th>
              <th className="py-3 px-4 font-semibold">Total</th>
              <th className="py-3 px-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">12345</td>
              <td className="py-2 px-4">John Doe</td>
              <td className="py-2 px-4">$99.99</td>
              <td className="py-2 px-4">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">Shipped</span>
              </td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">12346</td>
              <td className="py-2 px-4">Jane Smith</td>
              <td className="py-2 px-4">$49.99</td>
              <td className="py-2 px-4">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">Processing</span>
              </td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">12346</td>
              <td className="py-2 px-4">Jane Smith</td>
              <td className="py-2 px-4">$49.99</td>
              <td className="py-2 px-4">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">Processing</span>
              </td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">12346</td>
              <td className="py-2 px-4">Jane Smith</td>
              <td className="py-2 px-4">$49.99</td>
              <td className="py-2 px-4">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">Processing</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardPage;

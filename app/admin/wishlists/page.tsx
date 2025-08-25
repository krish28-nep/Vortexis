"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const page = () => {
  const fetchCustomers = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users`
    );
    console.log(data);
    return data.User || [];
  };
  const {
    data: Users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["Users"],
    queryFn: fetchCustomers,
  });
  if (isLoading) return <div className="p-4">Loading Users...</div>;
  if (isError)
    return <div className="p-4 text-red-500">Error fetching users.</div>;
  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-semibold mb-4">Comments</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-xl">
          <thead>
            <tr className="bg-gray-200 text-left text-sm font-semibold text-gray-700">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Comment</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Restaurant</th>
            </tr>
          </thead>
          <tbody>
            {Users.map((comment: any) => (
              <tr key={comment.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{comment.id}</td>
                <td className="px-4 py-3 text-sm">{comment.comment}</td>
                <td className="px-4 py-3 text-sm">
                  {comment.rating.toFixed(1)}
                </td>
                <td className="px-4 py-3 text-sm">
                  {comment.user?.name || "Unknown"}
                </td>
                <td className="px-4 py-3 text-sm">
                  {comment.restaurant?.name || "Unknown"}
                </td>
              </tr>
            ))}
            {Users.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-4 text-sm text-gray-500"
                >
                  No Users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;

"use client";

import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/lib/api/user";
import { Button } from "@/components/general/Button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/general/DataTable";
import { userColumn } from "@/lib/columns/userColumn";
import { User } from "@/types/user";
import Spinner from "@/components/Spinner";

const UserTablePage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: usersData,
    isLoading: usersLoading,
    isError: usersError,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
  });

  const filteredUsers = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return usersData ?? [];

    return (usersData ?? []).filter((u) => {
      const name = u.name?.toLowerCase() ?? "";
      const email = u.email?.toLowerCase() ?? "";
      const role = u.role?.toLowerCase() ?? "";
      return name.includes(q) || email.includes(q) || role.includes(q);
    });
  }, [usersData, searchTerm]);

  return (
    <div className="section-container space-y-8">
      <h1 className="heading-admin">Users Management</h1>

      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Search ..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          className="input-field"
        />
        <Button
          variant="outline"
          icon={<Plus size={18} />}
          text="Add User"
          onClick={() => router.push("/admin/users/add")}
        />
      </div>
      {usersLoading ? (
        <Spinner />
      ) : usersError ? (
        <p className="error-text">Failed to load users.</p>
      ) : (
        <div className="">
          <DataTable columns={userColumn} data={filteredUsers} />
        </div>
      )}
    </div>
  );
};

export default UserTablePage;

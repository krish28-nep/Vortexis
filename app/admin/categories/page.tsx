"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/general/Button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/general/DataTable";
import Spinner from "@/components/Spinner";
import { fetchCategories } from "@/lib/api/category";
import { Category } from "@/types/category";
import { categoryColumn } from "@/lib/columns/categoryColumn";

const CategoryTablePage = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    const {
        data: categoriesData,
        isLoading: categoriesLoading,
        isError: categoriesError,
    } = useQuery<Category[]>({
        queryKey: ["categories"],
        queryFn: () => fetchCategories(),
    });

    return (
        <div className="section-container space-y-8">
            <h1 className="heading-admin">Category Management</h1>

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
                    text="Add Category"
                    onClick={() => router.push("/admin/categories/add")}
                />
            </div>
            {categoriesLoading ? (
                <Spinner />
            ) : categoriesError ? (
                <p className="error-text">Failed to load users.</p>
            ) : (
                <div className="">
                    <DataTable columns={categoryColumn} data={categoriesData ?? []} />
                </div>
            )}
        </div>
    );
};

export default CategoryTablePage;

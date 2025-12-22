"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/general/Button";
import WishlistItemCard from "@/components/general/WishlistItemCard";
import { useQuery } from "@tanstack/react-query";
import { fetchWishlistItems } from "@/lib/api/wishlist";
import Spinner from "@/components/Spinner";
import { wishlistItem } from "@/types/wishlist";
import { Heart } from "lucide-react";

const Page = () => {
    const router = useRouter();

    const {
        data: wishlistItems,
        isLoading: wishlistItemsLoading,
        isError: wishlistItemsError,
    } = useQuery<wishlistItem[]>({
        queryKey: ["wishlistItems"],
        queryFn: fetchWishlistItems,
    });

    if (wishlistItemsLoading) {
        return (
            <Spinner />
        );
    }

    if (wishlistItemsError) {
        return (
            <div className="p-6 w-[1280px] mx-auto flex flex-col gap-6">
                <h2 className="text-2xl font-semibold">Wishlist</h2>
                <p>Failed to load wishlist. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="p-6 w-[1280px] mx-auto flex flex-col gap-6">
            <h2 className="text-2xl font-semibold">Wishlist</h2>

            <div className="flex flex-col gap-4 flex-1">
                {wishlistItems && wishlistItems.length > 0 ? (
                    wishlistItems.map((item) => (
                        <WishlistItemCard key={item.id} item={item} />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center gap-4 py-16 border border-dashed rounded-2xl bg-gray-50 dark:bg-gray-900">
                        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30">
                            <Heart className="w-10 h-10 text-red-500" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            Your Wishlist is Empty
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-md">
                            Looks like you haven’t added anything to your wishlist yet.
                            Explore our products and save the ones you love!
                        </p>
                        <Button
                            text="Continue Shopping"
                            onClick={() => router.push("/products")}
                        />
                    </div>

                )}
            </div>
        </div>
    );
};

export default Page;

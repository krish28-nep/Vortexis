"use client";

import FeatureCard from "@/components/FeatureCard";
import NewArrivalCart from "@/components/NewArrivalCart";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";

type Category = {
  id: number;
  name: string;
};

const HomePage = () => {
  const dbTimeString = "2025-08-18 09:13:00 AM"; // from database
  const [targetTime, setTargetTime] = useState(
    new Date(dbTimeString).getTime()
  );

  const ProductRail = dynamic(() => import("@/components/ProductRail"), {
    ssr: false,
  });

  const SlideContent = dynamic(() => import("@/components/SlideContent"), {
    ssr: false,
  });

  useEffect(() => {
    setTargetTime(new Date(dbTimeString).getTime());

    const interval = setInterval(() => {
      const timeLeft = targetTime - Date.now();
      if (timeLeft <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  const fetchCategories = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/categories`
    );
    return data.categories;
  };

  const { data: categoryData } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
  const categoryList: Category[] = categoryData || [];

  return (
    <div className="flex flex-col gap-10 tablet:gap-20">
      <div className="flex flex-col-reverse gap-4 laptop:flex-row laptop:justify-between">
        <div className="flex flex-wrap laptop:flex-col gap-1 laptop:gap-3 whitespace-nowrap laptop:text-lg ">
          {categoryList.map((category, index) => (
            <Link
              key={index}
              href={`/products?categoryIds=${category.id}`}
              className="cursor-pointer hover:text-red-500 transition"
            >
              {category.name}
            </Link>
          ))}
        </div>
        <SlideContent />
      </div>
      {targetTime > Date.now() ? (
        <ProductRail
          title="Today's"
          subtitle="Flash Sales"
          dbTimeString={dbTimeString}
        />
      ) : (
        <div className="space-y-2">
          <h1 className="border-l-15 border-red-500 text-sm tablet:text-xl px-2 py-1">
            {"Today's"}
          </h1>
          <p className="responsive-subtitle font-semibold">
            Flash Sale has ended.
          </p>
        </div>
      )}
      <ProductRail
        title="This Month"
        subtitle="Best Selling Products"
        dbTimeString={dbTimeString}
      />
      <NewArrivalCart />
      <FeatureCard />
    </div>
  );
};

export default HomePage;

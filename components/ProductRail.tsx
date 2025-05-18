import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import ProductCart1 from "./ProductCart1";

type ProductRailsProps = {
  title: string;
  subtitle: string;
  dbTimeString: string;
};

const ProductRail: React.FC<ProductRailsProps> = ({
  title,
  subtitle,
  dbTimeString,
}) => {
  const targetTime = new Date(dbTimeString).getTime();

  const [isEnded, setIsEnded] = useState(false);
  const [remainingTime, setRemainingTime] = useState(targetTime - Date.now());

  const intervalRef = useRef<NodeJS.Timeout | number>(0);

  useEffect(() => {
    if (!isEnded) {
      intervalRef.current = setInterval(() => {
        const timeLeft = targetTime - Date.now();

        if (timeLeft <= 0) {
          clearInterval(intervalRef.current);
          setRemainingTime(0);
          setIsEnded(true);
        } else {
          setRemainingTime(timeLeft);
        }
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isEnded, targetTime]);

  const days = String(
    Math.floor(remainingTime / (1000 * 60 * 60 * 24))
  ).padStart(2, "0");
  const hr = String(
    Math.floor((remainingTime / (1000 * 60 * 60)) % 24)
  ).padStart(2, "0");
  const min = String(Math.floor((remainingTime / (1000 * 60)) % 60)).padStart(
    2,
    "0"
  );
  const sec = String(Math.floor((remainingTime / 1000) % 60)).padStart(2, "0");

  const ScrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (ScrollRef.current) {
      ScrollRef.current.scrollLeft += 350;
      ScrollRef.current.style.scrollBehavior = "smooth";
    }
  };
  const scrollLeft = () => {
    if (ScrollRef.current) {
      ScrollRef.current.scrollLeft -= 350;
      ScrollRef.current.style.scrollBehavior = "smooth";
    }
  };
  const products = [
    {
      name: "OnePlus",
      price: 699,
      img: "oneplusHero.png",
      discount: 40,
    },
    {
      name: "PlayStation 5",
      price: 499,
      img: "ps5Hero.png",
      discount: 49,
    },
    {
      name: "ROG Gaming",
      price: 1399,
      img: "rogHero.png",
      discount: 43,
    },
    {
      name: "Xbox Series X",
      price: 499,
      img: "xboxHero.png",
      discount: 33,
    },
    {
      name: "Iphone 14",
      price: 899,
      img: "hero_endFrame_141.png",
      discount: 10,
    },
    {
      name: "ROG Gaming",
      price: 1399,
      img: "rogHero.png",
      discount: 70,
    },
    {
      name: "Iphone 14",
      price: 899,
      img: "hero_endFrame_141.png",
      discount: 22,
    },
  ];
  return (
    <div className="flex flex-col">
      <h1 className="border-l-15 border-red-500 rounded-sm px-2 responsive-content py-1">
        {title}
      </h1>
      <div className="flex flex-col-reverse laptop:flex-row  laptop:justify-between">
        <div className="responsive-subtitle py-4 font-semibold flex gap-5 justify-between laptop:gap-35">
          <h1 className="">{subtitle}</h1>
          {subtitle == "Flash Sales" && (
            <div className="flex gap-2 laptop:gap-4">
              <div>
                <h1 className="time-heading">Days</h1>
                <h1>{days}</h1>
              </div>
              <div className="mt-6 text-red-400">:</div>
              <div>
                <h1 className="time-heading">Hours</h1>
                <h1>{hr}</h1>
              </div>
              <div className="mt-6 text-red-400">:</div>
              <div>
                <h1 className="time-heading">Minutes</h1>
                <h1>{min}</h1>
              </div>
              <div className="mt-6 text-red-400">:</div>
              <div>
                <h1 className="time-heading">Seconds</h1>
                <h1>{sec}</h1>
              </div>
            </div>
          )}
        </div>
        <div className="flex text-4xl tablet:text-6xl gap-3 tablet:gap-4 font-normal text-neutral-500 cursor-pointer self-end -mt-6 laptop:self-auto">
          <IoIosArrowRoundBack
            className="p-2 bg-neutral-300 rounded-full hover:bg-neutral-200 active:scale-130 transition-all ease-in-out duration-300"
            onClick={scrollLeft}
          />
          <IoIosArrowRoundForward
            className="p-2 bg-neutral-300 rounded-full hover:bg-neutral-200 active:scale-130 transition-all ease-in-out duration-300"
            onClick={scrollRight}
          />
        </div>
      </div>
      <div
        ref={ScrollRef}
        className="flex gap-4 tablet:gap-10 overflow-auto scrollbar-hide"
      >
        {products.map((product: any, index: number) => (
          <ProductCart1
            key={index}
            name={product.name}
            img={product.img}
            price={product.price}
            discount={product.discount}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <span className="border-2 px-4 py-2 responsive-content bg-red-500 text-neutral-100">
          View All Products
        </span>
      </div>
    </div>
  );
};

export default ProductRail;

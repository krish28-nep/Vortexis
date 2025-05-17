import React from 'react'
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io';
import ProductCart1 from './ProductCart1';

type ProductRailsProps = {
    title:string;
    subtitle: string
}

const ProductRail:React.FC<ProductRailsProps> = ({title, subtitle}) => {
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
      <h1 className="border-l-15 border-red-500 rounded-sm px-2 text-lg py-1">
        {title}
      </h1>
      <div className="flex justify-between">
        <div className="text-4xl py-4 font-semibold flex gap-35">
          <h1 className="">{subtitle}</h1>
          {subtitle=="Flash Sales" && <div className="flex gap-4">
            <div>
              <h1 className="time-heading">Days</h1>
              <h1>03</h1>
            </div>
            <div className="mt-6 text-red-400">:</div>
            <div>
              <h1 className="time-heading">Hours</h1>
              <h1>03</h1>
            </div>
            <div className="mt-6 text-red-400">:</div>
            <div>
              <h1 className="time-heading">Minutes</h1>
              <h1>33</h1>
            </div>
            <div className="mt-6 text-red-400">:</div>
            <div>
              <h1 className="time-heading">Seconds</h1>
              <h1>33</h1>
            </div>
          </div>}
        </div>
        <div className="flex text-6xl gap-4 font-normal text-neutral-500 cursor-pointer">
          <IoIosArrowRoundBack className="p-2 bg-neutral-300 rounded-full" />
          <IoIosArrowRoundForward className="p-2 bg-neutral-300 rounded-full" />
        </div>
      </div>
      <div className="flex gap-10 overflow-auto scrollbar-hide">
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
        <span className="border-2 px-4 py-2 text-lg bg-red-500 text-neutral-100">
          View All Products
        </span>
      </div>
    </div>
  );
}

export default ProductRail

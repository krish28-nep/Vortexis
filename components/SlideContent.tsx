"use client";
import { MoveRight } from "lucide-react";
import React, { useEffect, useState } from "react";

const SlideContent = () => {
  const [option, setOption] = useState(1);

  const [slideClass, setSlideClass] = useState("slide-in");

  const handleOptionChange = (newOption: number) => {
    if (newOption === option) return; // prevent unnecessary animation
    setSlideClass("slide-out");

    setTimeout(() => {
      setOption(newOption);
      setSlideClass("slide-in");
    }, 1000);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideClass("slide-out");
      setTimeout(() => {
        setOption((prev) => (prev % 5) + 1);
        setSlideClass("slide-in");
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  let heroToRender;
  switch (option) {
    case 1:
      heroToRender = {
        logo: "/appleLogo.png",
        title: "iPhone 14 Series",
        offer: `Up to 10% <br />off Voucher`,
        hero_endFrame: "hero_endFrame_141.png",
      };
      break;

    case 2:
      heroToRender = {
        logo: "/xboxLogo.png",
        title: "Xbox New Series",
        offer: `Play More, Win More <br />Exclusive Deals`,
        hero_endFrame: "xboxHero.png",
      };
      break;

    case 3:
      heroToRender = {
        logo: "/ps5Logo.png",
        title: "PlayStation 5",
        offer: `Exclusive Bundles <br />Now Available`,
        hero_endFrame: "ps5Hero.png",
      };
      break;

    case 4:
      heroToRender = {
        logo: "/rogLogo.png",
        title: "ROG Phone 9",
        offer: `Game Beast Unleashed <br />Get Gaming Perks`,
        hero_endFrame: "rogHero.png",
      };
      break;

    case 5:
      heroToRender = {
        logo: "/oneplusLogo.png",
        title: "OnePlus 13",
        offer: `Launch Offer <br />Flat ₹3000 off`,
        hero_endFrame: "oneplusHero.png",
      };
      break;

    default:
      heroToRender = {};
  }
  return (
    <div
      className={`w-full laptop:w-[75%] max-h-[271px] min-h-[271px] tablet:max-h-96 tablet:min-h-96 pt-8 relative text-primary-50 flex pl-10 laptop:pl-24 border-2 bg-black justify-between`}
    >
      <div className={`${slideClass} flex justify-between w-full`}>
        <div className="flex flex-col gap-3 tablet:gap-4 ">
          <span className="flex items-center gap-2 tablet:gap-6">
            <img
              className="w-5 h-5 tablet:w-10 tablet:h-10"
              src={heroToRender.logo}
            />
            <h1 className="text-xs tablet:text-base">{heroToRender.title}</h1>
          </span>
          <span
            className="text-lg tablet:text-5xl font-bold laptop:[line-height:4rem]"
            dangerouslySetInnerHTML={{ __html: heroToRender.offer || "" }}
          />
          <button className="cursor-pointer tablet:text-xl flex items-center gap-2">
            <span className="border-b-2 py-1">Shop now</span>
            <MoveRight />
          </button>
        </div>
        <img
          className="w-4/7 mt-6 h-32 tablet:h-80 hover:scale-130 transition-all ease-in-out duration-300 object-center"
          src={heroToRender.hero_endFrame}
        />
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 tablet:gap-4">
        <button
          onClick={() => handleOptionChange(1)}
          className={`rounded-full bg-primary-500 h-3 w-3 tablet:h-4 tablet:w-4 hover:scale-150 transition-all ease-in-out duration-300 ${
            option === 1 ? "bg-secondary-400 border-2" : ""
          }`}
        ></button>
        <button
          onClick={() => handleOptionChange(2)}
          className={`rounded-full bg-primary-500 h-3 w-3 tablet:h-4 tablet:w-4 hover:scale-150 transition-all ease-in-out duration-300 ${
            option === 2 ? "bg-secondary-400 border-2" : ""
          }`}
        ></button>
        <button
          onClick={() => handleOptionChange(3)}
          className={`rounded-full bg-primary-500 h-3 w-3 tablet:h-4 tablet:w-4 hover:scale-150 transition-all ease-in-out duration-300 ${
            option === 3 ? "bg-secondary-400 border-2" : ""
          }`}
        ></button>{" "}
        <button
          onClick={() => handleOptionChange(4)}
          className={`rounded-full bg-primary-500 h-3 w-3 tablet:h-4 tablet:w-4 hover:scale-150 transition-all ease-in-out duration-300 ${
            option === 4 ? "bg-secondary-400 border-2" : ""
          }`}
        ></button>
        <button
          onClick={() => handleOptionChange(5)}
          className={`rounded-full bg-primary-500 h-3 w-3 tablet:h-4 tablet:w-4 hover:scale-150 transition-all ease-in-out duration-300 ${
            option === 5 ? "bg-secondary-400 border-2" : ""
          }`}
        ></button>
      </div>
    </div>
  );
};

export default SlideContent;

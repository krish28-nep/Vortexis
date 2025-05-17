import React from "react";
import { BiSupport } from "react-icons/bi";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { IconType } from "react-icons";

const iconMap = {
  TbTruckDelivery: TbTruckDelivery,
  BiSupport: BiSupport,
  IoShieldCheckmarkOutline: IoShieldCheckmarkOutline,
};
type Feature = {
  icon: keyof typeof iconMap;
  title: string;
  description: string;
};
const FeatureCard = () => {
  const features:Feature[] = [
    {
      icon: "TbTruckDelivery",
      title: "FREE AND FAST DELIVERY",
      description: "Free delivery for all orders over $140",
    },
    {
      icon: "BiSupport",
      title: "24/7 CUSTOMER SERVICE",
      description: "Friendly 24/7 customer support",
    },
    {
      icon: "IoShieldCheckmarkOutline",
      title: "MONEY BACK GUARANTEE ",
      description: "We reurn money within 30 days",
    },
  ];
  return (
    <div className="flex justify-around mb-10">
      {features.map((feature, index) => {
        const IconComponent: IconType = iconMap[feature.icon];
        return(
        <div key={index} className="flex flex-col gap-4">
          <div className="flex justify-center ">
            <div className="bg-neutral-400 rounded-full p-4">
              <IconComponent
                size={80}
                className="bg-neutral-900 rounded-full text-neutral-200 p-2"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
              <h1 className="text-xl font-semibold">{feature.title}</h1>
              <h1>{feature.description}</h1>
          </div>
        </div>
        )
})}
    </div>
  );
};

export default FeatureCard;

import React from "react";
import NewArrivalProductCart from "./NewArrivalProductCart";

const NewArrivalCart = () => {
  return (
    <div className="flex flex-col">
      <h1 className="border-l-15 border-red-500 rounded-sm px-2 text-lg py-1">
        Featured
      </h1>
      <div className="text-4xl py-4 font-semibold flex gap-35">
        <h1 className="">New Arrival</h1>
      </div>
      <div className="grid grid-cols-2 text-neutral-200 gap-8">
        <NewArrivalProductCart
          title="PlayStation 5"
          description="Black and White version of the PS5 <br /> coming out on sale."
          image="/ps5Arrival.png"
        />
        <div className="grid grid-rows-2 gap-8">
          <NewArrivalProductCart
            title="Women's Collection"
            description="Featured woman collections that </br> give you another vibe."
            image="/womenArrival.png"
          />
          <div className="grid grid-cols-2 gap-8">
            <NewArrivalProductCart
              title="Speakers"
              description="Amazon wireless speakers."
              image="/speakerArrival.png"
            />
            <NewArrivalProductCart
              title="Perfume"
              description="GUCCI INTENSE OUD EDP."
              image="/gucciArrival.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivalCart;

import React from 'react'

type NewArrivalProductCartProps = {
    title:string;
    description:string;
    image: string;
}
const NewArrivalProductCart:React.FC<NewArrivalProductCartProps> = ({title, description ,image}) => {
  return (
    <div className="relative bg-black flex justify-center p-5 tablet:p-10">
      <img className="object-contain laptop:object-cover laptop:scale-80 laptop:hover:scale-110 transition-all ease-in-out duration-300" src={image} />
      <div className="absolute bottom-0 p-1 tablet:p-8 left-0">
        <h1 className="text-sm laptop:text-2xl font-semibold">{title}</h1>
        <div className='text-[10px] text-laptop:base' dangerouslySetInnerHTML={{__html:description}}/>
        <button className="border-b-2 border-neutral-500 py-1 cursor-pointer text-xs laptop:text-base">
          Shop Now
        </button>
      </div>
    </div>
  );
}

export default NewArrivalProductCart

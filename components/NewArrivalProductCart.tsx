import React from 'react'

type NewArrivalProductCartProps = {
    title:string;
    description:string;
    image: string;
}
const NewArrivalProductCart:React.FC<NewArrivalProductCartProps> = ({title, description ,image}) => {
  return (
    <div className="relative bg-black flex justify-center p-4">
      <img className="object-cover" src={image} />
      <div className="absolute bottom-0 p-8 left-0">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <div dangerouslySetInnerHTML={{__html:description}}/>
        <button className="border-b-2 border-neutral-500 py-1 cursor-pointer">
          Shop Now
        </button>
      </div>
    </div>
  );
}

export default NewArrivalProductCart

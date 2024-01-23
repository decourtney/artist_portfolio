import React from "react";
import { useParams } from "react-router-dom";
import { Category, Product } from "../../utils/customClientTypes";

interface SliderItemProps { itemToDisplay: Category | Product, width: Number }

const baseCDN =
  import.meta.env.VITE_BASE_CDN ||
  "https://chumbucket.donovancourtney.dev/artist_portfolio";

const SliderItem = ({ itemToDisplay, width }: SliderItemProps) => {
  let { username: userParam } = useParams();
  if (!userParam) userParam = import.meta.env.VITE_BASE_USER;
  
  return (
    // <div className="h-full w-auto">
    <div id="slider-item" className="inline-block py-[4%]">
      <img
        className="block w-full h-full"
        src={`${baseCDN}/${userParam}/${itemToDisplay.image}`}
        alt={itemToDisplay.name}
      />
    </div>
    // </div>
  );
};

export default SliderItem;
import React from "react";
import { useParams } from "react-router-dom";
import { Category, Product } from "../../utils/customClientTypes";

interface SliderItemProps {
  itemToDisplay: Category | Product;
  width: Number;
}

const baseCDN =
  import.meta.env.VITE_BASE_CDN ||
  "https://chumbucket.donovancourtney.dev/artist_portfolio";

const SliderItem = ({ itemToDisplay, width }: SliderItemProps) => {
  let { username: userParam } = useParams();
  if (!userParam) userParam = import.meta.env.VITE_BASE_USER;

  // TODO Removing the div changes the slider display, Object-position - test later
  return (
    <div id="slider-item" className="h-full w-full"> 
      <img
        className="h-full w-full object-cover"
        src={`${baseCDN}/${userParam}/${itemToDisplay.image}`}
        alt={itemToDisplay.name}
      />
    </div>
  );
};

export default SliderItem;

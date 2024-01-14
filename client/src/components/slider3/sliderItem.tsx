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

  return (
    <div id="slider-item" className="w-full h-full">
      <img
        className="block w-full h-full"
        src={`${baseCDN}/${userParam}/${itemToDisplay.image}`}
        alt={itemToDisplay.name}
      />
    </div>
  );
};

export default SliderItem;

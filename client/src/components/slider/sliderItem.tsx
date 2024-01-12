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
    <div className="slider-item" style={{ width: `${width}%` }}>
      <img
        className="slider-image"
        src={`${baseCDN}/${userParam}/${itemToDisplay.image}`}
        alt={itemToDisplay.name}
      />
    </div>
  );
};

export default SliderItem;
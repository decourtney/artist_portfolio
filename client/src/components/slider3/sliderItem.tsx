import React, { useRef, useEffect } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { Category, Product } from "../../utils/customClientTypes";
import { motion } from "framer-motion";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setProductState } from "../../redux/productSlice";

interface SliderItemProps {
  itemToDisplay: Category | Product;
  sliderItemWidth?: number;
  // onClick: (item: Category | Product) => void;
}

const baseCDN =
  import.meta.env.VITE_BASE_CDN ||
  "https://chumbucket.donovancourtney.dev/artist_portfolio";

const SliderItem = ({ itemToDisplay, sliderItemWidth }: SliderItemProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const productData = useAppSelector<Product | undefined>(
    (state) => state.product.data
  );
  let { username: userParam } = useParams();
  if (!userParam) userParam = import.meta.env.VITE_BASE_USER;

  const handleOnClick=()=>{
    dispatch(setProductState(itemToDisplay as Product))
    navigate(`/gallery/${itemToDisplay.name}`)
  }

  // TODO Removing the div changes the slider display, Object-position - test later
  return (
    <div
      id="slider-item"
      className={`slider-item h-full`}
      style={{ width: `${sliderItemWidth ? sliderItemWidth : 100}%` }}
      // onClick={() => navigate(`/gallery/${itemToDisplay.name}`)}
      onClick={handleOnClick}
    >
      <img
        className="h-full w-full object-cover"
        src={`${baseCDN}/${userParam}/${itemToDisplay.image}`}
        alt={itemToDisplay.name}
        loading="lazy"
      />
    </div>
  );
};

export default SliderItem;

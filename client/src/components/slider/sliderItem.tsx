import React, { useRef, useEffect } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { Category, Product } from "../../utils/customClientTypes";
import { motion } from "framer-motion";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { RootState } from "../../store";
import { setProductState } from "../../redux/productSlice";
import { setGalleryState } from "../../redux/gallerySlice";

interface SliderItemProps {
  referenceKey?: string;
  itemToDisplay: Category | Product;
  sliderItemWidth: number;
  // onClick: (item: Category | Product) => void;
}

const baseCDN =
  import.meta.env.VITE_BASE_CDN ||
  "https://chumbucket.donovancourtney.dev/artist_portfolio";

const SliderItem = ({ referenceKey, itemToDisplay, sliderItemWidth }: SliderItemProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const gallerySlice = useAppSelector(
    (state: RootState) => state.gallery.galleryState
  );
  const sliderItemRef = useRef<HTMLDivElement>(null);
  let { username: userParam } = useParams();
  if (!userParam) userParam = import.meta.env.VITE_BASE_USER;

  useEffect(() => {
    // if (sliderItemRef) console.log(sliderItemRef.current?.offsetTop);
  }, []);

  const handleOnClick = () => {
    dispatch(setProductState(itemToDisplay as Product));
    navigate(`/gallery/${itemToDisplay.name}`);
  };

  if (!itemToDisplay) return null;

  return (
    <div
      ref={sliderItemRef}
      id="slider-item"
      className={`slider-item px-0.5`}
      style={{ width: `${sliderItemWidth ? sliderItemWidth : 100}%` }}
      //onClick={handleOnClick}
      onMouseEnter={() => dispatch(setGalleryState({ sliderItemRef: referenceKey, showMiniModal: true }))}
      onMouseLeave={() => dispatch(setGalleryState({ showMiniModal: false }))}
    >
      {itemToDisplay && (
        <img
          className="h-full w-full object-cover rounded-sm"
          src={`${baseCDN}/${userParam}/${itemToDisplay.image}`}
          alt={itemToDisplay.name}
          loading="lazy"
          onError={() =>
            console.log("Error fetching image:", itemToDisplay.name)
          }
        />
      )}
    </div>
  );
};

export default SliderItem;

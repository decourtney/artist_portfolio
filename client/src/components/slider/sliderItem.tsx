import React, { useRef, useEffect } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { Category, Product } from "../../utils/customClientTypes";
import { motion } from "framer-motion";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { RootState } from "../../store";
import { setProductState } from "../../redux/productSlice";
import { setMiniModalState } from "../../redux/miniModalSlice";
import MiniModal from "../gallery/miniModal";

interface SliderItemProps {
  sliderItemId: string;
  itemToDisplay: Category | Product;
  sliderItemWidth: number;
  // onClick: (item: Category | Product) => void;
}

const baseCDN =
  import.meta.env.VITE_BASE_CDN ||
  "https://chumbucket.donovancourtney.dev/artist_portfolio";

const SliderItem = ({
  sliderItemId,
  itemToDisplay,
  sliderItemWidth,
}: SliderItemProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const miniModalState = useAppSelector(
    (state: RootState) => state.miniModal.miniModalState
  );
  const sliderItemRef = useRef<HTMLElement>(null);
  let { username: userParam } = useParams();
  if (!userParam) userParam = import.meta.env.VITE_BASE_USER;

  const handleMouseEnter = () => {
    if (sliderItemRef.current) {
      const rect = sliderItemRef.current?.getBoundingClientRect();
      const computedStyles = window.getComputedStyle(sliderItemRef.current);

      // Need to account for additional styles not included with getBoundingClientRect
      if (rect) {
        const { bottom, height, left, right, top, width, x, y } = rect;
        const paddingTop = parseFloat(computedStyles.paddingTop);
        const paddingLeft = parseFloat(computedStyles.paddingLeft);
        const paddingRight = parseFloat(computedStyles.paddingRight);
        const paddingBottom = parseFloat(computedStyles.paddingBottom);
        const marginTop = parseFloat(computedStyles.marginTop);
        const marginLeft = parseFloat(computedStyles.marginLeft);

        dispatch(
          setMiniModalState({
            sliderItem: itemToDisplay,
            sliderItemRect: {
              bottom: bottom + paddingBottom + marginTop,
              height: height - paddingTop - paddingBottom,
              left: left + marginLeft,
              right: right - paddingRight - marginLeft,
              top: top + paddingTop,
              width: width - paddingLeft - paddingRight,
              x: x + marginLeft,
              y: y + paddingTop,
            },
            showMiniModal: true,
          })
        );
      }
    }
  };

  const handleOnClick = () => {
    dispatch(setProductState(itemToDisplay as Product));
    navigate(`/gallery/${itemToDisplay.name}`);
  };

  if (!itemToDisplay) return null;

  return (
    <section
      ref={sliderItemRef}
      id={sliderItemId}
      className="slider-item pr-2"
      style={{ width: `${sliderItemWidth ? sliderItemWidth : 100}%` }}
      onMouseOver={handleMouseEnter}
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
    </section>
  );
};

export default SliderItem;

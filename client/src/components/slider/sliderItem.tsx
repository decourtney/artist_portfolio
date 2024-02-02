import React, { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Category, Product } from "../../utils/customClientTypes";
import { useAppDispatch } from "../../redux/hooks";
import { setProductState } from "../../redux/productSlice";
import { setMiniModalState } from "../../redux/miniModalSlice";

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
  const sliderItemRef = useRef<HTMLElement>(null);
  let { username: userParam } = useParams();
  if (!userParam) userParam = import.meta.env.VITE_BASE_USER;

  const handleMouseEnter = () => {
    if (sliderItemRef.current) {
      const rect = sliderItemRef.current?.getBoundingClientRect();

      if (rect) {
        const { bottom, height, left, right, top, width, x, y } = rect;

        dispatch(
          setMiniModalState({
            sliderItem: itemToDisplay,
            sliderItemRect: {
              bottom: bottom ,
              height: height ,
              left: left ,
              right: right,
              top: top ,
              width: width ,
              x: x ,
              y: y ,
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
      className="slider-item px-1 shadow-md"
      style={{ width: `${sliderItemWidth ? sliderItemWidth : 100}%` }}
      onMouseOver={handleMouseEnter}
    >
      {/* FIXME Shadow doesnt appear below image */}
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

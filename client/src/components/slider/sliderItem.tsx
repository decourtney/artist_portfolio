import React, { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Category, Product } from "../../utils/customClientTypes";
import { useAppDispatch } from "../../redux/hooks";
import { setProductState } from "../../redux/productSlice";
import { setMiniModalState } from "../../redux/miniModalSlice";
import DetectMobile from "../../utils/detectMobile";

interface SliderItemProps {
  partialSliderItemId: string;
  itemToDisplay: Category | Product;
  sliderItemWidth: number;
  marginPosition?: string | null;

  // onClick: (item: Category | Product) => void;
}

const baseCDN =
  import.meta.env.VITE_BASE_CDN ||
  "https://chumbucket.donovancourtney.dev/artist_portfolio";

const SliderItem = ({
  partialSliderItemId,
  itemToDisplay,
  sliderItemWidth,
  marginPosition,
}: SliderItemProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isMobile, setIsMobile] = useState(DetectMobile())
  const sliderItemRef = useRef<HTMLElement>(null);
  let { username: userParam } = useParams();
  if (!userParam) userParam = import.meta.env.VITE_BASE_USER;

  if (!itemToDisplay) return null;
  const sliderItemId = `${partialSliderItemId}-${itemToDisplay.name}`;

  const handleMouseOrTouchEvent = () => {
    if (sliderItemRef.current) {
      const rect = sliderItemRef.current?.getBoundingClientRect();

      if (rect) {
        const { bottom, height, left, right, top, width, x, y } = rect;
        if (!marginPosition) marginPosition = null; // Default null

        dispatch(
          setMiniModalState({
            modalId: sliderItemId,
            modalItem: itemToDisplay,
            modalItemRect: {
              bottom: bottom,
              height: height,
              left: left,
              right: right,
              top: top,
              width: width,
              x: x,
              y: y,
            },
            showMiniModal: true,
            marginPosition: marginPosition,
          })
        );
      }
    }
  };

const eventHandler = isMobile ? "onClick" : "onMouseEnter";

  return (
    <section
      ref={sliderItemRef}
      id={sliderItemId}
      className="slider-item px-1 shadow-md"
      style={{ width: `${sliderItemWidth ? sliderItemWidth : 100}%` }}
      // onMouseOver={handleMouseEnter}
      // onClick={handleMouseOrTouchEvent}
      {...{ [eventHandler]: handleMouseOrTouchEvent }}
    >
      {/* FIXME Shadow doesnt appear below image */}
      {itemToDisplay && (
        <img
          className="w-full h-full object-cover rounded-sm "
          src={`${baseCDN}/${userParam}/${itemToDisplay.image}`}
          alt={itemToDisplay.name}
          loading="lazy"
        />
      )}
    </section>
  );
};

export default SliderItem;

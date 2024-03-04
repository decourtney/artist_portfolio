import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Category, Product } from "../../utils/customClientTypes";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { setSliderItemState } from "../../redux/sliderItemSlice";
import { setMiniModalState } from "../../redux/miniModalSlice";
import DetectMobile from "../../utils/detectMobile";

// FIXME occasionally throwing errors while working on slider scroll amount. err serializableStateInvariantMiddleware taking too long

interface SliderItemProps {
  partialSliderItemId: string;
  itemToDisplay: Category | Product;
  sliderItemWidth: number;
  marginPosition?: string | undefined;

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
  const dispatch = useAppDispatch();
  const sliderItemState = useAppSelector(
    (state: RootState) => state.sliderItem.sliderItemState
  );
  const { isSliding } = useAppSelector(
    (state: RootState) => state.slider.globalSettings
  );
  const sliderItemRef = useRef<HTMLElement>(null);
  const isMobile = DetectMobile();
  const eventHandler = isMobile ? "onClick" : "onMouseEnter";
  const modalOpenDelay = isMobile ? 100 : 350;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  let { username: userParam } = useParams();
  if (!userParam) userParam = import.meta.env.VITE_BASE_USER;

  const sliderItemId = `${partialSliderItemId}-${itemToDisplay.name}`;

  useLayoutEffect(() => {
    const handleWindowResize = () => {
      if (sliderItemRef.current) {
        const rect = sliderItemRef.current?.getBoundingClientRect();

        if (rect) {
          const { bottom, height, left, right, top, width, x, y } = rect;
          if (!marginPosition) marginPosition = undefined; // Default undefined

          dispatch(
            setSliderItemState({
              sliderItemId: sliderItemId,
              sliderItemRect: {
                bottom: bottom,
                height: height,
                left: left,
                right: right,
                top: top,
                width: width,
                x: x,
                y: y,
              },
            })
          );
        }
      }
    };

    handleWindowResize();

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const handleMouseOrTouchEvent = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }

    timeoutId = setTimeout(() => {
      if (!marginPosition) marginPosition = undefined; // Default undefined

      dispatch(
        setMiniModalState({
          miniModalContainerId: sliderItemId,
          modalItem: itemToDisplay,
          showMiniModal: true,
          marginPosition: marginPosition,
        })
      );

      dispatch(
        setSliderItemState({
          sliderItemId: sliderItemId,
          sliderItemVisibility: "hidden",
          isSliderItemVisible: false,
        })
      );
    }, modalOpenDelay);
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return (
    <section
      ref={sliderItemRef}
      id={sliderItemId}
      className={`slider-item px-1 shadow-md`}
      style={{
        width: `${sliderItemWidth ? sliderItemWidth : 100}%`,
        visibility: `${sliderItemState[sliderItemId]?.sliderItemVisibility}`,
      }}
      {...(!isSliding && { [eventHandler]: handleMouseOrTouchEvent })}
      onMouseLeave={handleMouseLeave}
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

import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Category, Product } from "../../utils/customClientTypes";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../store";
import { setSliderItemState } from "../../redux/sliderItemSlice";
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
  const sliderItemState = useAppSelector(
    (state: RootState) => state.sliderItem.sliderItemState
  );
  const { productContainerId, product, productRect, showProductModal } =
    useAppSelector((state: RootState) => state.product.productState);
  const sliderItemRef = useRef<HTMLElement>(null);
  const isMobile = DetectMobile();
  const eventHandler = isMobile ? "onClick" : "onMouseEnter";
  const modalOpenDelay = isMobile ? 100 : 450;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  let { username: userParam } = useParams();
  if (!userParam) userParam = import.meta.env.VITE_BASE_USER;

  if (!itemToDisplay) return null;
  const sliderItemId = `${partialSliderItemId}-${itemToDisplay.name}`;

  useLayoutEffect(() => {
    const handleWindowResize = () => {
      if (sliderItemRef.current) {
        const rect = sliderItemRef.current?.getBoundingClientRect();

        if (rect) {
          const { bottom, height, left, right, top, width, x, y } = rect;
          if (!marginPosition) marginPosition = null; // Default null

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

  useEffect(() => {
    if (showProductModal) {
      if (sliderItemRef.current && sliderItemId === productContainerId) {
        // This is being called 4 times
        sliderItemRef.current.style.visibility =
          sliderItemState[productContainerId].sliderItemVisibility;
      }
    }
  }, [showProductModal]);

  const handleMouseOrTouchEvent = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }

    timeoutId = setTimeout(() => {
      if (!marginPosition) marginPosition = null; // Default null

      dispatch(
        setMiniModalState({
          miniModalContainerId: sliderItemId,
          modalItem: itemToDisplay,
          showMiniModal: true,
          marginPosition: marginPosition,
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
      style={{ width: `${sliderItemWidth ? sliderItemWidth : 100}%` }}
      {...{ [eventHandler]: handleMouseOrTouchEvent }}
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

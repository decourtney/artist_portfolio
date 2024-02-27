import React, { useState, useEffect, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { setProductState } from "../../redux/productSlice";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { Product } from "../../utils/customClientTypes";
import { current } from "@reduxjs/toolkit";
import { setSliderItemState } from "../../redux/sliderItemSlice";

const baseCDN =
  import.meta.env.VITE_BASE_CDN ||
  "https://chumbucket.donovancourtney.dev/artist_portfolio";

const ProductModal = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { productContainerId, product, productRect, showProductModal } =
    useAppSelector((state: RootState) => state.product.productState);
  const { sliderItemRect, sliderItemVisibility } = useAppSelector(
    (state: RootState) => state.sliderItem.sliderItemState[productContainerId]
  );
  const [imgDimensions, setImgDimensions] = useState<{
    width: number;
    height: number;
    margin: string;
  } | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [imageIsLoaded, setImageIsLoaded] = useState<boolean>(false);
  const [currentWindowSize, setCurrentWindowSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const [scope, animate] = useAnimate();

  let { username: userParam } = useParams();
  if (!userParam) userParam = import.meta.env.VITE_BASE_USER;

  useLayoutEffect(() => {
    const handleWindowResize = () => {
      setCurrentWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleWindowResize();

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useLayoutEffect(() => {
    // Construct the image URL and set it in state
    if (product) setImgSrc(`${baseCDN}/${userParam}/${product.image}`);
  }, [userParam, product]);

  useEffect(() => {
    if (imgSrc) {
      const img = new Image();
      img.src = imgSrc;

      img.onload = () => {
        const aspectRatio = img.width / img.height;
        let finalWidth;
        let finalHeight;

        if (aspectRatio > 1) {
          // Horizontal aspect image
          finalWidth = currentWindowSize.width;
          finalHeight = finalWidth / aspectRatio;

          // Check if finalHeight exceeds currentWindowSize.height
          if (finalHeight > currentWindowSize.height) {
            finalHeight = currentWindowSize.height;
            finalWidth = finalHeight * aspectRatio;
          }
        } else {
          // Vertical aspect image
          finalHeight = currentWindowSize.height;
          finalWidth = finalHeight * aspectRatio;

          // Check if finalWidth exceeds currentWindowSize.width
          if (finalWidth > currentWindowSize.width) {
            finalWidth = currentWindowSize.width;
            finalHeight = finalWidth / aspectRatio;
          }
        }

        // Calculate margins to center the modal
        const horizontalMargin = (currentWindowSize.width - finalWidth) / 2;
        const verticalMargin = (currentWindowSize.height - finalHeight) / 2;

        setImgDimensions({
          width: finalWidth,
          height: finalHeight,
          margin: `${verticalMargin}px ${horizontalMargin}px`,
        });
      };
    }
  }, [imgSrc, currentWindowSize.width, currentWindowSize.height]);

  useEffect(() => {
    if (imgDimensions) animateOpen();
  }, [imgDimensions]);

  const handleBack = () => {
    dispatch(
      setProductState({
        showProductModal: false,
      })
    );
    navigate(-1);
  };

  const animateOpen = async () => {
    await animate([
      [
        scope.current,
        {
          ...imgDimensions,
          x: 0,
          y: 0,
        },
        { duration: 0.2 },
      ],
    ]);
  };

  const animateClose = async () => {
    await animate([
      [
        scope.current,
        {
          ...sliderItemRect,
          margin: 0,
        },
        { duration: 0.2 },
      ],
    ]);

    dispatch(setProductState({ showProductModal: false }));
    navigate("/gallery/");
  };

  const closestSliderItem = (
    element: HTMLElement | null
  ): HTMLElement | null => {
    if (!element) return null;
    return element.closest(".slider-item");
  };

  return (
    <section id="productModal" className="absolute w-full h-full z-50">
      <motion.div ref={scope} style={{ ...productRect }}>
        <div
          id="product-background"
          className="absolute top-0 left-0 w-full h-full opacity-50 bg-black -z-10"
          onClick={animateClose}
        />
        <div id="product-buttons" className="relative">
          <button
            className="absolute -top-1 left-0 bg-transparent border-0 outline-none focus:outline-none"
            onClick={handleBack}
          >
            <span className="material-symbols-rounded bg-transparent text-2xl outline-none focus:outline-none">
              arrow_back
            </span>
          </button>

          <button
            className="absolute -top-1 right-0 bg-transparent border-0 outline-none focus:outline-none"
            onClick={animateClose}
          >
            <span className="material-symbols-rounded bg-transparent text-2xl outline-none focus:outline-none">
              close
            </span>
          </button>
        </div>

        {imgSrc && (
          <img
            src={imgSrc}
            className="w-full h-full object-cover rounded-sm"
            alt={`${product.name}`}
            loading="lazy"
          />
        )}
      </motion.div>
    </section>
  );
};

export default ProductModal;

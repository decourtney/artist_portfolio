import React, { useState, useEffect, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { RootState } from "../../store";
import { setProductState } from "../../redux/productSlice";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { Product } from "../../utils/customClientTypes";

const baseCDN =
  import.meta.env.VITE_BASE_CDN ||
  "https://chumbucket.donovancourtney.dev/artist_portfolio";

const ProductModal = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { product, productRect, showProductModal } = useAppSelector(
    (state: RootState) => state.product.productState
  );
  const [imgDimensions, setImgDimensions] = useState<{
    width: number;
    height: number;
    margin: string;
  } | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [imageIsLoaded, setImageIsLoaded] = useState<boolean>(false);
  const [scope, animate] = useAnimate();
  const maxModalWidth = window.innerWidth;
  const maxModalHeight = window.innerHeight;
  const productWidth = productRect.width;
  const productHeight = productRect.height;
  let { username: userParam } = useParams();
  if (!userParam) userParam = import.meta.env.VITE_BASE_USER;

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
          finalWidth = maxModalWidth;
          finalHeight = finalWidth / aspectRatio;

          // Check if finalHeight exceeds maxModalHeight
          if (finalHeight > maxModalHeight) {
            finalHeight = maxModalHeight;
            finalWidth = finalHeight * aspectRatio;
          }
        } else {
          // Vertical aspect image
          finalHeight = maxModalHeight;
          finalWidth = finalHeight * aspectRatio;

          // Check if finalWidth exceeds maxModalWidth
          if (finalWidth > maxModalWidth) {
            finalWidth = maxModalWidth;
            finalHeight = finalWidth / aspectRatio;
          }
        }

        // Calculate margins to center the modal
        const horizontalMargin = (maxModalWidth - finalWidth) / 2;
        const verticalMargin = (maxModalHeight - finalHeight) / 2;

        setImgDimensions({
          width: finalWidth,
          height: finalHeight,
          margin: `${verticalMargin}px ${horizontalMargin}px`,
        });
      };
    }
  }, [imgSrc, maxModalWidth, maxModalHeight]);

  useEffect(() => {
    if (imgDimensions) animateOpen();
  }, [imgDimensions]);

  const handleBack = () => {
    dispatch(setProductState({ showProductModal: false }));
    navigate(-1);
  };

  const handleClose = () => {
    animateClose()
   
  };

  const animateOpen = async () => {
    await animate([
      [
        scope.current,
        {
          width: imgDimensions?.width,
          height: imgDimensions?.height,
          margin: `${imgDimensions?.margin}`,
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
        scope.current, {
          ...productRect,
          margin: 0        
        },
        { duration: 0.2 }
      ]
    ])
    dispatch(setProductState({ showProductModal: false }));
    navigate("/gallery/");
  }

  return (
    <section id="productModal" className="absolute w-full h-full z-50">
      {/* Background */}
      <AnimatePresence mode="wait">
        <motion.div
          className="absolute w-full h-full bg-black opacity-75"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.50 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleClose}
        />
      </AnimatePresence>
      {/* content */}
      <motion.div
        ref={scope}
        className=""
        style={{ ...productRect }}
        //initial={{
        //  width: productWidth,
        //  height: productHeight,
        //}}
      >
        <div className="relative">
          {/* back button */}
          <button
            className="absolute -top-1 left-0 bg-transparent border-0 outline-none focus:outline-none bg-blue-500"
            onClick={handleBack}
          >
            <span className="material-symbols-rounded bg-transparent text-2xl outline-none focus:outline-none">
              arrow_back
            </span>
          </button>

          {/* close button */}
          <button
            className="absolute -top-1 right-0 bg-transparent border-0 outline-none focus:outline-none"
            onClick={handleClose}
          >
            <span className="material-symbols-rounded bg-transparent text-2xl outline-none focus:outline-none">
              close
            </span>
          </button>

          {/* image */}
          {imgSrc && (
            <img
              src={imgSrc}
              className="inline-block w-full h-full object-contain"
              alt={`${product.name}`}
              loading="lazy"
            />
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default ProductModal;

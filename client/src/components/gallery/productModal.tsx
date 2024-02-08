import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  useParams,
  useNavigate,
} from "react-router-dom";
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
  const maxModalWidth = window.innerWidth; // I think im getting the scrollbar in this value which is screwing with the modal
  const maxModalHeight = window.innerHeight;
  const productWidth = productRect.width
  const productHeight = productRect.height
  let { username: userParam } = useParams();
  if (!userParam) userParam = import.meta.env.VITE_BASE_USER;
  let imageWidth, imageHeight = 0

  useLayoutEffect(() => {
    // Construct the image URL and set it in state
    if (product) setImgSrc(`${baseCDN}/${userParam}/${product.image}`);
  }, [userParam, product]);

  useEffect(() => {
    if (imgSrc) {
      const img = new Image();
      img.src = imgSrc;
      imageWidth = img.width;
      imageHeight = img.height;
      
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        

        // Determine minimal width and height
        const minWidth = Math.max(imageWidth, maxModalWidth);
        const minHeight = Math.max(imageHeight, maxModalHeight);

        // Calculate final width and height based on the aspect ratio
        let finalWidth = Math.max(minWidth, minHeight);
        let finalHeight = finalWidth / aspectRatio;

        // TODO This will affect how horizontal images are displayed = smaller if not used. Will Probably keep this code.
        // If the calculated height is less than the minimum height, adjust dimensions
        // if (finalHeight < minHeight) {
        //   finalHeight = minHeight;
        //   finalWidth = finalHeight * aspectRatio;
        // }

        // Calculate the margin to center the modal relative to sliderItem size
        const horizontalMargin = (imageWidth - finalWidth) * 0.5;
        const verticalMargin = (imageHeight - finalHeight) * 0.5;

        setImgDimensions({
          width: finalWidth,
          height: finalHeight,
          margin: `${verticalMargin}px ${horizontalMargin}px`,
        });
      };
    }
  }, [imgSrc]);

  useEffect(() => {
    if (imgDimensions) animateOpen()
  }, [imgDimensions])

  const handleBack = () => {
    dispatch(setProductState({ showProductModal: false }));
    navigate(-1);
  };

  const handleClose = () => {
    dispatch(setProductState({ showProductModal: false }));
    navigate("/gallery/");
  };

  const animateOpen = async () => {
    await animate([
      [
        scope.current,
        {
          width: imgDimensions.width,
          height: imgDimensions.height,
          margin: 0,
          x:0,
          y:0,
        },
        { duration: 0.2 },
      ],
    ]);
  };

  return (
    <section
      id="productModal"
      className="absolute w-full h-full z-50"
    >
      <AnimatePresence mode="wait">
        <motion.div
          className="absolute w-full h-full bg-black opacity-75"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          onClick={handleClose}
        />
      </AnimatePresence>
      {/* content */}
      {/* create anim here using the dimesions state */}
      <motion.div
        ref={scope}
        className="w-full h-full max-h-screen"
        style={{...productRect}}
        initial={{ width: productWidth, height:productHeight, top:0, left:0 }}
      >
        {/* <AnimatePresence mode="wait"> */}
          <div
            className="relative w-full h-full"
          >

            {/* back button */}
            <button
              className="absolute -top-1 left-0 bg-transparent border-0 outline-none focus:outline-none"
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
            {/* <div className="flex justify-center items-center h-min w-min max-h-[96dvh] max-w-[96dvw] min-h-[96dvh] min-w-[96dvw]"> */}
            {imgSrc && (
              <img
                src={imgSrc}
                className="inline-block w-full h-full object-contain"
                alt={`${product.name}`}
                loading="lazy"
              />
            )}
            {/* </div> */}
          </div>
        {/* </AnimatePresence> */}
      </motion.div>
    </section >
  );
};

export default ProductModal;

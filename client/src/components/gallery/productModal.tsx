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
  let imageWidth = 0,
    imageHeight = 0;

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

        let finalWidth = maxModalWidth;
        let finalHeight = maxModalHeight;

        // Check if width should be constrained by height or vice versa
        if (aspectRatio > 1) {
          finalHeight = maxModalHeight;
          finalWidth = maxModalHeight * aspectRatio;
        } else {
          finalWidth = maxModalWidth;
          finalHeight = maxModalWidth / aspectRatio;
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
    dispatch(setProductState({ showProductModal: false }));
    navigate("/gallery/");
  };

  const animateOpen = async () => {
    await animate([
      [
        scope.current,
        {
          width: imgDimensions?.width,
          height: imgDimensions?.height,
          // margin: `${imgDimensions?.margin}`,
          x:0,
          y:0,
        },
        { duration: 0.2 },
      ],
    ]);
  };

  return (
    <section id="productModal" className="absolute w-full h-full z-50">
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
        className=" bg-orange-400"
        // style={{ ...productRect }}
        initial={{
          // width: productWidth,
          // height: productHeight,
          // top: 0,
          // left: 0,
          ...productRect,
        }}
      >
        {/* <AnimatePresence mode="wait"> */}
        <div className="relative w-full h-full">
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
    </section>
  );
};

export default ProductModal;

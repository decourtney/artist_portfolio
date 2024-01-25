import React, { useState, Dispatch, SetStateAction, useEffect, useLayoutEffect } from "react";
import {
  Navigate,
  useParams,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { Category, Product } from "../../utils/customClientTypes";

const baseCDN =
  import.meta.env.VITE_BASE_CDN ||
  "https://chumbucket.donovancourtney.dev/artist_portfolio";

const ProductModal = () => {
  const [loadedImageSrc, setLoadedImageSrc] = useState('');
  const productState = useAppSelector<Product>(
    (state) => state.product.productState.data
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let { username: userParam } = useParams();
  let productImage = {};

  if (!userParam) userParam = import.meta.env.VITE_BASE_USER;

  useEffect(() => {
    const img = new Image();
    const imgsrc = `${baseCDN}/${userParam}/${productState?.image}`;
    img.src = imgsrc;
    img.onload = () => {
      setLoadedImageSrc(imgsrc);
    };
  }, [productState]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleClose = () => {
    navigate("/gallery/");
  };

  return (
    <div
      id="productModal"
      className="fixed flex justify-center items-center w-full h-full z-50"
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
      <div className="fixed w-fit h-fit p-1 border-0 rounded-md outline-none focus:outline-none pointer-events-auto">
        {/* buttons */}
        <AnimatePresence mode="wait">
          <motion.div
            className="relative w-full h-full text-center text-light"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
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
            {loadedImageSrc && (
              <img
                src={loadedImageSrc}
                className="inline-block w-full h-full max-h-[96dvh] max-w-[96dvw] object-contain"
                alt={`${productState?.name}`}
                loading="lazy"
              />
            )}
            {/* </div> */}
          </motion.div>
        </AnimatePresence>
      </div>
    </div >
  );
};

export default ProductModal;

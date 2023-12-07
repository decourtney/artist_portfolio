import React, { useState, useEffect } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Product } from "../../utils/customClientTypes";
import { AnimatePresence, motion, useScroll, LayoutGroup } from "framer-motion";

const baseCDN =
  import.meta.env.VITE_BASE_CDN ||
  "https://chumbucket.donovancourtney.dev/artist_portfolio";

interface Props {
  item: Product;
  index: number;
}

const ImageCard = ({ item, index }: Props) => {
  const { username: userParam } = useParams();

  return (
    <>
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          // style={{ top: `${index * 10}rem`, left: `${index * 10}rem` }}
          className={`absolute top-1/2 left-1/2 w-full rounded-lg p-4 bg-white shadow-md`}
          initial={{ x: "50%", y: "-50%" }} // Initial scale
          animate={{ x: "-50%" }} // Animate the scale
          exit={{ x: "-150%" }}
          transition={{ duration: 1 }} // Animation duration
        >
          <div className="rounded-lg bg-white shadow-md">
            {item.image ? (
              <LazyLoadImage
                src={`${baseCDN}/${userParam}/${item.image}`}
                className="w-full"
                alt={`Slide ${index}`}
              />
            ) : (
              <div className="flex w-full h-12 justify-center items-center bg-blue-400">
                <div className="rounded-lg p-4 bg-white shadow-md">
                  {item.name}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default ImageCard;

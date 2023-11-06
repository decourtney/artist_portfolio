import React, { useState, useEffect } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AccountItem } from "../../utils/customClientTypes";
import { AnimatePresence, motion, useScroll, LayoutGroup } from "framer-motion";
import DragnDrop from "./dragndrop";

const baseCDN =
  process.env.BASE_CDN ||
  "https://chumbucket.donovancourtney.dev/artist_portfolio";

interface Props {
  item: AccountItem;
  index: number;
}

const ImageCard = ({item, index}:Props)=>{
  const { username: userParam } = useParams();

  return (
    <>
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={index}
          className="inline-block align-middle w-fit rounded-lg p-4 bg-white shadow-md"
          initial={{ x: "100%" }} // Initial scale
          animate={{ x: "0%" }} // Animate the scale
          exit={{ x: "-100%" }}
          transition={{  }} // Animation duration
        >
          <div className="rounded-lg bg-white shadow-md">
            {item.image ? (
              <LazyLoadImage
                src={`${baseCDN}/${userParam}/${item.image}`}
                className="max-w-full min-w-full h-auto"
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
}

export default ImageCard;
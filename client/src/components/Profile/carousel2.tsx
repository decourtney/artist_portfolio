import React, { useState, useEffect } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AccountItem } from "../../utils/customClientTypes";
import { motion, useScroll } from "framer-motion";
import DragnDrop from "./dragndrop";

// TODO Remove and just use .env
const baseCDN =
  process.env.BASE_CDN ||
  "https://chumbucket.donovancourtney.dev/artist_portfolio";

interface CarouselProps {
  accountItems: AccountItem[];
  numberToDisplay: number;
}

const Carousel2 = ({ accountItems, numberToDisplay }: CarouselProps) => {
  const { username: userParam } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex(Math.max(currentIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex(Math.min(currentIndex + 1, accountItems.length - 5));
  };

  // TODO Styles and anims
  return (
    <section className="relative flex flex-nowrap overflow-hidden">
      {accountItems.map((item, index) => {
        // Scale cards down from center
        const position = index - Math.floor(accountItems.length / 2);
        const scale = 1 - Math.abs(position) * 0.1; // Adjust the scale factor as needed

        return (
          <motion.div
            key={index}
            className="flex w-full justify-center items-center"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-lg p-4 bg-white shadow-md">
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
        );
      })}
      <motion.button
        className="prev absolute top-1/2 left-0 -translate-y-1/2 p-2 rounded-full bg-blue-400 cursor-pointer"
        onClick={handlePrevious}
      >
        Previous
      </motion.button>
      <motion.button
        className="next absolute top-1/2 right-0 -translate-y-1/2 p-2 rounded-full bg-blue-400 cursor-pointer"
        onClick={handleNext}
      >
        Next
      </motion.button>
    </section>
  );
};

export default Carousel2;

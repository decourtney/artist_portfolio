import React, { useState, useEffect } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AccountItem } from "../../utils/customClientTypes";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import DragnDrop from "./dragndrop";
import ImageCard from "./imageCard";

// TODO Remove and just use .env
const baseCDN =
  process.env.BASE_CDN ||
  "https://chumbucket.donovancourtney.dev/artist_portfolio";

interface CarouselProps {
  accountItems: AccountItem[];
  numberToDisplay: number;
}

const Carousel = ({ accountItems, numberToDisplay }: CarouselProps) => {
  const { username: userParam } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex(
      (currentIndex - 1 + accountItems.length) % accountItems.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % accountItems.length);
  };

  // Adjust for odd number of images
  let startOffset = Math.floor(numberToDisplay / 2);

  // Adjust for even number of images
  if (numberToDisplay % 2 === 0) {
    startOffset--;
  }

  // Current index displayed center for odd numberToDisplay and even centers between current & next index
  const visibleItems = [];
  for (let i = 0; i < numberToDisplay; i++) {
    const itemIndex =
      (currentIndex - startOffset + i + accountItems.length) %
      accountItems.length;

    visibleItems.push(accountItems[itemIndex]);
  }

  // TODO Styles and anims
  return (
    <section className="relative flex flex-grow justify-center items-center overflow-hidden">
      <div className="inline-block whitespace-nowrap max-w-full">
        <ImageCard item={accountItems[currentIndex]} index={currentIndex} />
      </div>
      {/* <AnimatePresence mode="wait">
        <motion.div
          className="flex w-full justify-center items-center"
          initial={{ x: "100%" }} // Initial scale
          animate={{ x: "0%" }} // Animate the scale
          exit={{ x: "-100%" }}
          transition={{ duration: 1 }} // Animation duration
        >
          <div className="rounded-lg p-4 bg-white shadow-md">
            {accountItems[currentIndex].image ? (
              <LazyLoadImage
                src={`${baseCDN}/${userParam}/${accountItems[currentIndex].image}`}
                className="w-full"
                alt={`Slide ${currentIndex}`}
              />
            ) : (
              <div className="flex w-full h-12 justify-center items-center bg-blue-400">
                <div className="rounded-lg p-4 bg-white shadow-md">
                  {accountItems[currentIndex].name}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence> */}
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

export default Carousel;

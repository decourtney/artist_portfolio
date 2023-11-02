import React, { useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AccountItem } from "../../utils/customClientTypes";
import image1 from "../../images/artroom.jpg";
import image2 from "../../images/gallery_hall.jpg";
import image3 from "../../images/profile_pic.png";
import { motion } from "framer-motion";

const images = [image1, image2, image3];

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
    <section className="relative flex flex-nowrap overflow-hidden">
      {visibleItems.map((item, index) => (
        <div key={index} className="flex w-full justify-center items-center">
          {item.image ? (
            <LazyLoadImage
              src={`${baseCDN}/${userParam}/${item.image}`}
              className="w-full"
              alt={`Slide ${index}`}
            />
          ) : (
            <div className="flex justify-center items-center">{item.name}</div>
          )}
        </div>
      ))}

      <motion.button
        className="prev absolute top-1/2 left-0 -translate-y-1/2 p-2 rounded-full bg-blue-400 cursor-pointer"
        onClick={handlePrevious}
        // whileTap={{ scale: 0.9 }}
      >
        Previous
      </motion.button>
      <motion.button
        className="next absolute top-1/2 right-0 -translate-y-1/2 p-2 rounded-full bg-blue-400 cursor-pointer"
        onClick={handleNext}
        // whileTap={{ scale: 0.9 }}
      >
        Next
      </motion.button>
    </section>
  );
};

export default Carousel;

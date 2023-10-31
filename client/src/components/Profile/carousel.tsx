import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import image1 from "../../images/artroom.jpg";
import image2 from "../../images/gallery_hall.jpg";
import image3 from "../../images/profile_pic.png";
import { motion } from "framer-motion";

const images = [image1, image2, image3];

const baseCDN =
  process.env.BASE_CDN ||
  "https://chumbucket.donovancourtney.dev/artist_portfolio";

interface CarouselProps {
  objs: string[];
}

const Carousel = ({ objs }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevIndex = (currentIndex - 1 + images.length) % images.length;
  const nextIndex = (currentIndex + 1) % images.length;

  const handlePrevious = () => {
    setCurrentIndex(prevIndex);
  };

  const handleNext = () => {
    setCurrentIndex(nextIndex);
  };

  // console.log(objs)
  return (
    <section className="relative flex flex-nowrap overflow-auto">
      <div className="flex w-full justify-center items-center">
        <LazyLoadImage
          src={images[prevIndex]}
          className="w-full"
          alt="Previous Slide"
        />
      </div>
      <div className="flex w-full justify-center items-center">
        <LazyLoadImage
          src={images[currentIndex]}
          className="w-full"
          alt="Current Slide"
        />
      </div>
      <div className="flex w-full justify-center items-center">
        <LazyLoadImage
          src={images[nextIndex]}
          className="w-full"
          alt="Next Slide"
        />
      </div>

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

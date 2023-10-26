import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import { Carousel } from "flowbite-react";
import image1 from "../../images/artroom.jpg";
import image2 from "../../images/gallery_hall.jpg";
import image3 from "../../images/profile_pic.png";
import { motion } from "framer-motion";

const images = [image1, image2, image3];

const ProfileCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevIndex = (currentIndex - 1 + images.length) % images.length;
  const nextIndex = (currentIndex + 1) % images.length;

  const handlePrevious = () => {
    setCurrentIndex(prevIndex);
  };

  const handleNext = () => {
    setCurrentIndex(nextIndex);
  };

  // TODO Create smooth anims for carousel scrolling. Maybe style prev/next images so that they're half on/off screen?
  return (
    <>
      <section className="relative flex justify-between items-center overflow-hidden ">
        <div id="slide" className="flex justify-center w-1/2 overflow-hidden">
          <img
            src={images[prevIndex]}
            className=" h-full "
            alt="Slide 1"
          />
        </div>
        <div id="slide" className="flex justify-center w-full overflow-hidden">
          <img
            src={images[currentIndex]}
            className=" h-full "
            alt="Slide 1"
          />
        </div>
        <div id="slide" className="flex justify-center w-1/2 overflow-hidden">
          <img
            src={images[nextIndex]}
            className=" h-full "
            alt="Slide 1"
          />
        </div>

        <motion.button
          id="prevButton"
          className="prev absolute top-1/2 left-0 -translate-y-1/2 p-2 rounded-full bg-blue-400 cursor-pointer"
          onClick={handlePrevious}
        >
          Previous
        </motion.button>
        <motion.button
          id="nextButton"
          className="next absolute top-1/2 right-0 -translate-y-1/2 p-2 rounded-full bg-blue-400 cursor-pointer"
          onClick={handleNext}
        >
          Next
        </motion.button>
      </section>
    </>
  );
};

export default ProfileCarousel;

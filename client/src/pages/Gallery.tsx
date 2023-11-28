import React, { useEffect } from "react";
import Auth from "../utils/auth";
import {
  motion,
  useAnimate,
  AnimatePresence,
  usePresence,
} from "framer-motion";
import { LoggedInUser } from "../utils/customClientTypes";

const Gallery = () => {
  return (
    <motion.section
      initial={{ x: "-100%" }}
      animate={{ x: "0%" }}
      exit={{ x: "-100%" }}
      transition={{ duration: 1 }}
      className="absolute flex justify-center items-center w-full min-h-screen bg-dark"
    >
      <div className="flex justify-center items-center">
        <p className="text-lg font-black">Gallery</p>
      </div>
    </motion.section>
  );
};

export default Gallery;

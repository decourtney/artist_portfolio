import React, { useEffect } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import Auth from "../utils/auth";
import {
  motion,
  useAnimate,
  AnimatePresence,
  usePresence,
} from "framer-motion";
import { LoggedInUser } from "../utils/customClientTypes";

const Gallery = () => {
  const { categoryName, collectionName } = useParams();


  console.log("cat param", categoryName);
  console.log("col param", collectionName);
  return (
    <motion.section
      initial={{ x: "-100%" }}
      animate={{ x: "0%" }}
      exit={{ x: "-100%" }}
      transition={{ duration: 1 }}
      className="absolute flex flex-col justify-center items-center w-full min-h-screen bg-dark"
    >
      <div className="flex justify-center items-center">
        <p className="text-lg font-black">Gallery</p>
      </div>

      {categoryName && <div className="w-36 h-36 bg-orange-500"></div>}
      {collectionName && <div className="w-36 h-36 bg-blue-500"></div>}
    </motion.section>
  );
};

export default Gallery;

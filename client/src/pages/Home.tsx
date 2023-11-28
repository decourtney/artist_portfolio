import React, { useEffect, useRef } from "react";
import Auth from "../utils/auth";
import {
  motion,
  useAnimate,
  AnimatePresence,
  usePresence,
} from "framer-motion";
import { LoggedInUser } from "../utils/customClientTypes";

import mountains from "../images/mountains.jpg"

const Home = () => {
 

  // TODO Make home a tall page with rows of categories
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-secondary"
    >
      <div className="flex justify-center">
        <div className="w-full">
          <img src={mountains} className="w-full" />
        </div>

      </div>
    </motion.section>
  );
};

export default Home;

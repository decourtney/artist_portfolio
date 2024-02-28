import React, { useEffect, useRef, lazy } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { resetStore } from "../redux/resetStore";
import { motion } from "framer-motion";

import mountains from "../images/mountains.jpg";

const Home = () => {
  const dispatch = useAppDispatch();

  dispatch(resetStore());
  return (
    <section
      id="home"
      className="flex flex-col justify-center items-center w-full h-full min-h-screen max-h-screen bg-secondary -z-10"
    >
      <motion.div initial={{}} animate={{}} exit={{}} className="w-full h-full">
        <img src={mountains} className="w-full" />
      </motion.div>
    </section>
  );
};

export default Home;

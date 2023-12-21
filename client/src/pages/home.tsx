import React, { useEffect, useRef, lazy } from "react";
import { motion } from "framer-motion";

import mountains from "../images/mountains.jpg";

const Home = () => {
  return (
    <>
      <section className="flex flex-col justify-center items-center w-full min-h-screen bg-secondary -z-10">
        <motion.div
          initial={{}}
          animate={{}}
          exit={{ y: "-100%", opacity: 0, transition: { duration: 0.5 } }}
          className="w-full h-full"
        >
          <img src={mountains} className="w-full" />
        </motion.div>
      </section>
    </>
  );
};

export default Home;

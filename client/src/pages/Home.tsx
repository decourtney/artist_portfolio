import React, { useEffect } from "react";
import Auth from "../utils/auth";
import {
  motion,
  useAnimate,
  AnimatePresence,
  usePresence,
} from "framer-motion";
import { LoggedInUser } from "../utils/customClientTypes";

const Home = () => {
  const [isPresent, safeToRemove] = usePresence();
  const [sectionRef, animateSectionRef] = useAnimate();
  const loggedInUser = Auth.getProfile() as LoggedInUser;

  // TODO work on transitions
  return (
    <motion.section
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 1 }}
      className="testing flex flex-col flex-grow bg-primary"
    >
      <div className="flex flex-grow justify-center items-center">
        <p className="text-lg font-black">HOME</p>
      </div>
    </motion.section>
  );
};

export default Home;

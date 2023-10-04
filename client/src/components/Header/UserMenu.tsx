import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import menu_icon from "../../images/menu_FILL0_wght200_GRAD-25_opsz20.svg";
import {
  motion,
  AnimatePresence,
  useAnimate,
  usePresence,
} from "framer-motion";
import Nav from "./Navbar";
import Menu from "./Menu";
import tempPic from "../../images/profile_pic.png";

const UserMenu = () => {
  const [isDisplayMenu, setIsDisplayMenu] = useState(false);

  const handleOnClick = () => {
    setIsDisplayMenu(!isDisplayMenu);
  };

  const handleMouseEnter = () => {
    setIsDisplayMenu(true);
  };

  const handleMouseLeave = () =>{
    setIsDisplayMenu(false);
  }

  return (
    <motion.div
      className=" flex justify-end items-center"
      onClick={handleOnClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      exit={{ opacity: [1, 0] }}
    >
      <AnimatePresence>
        {isDisplayMenu && <Menu handleOnClick={handleOnClick} />}
      </AnimatePresence>
      {/* <div className=""> */}
      <img
        src={tempPic}
        className="h-8 drop-shadow-2xl pointer-events-auto z-10"
        alt="User profile picture"
      />
      {/* </div> */}
    </motion.div>
  );
};

export default UserMenu;

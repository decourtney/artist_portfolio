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
import UserMenu from "./UserMenu";
import tempPic from "../../images/profile_pic.png";
import Auth from "../../utils/auth";


const Header = () => {
  const [isDisplayNavMenu, setIsDisplayNavMenu] = useState(false);
  const [isDisplayUserMenu, setIsDisplayUserMenu] = useState(true);

  const handleOnNavClick = () => {
    setIsDisplayNavMenu(!isDisplayNavMenu);
  };

  return (
    <nav className="relative z-50">
      <AnimatePresence mode="wait">
        {isDisplayNavMenu && <Nav handleOnNavClick={handleOnNavClick} />}
      </AnimatePresence>

      <section className="absolute top-0 left-0 flex justify-center w-full">
        <div className="flex justify-between items-center w-full mx-[2%] p-[1%]">
          <div className="flex justify-start w-full">
            <motion.button
              className=""
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 1 }}
            >
              <p className="text-plight text-lg font-black mx-[5%] my-[1%]">
                <Link to="/">G</Link>
              </p>
            </motion.button>
          </div>

          <div className="flex justify-end items-center w-full">
            <AnimatePresence>{Auth.loggedIn() && <UserMenu />}</AnimatePresence>
            <motion.button
              className=""
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 1 }}
              onClick={() => handleOnNavClick()}
            >
              <span className="material-symbols-rounded mx-[5%] align-middle text-plight">
                more_vert
              </span>
            </motion.button>
          </div>
        </div>
      </section>
    </nav>
  );
};

export default Header;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import Nav from "./nav";
import Auth from "../../utils/auth";

const Header = () => {
  const [isDisplayNavMenu, setIsDisplayNavMenu] = useState(false);

  const handleOnNavClick = () => {
    setIsDisplayNavMenu(!isDisplayNavMenu);
  };

  return (
    <nav className="relative z-20">
      <AnimatePresence mode="wait">
        {isDisplayNavMenu && <Nav handleOnNavClick={handleOnNavClick} />}
      </AnimatePresence>

      <section className="absolute top-0 left-0 flex justify-center w-full text-plight">
        <div className="flex justify-between items-center w-full mx-[2%] p-[1%]">
          {/* Artist brand/name/icon */}
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
            {/* Display logout icon */}
            {Auth.loggedIn() && (
              <div className="flex justify-end w-full">
                <span
                  className="material-symbols-rounded text-xl cursor-pointer"
                  onClick={() => Auth.logout()}
                >
                  logout
                </span>
              </div>
            )}
            {/* Display nav menu icon */}
            <motion.button
              className="ml-1"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 1 }}
              onClick={() => handleOnNavClick()}
            >
              <span className="material-symbols-rounded align-middle">
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

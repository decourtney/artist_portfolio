import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Link as LinkScroll } from "react-scroll";
import Nav from "./nav";
import Auth from "../../utils/auth";

const Header = () => {
  const [isDisplayNavMenu, setIsDisplayNavMenu] = useState(false);

  const handleOnNavClick = () => {
    setIsDisplayNavMenu(!isDisplayNavMenu);
  };

  return (
    <nav className="fixed top-0 w-full z-50">
      {/* <div className="relative"> */}
      <AnimatePresence mode="wait">
        {isDisplayNavMenu && <Nav handleOnNavClick={handleOnNavClick} />}
      </AnimatePresence>
      {/* </div> */}

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

          {/* TODO temp links for testing */}
          <div className="flex flex-row space-x-5">
            <LinkScroll
              to="/"
              spy={true}
              smooth={true}
              duration={500}
              isDynamic={true}
            >
              <motion.p
                className="drop-shadow-[3px_3px_2px_#183D3D]"
                whileHover={{
                  scale: 1.1,
                  filter: "drop-shadow(5px 8px 6px #183D3D)",
                }}
              >
                Home
              </motion.p>
            </LinkScroll>
            <LinkScroll
              to="gallery"
              spy={true}
              smooth={true}
              duration={500}
              isDynamic={true}
            >
              <motion.p
                className="drop-shadow-[3px_3px_2px_#183D3D]"
                whileHover={{
                  scale: 1.1,
                  filter: "drop-shadow(5px 8px 6px #183D3D)",
                }}
              >
                Gallery
              </motion.p>
            </LinkScroll>
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
                more_horiz
              </span>
            </motion.button>
          </div>
        </div>
      </section>
    </nav>
  );
};

export default Header;

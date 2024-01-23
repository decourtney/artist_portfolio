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
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* <div className="relative"> */}
      <AnimatePresence mode="wait">
        {isDisplayNavMenu && <Nav handleOnNavClick={handleOnNavClick} />}
      </AnimatePresence>
      {/* </div> */}

      <nav className="flex w-full h-14 px-24 text-plight text-lg font-black bg-gradient-to-b from-dark via-dark to-transparent ">
        {/* Artist brand/name/icon */}
        <div className="flex flex-row justify-start items-center w-full h-full">
          <Link to="/">
            <motion.button
              className="drop-shadow-[2px_2px_1px_#183D3D]"
              whileHover={{
                scale: 1.05,
                filter: "drop-shadow(2px 2px 2px #183D3D)",
              }} whileTap={{ scale: 1 }}
            >
              <h2>
                G
              </h2>
            </motion.button>
          </Link>
        </div>

        {/* TODO temp links for testing */}
        <div className="flex flex-row justify-end items-center w-full h-full space-x-5">

          {/* Home */}
          <Link to="/">
            <motion.div
              className="drop-shadow-[2px_2px_1px_#183D3D]"
              whileHover={{
                scale: 1.05,
                filter: "drop-shadow(2px 2px 2px #183D3D)",
              }} whileTap={{ scale: 1 }}

            >
              <h2>
                Home
              </h2>
            </motion.div>
          </Link>

          {/* Gallery */}
          <Link to="gallery">
            <motion.div
              className="drop-shadow-[2px_2px_1px_#183D3D]"
              whileHover={{
                scale: 1.05,
                filter: "drop-shadow(2px 2px 2px #183D3D)",
              }} whileTap={{ scale: 1 }}

            >
              <h2>
                Gallery
              </h2>
            </motion.div>
          </Link>

          {/* About */}
          <Link to="gallery">
            <motion.div
              className="drop-shadow-[2px_2px_1px_#183D3D]"
              whileHover={{
                scale: 1.05,
                filter: "drop-shadow(2px 2px 2px #183D3D)",
              }} whileTap={{ scale: 1 }}

            >
              <h2>
                About
              </h2>
            </motion.div>
          </Link>

          {/* Contact */}
          <Link to="gallery">
            <motion.div
              className="drop-shadow-[2px_2px_1px_#183D3D]"
              whileHover={{
                scale: 1.05,
                filter: "drop-shadow(2px 2px 2px #183D3D)",
              }} whileTap={{ scale: 1 }}
            >
              <h2>
                Contact
              </h2>
            </motion.div>
          </Link>

          {/* Logout */}
          {Auth.loggedIn() && (
            <motion.div
              className="drop-shadow-[2px_2px_1px_#183D3D]"
              whileHover={{
                scale: 1.05,
                filter: "drop-shadow(2px 2px 2px #183D3D)",
              }} whileTap={{ scale: 1 }}
              onClick={() => Auth.logout()}>
              <h2 className="">
                Logout
              </h2>
            </motion.div>
          )}

          {/* Reduced Nav Icon */}
          <motion.button
            className="drop-shadow-[2px_2px_1px_#183D3D]"
            whileHover={{
              scale: 1.05,
              filter: "drop-shadow(2px 2px 2px #183D3D)",
            }} whileTap={{ scale: 1 }}
            onClick={() => handleOnNavClick()}
          >
            <span className="material-symbols-rounded align-middle"> {/* Change to invisible after logic is added  */}
              more_horiz
            </span>
          </motion.button>
        </div>

        {/* <div className="flex justify-end items-center w-full"> */}
        {/* Display logout icon */}
        {/* {Auth.loggedIn() && (
            <div className="flex justify-end w-full">
              <span
                className="material-symbols-rounded text-xl cursor-pointer"
                onClick={() => Auth.logout()}
              >
                <h2>
                  Logout
                </h2>
              </span>
            </div>
          )} */}
        {/* Display nav menu icon */}
        {/* <motion.button
            className="ml-1"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 1 }}
            onClick={() => handleOnNavClick()}
          >
            <span className="material-symbols-rounded align-middle">
              more_horiz
            </span>
          </motion.button> */}
        {/* </div> */}
      </nav>
      {/* <div className="h-5 bg-gradient-to-b from-dark via-dark to-transparent"></div> */}
    </header>
  );
};

export default Header;

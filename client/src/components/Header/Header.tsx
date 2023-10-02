import React, { useState } from "react";
import { Link } from "react-router-dom";
import menu_icon from "../../images/menu_FILL0_wght200_GRAD-25_opsz20.svg";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "./Navbar";

const Header = () => {
  const [isDisplayMenu, setIsDisplayMenu] = useState(false);

  const handleOnClick = () => {
    setIsDisplayMenu(!isDisplayMenu);
  };

  return (
    <nav className="relative z-50">
      <AnimatePresence mode="wait">
        {isDisplayMenu && <Nav handleOnClick={handleOnClick} />}
      </AnimatePresence>

      <section className="absolute top-0 left-0 flex justify-center w-full">
        <div className="flex justify-between items-center w-full mx-[2%] p-[1%]">
          <motion.button
            className=" "
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 1 }}
          >
            <p className="text-plight text-lg font-black mx-[5%] my-[1%]">
              <Link to="/">G</Link>
            </p>
          </motion.button>

          <motion.button
            className=" "
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 1 }}
            onClick={() => handleOnClick()}
          >
            <span className="material-symbols-rounded mx-[5%] align-middle text-plight">
              more_vert
            </span>
          </motion.button>
        </div>
      </section>
    </nav>
  );
};

export default Header;

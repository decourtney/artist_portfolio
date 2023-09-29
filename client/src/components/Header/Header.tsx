import React from "react";
import menu_icon from "../../images/menu_FILL0_wght200_GRAD-25_opsz20.svg";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <>
      <nav className="absolute top-0 left-0 flex justify-center items-center w-full">
        <section className="flex justify-between items-center w-full mx-[2%] p-[1%]">
          <motion.button
            className=" "
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 1 }}
          >
            <p className="text-light text-lg font-black mx-[5%] my-[1%] pointer-events-none">
              G
            </p>
          </motion.button>
          <motion.button
            className=" "
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 1 }}
          >
            <span className="material-symbols-rounded mx-[5%] align-middle text-light pointer-events-none">
              more_vert
            </span>
          </motion.button>
        </section>
      </nav>
    </>
  );
};

export default Header;

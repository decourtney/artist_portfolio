import React from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  // Use location to determine what to show on footer
  const location = useLocation();
  console.log("Current location: ", location.pathname);
  return (
    <>
      {/* Flip conditional back before deploy */}
      {location.pathname !== "/profile" ? (
        // Profile Footer
        null
        // <footer className="sticky bottom-0 flex justify-around items-center p-[1%] bg-white z-50">
        //   <motion.button
        //     className=" "
        //     whileHover={{ scale: 1.2 }}
        //     whileTap={{ scale: 1 }}
        //   >
        //     <span className="material-symbols-rounded align-middle text-3xl text-secondary pointer-events-none">
        //       home
        //     </span>
        //   </motion.button>
        //   <motion.button
        //     className=" "
        //     whileHover={{ scale: 1.2 }}
        //     whileTap={{ scale: 1 }}
        //   >
        //     <span className="material-symbols-rounded align-middle text-3xl text-secondary pointer-events-none">
        //       settings
        //     </span>
        //   </motion.button>
        // </footer>
      ) : (
        <footer className="flex justify-center content-center w-full h-full bg-dark">
          <p className="text-light text-lg">&copy; 2023 Donovan Courtney</p>
        </footer>
      )}
    </>
  );
};

export default Footer;

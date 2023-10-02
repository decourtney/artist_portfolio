import React, { useEffect } from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import {
  motion,
  useAnimate,
  AnimatePresence,
  usePresence,
} from "framer-motion";

interface NavProps {
  handleOnClick: () => void;
}

const Nav = ({ handleOnClick }: NavProps) => {
  const [isPresent, safeToRemove] = usePresence();
  const [navCardRef, animateNavCardRef] = useAnimate();

  useEffect(() => {
    if (isPresent) {
      const openMenu = async () => {
        animateNavCardRef(navCardRef.current, {
          right: 0,
          width: ["0%", "100%"],
          borderRadius: ["100% 0% 0% 100%", "0% 0% 0% 0%"],
        });
        animateNavCardRef("p", { opacity: [0, 1] }, { delay: 0.2 });
      };
      openMenu();
    } else {
      const closeMenu = async () => {
        animateNavCardRef("p", { opacity: [1, 0] });
        await animateNavCardRef(
          navCardRef.current,
          {
            left: 0,
            width: ["100%", "0%"],
            borderRadius: ["0% 0% 0% 0%", "0% 100% 100% 0%"],
          },
          { delay: 0.1 }
        );
        safeToRemove();
      };
      closeMenu();
    }
  }, [isPresent]);

  return (
    <motion.div
      ref={navCardRef}
      className="absolute font-black text-2xl flex flex-col justify-center items-center w-full h-[100vh] bg-light pointer-events-auto [&>p]:opacity-0"
      onClick={handleOnClick}
    >
      <Link to={"/"}>
        <p>Home</p>
      </Link>
      <Link to={"/gallery"}>
        <p>Gallery</p>
      </Link>
      <Link to={"/about"}>
        <p>About</p>
      </Link>
      <Link to={"/contact"}>
        <p>Contact</p>
      </Link>
      <Link to={"/profile"}>
        <p>Profile</p>
      </Link>
    </motion.div>
  );
};

export default Nav;

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import {
  motion,
  useAnimate,
  AnimatePresence,
  usePresence,
} from "framer-motion";
import { LoggedInUser } from "../../utils/customClientTypes";

interface NavProps {
  handleOnNavClick: () => void;
}

// TODO Change Nav animation speed and maybe design
const Nav = ({ handleOnNavClick }: NavProps) => {
  const [isPresent, safeToRemove] = usePresence();
  const [navCardRef, animateNavCardRef] = useAnimate();
  const loggedInUser = Auth.getProfile() as LoggedInUser;

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
    <motion.section
      ref={navCardRef}
      className="absolute flex flex-col justify-center items-center w-full h-[100vh] space-y-2 font-black text-[5vh] text-dark bg-light pointer-events-auto z-50"
      onClick={handleOnNavClick}
    >
      <Link to="/">
        <motion.p
          className="drop-shadow-[3px_3px_2px_#183D3D]"
          whileHover={{
            scale: 1.1,
            filter: "drop-shadow(5px 8px 6px #183D3D)",
          }}
        >
          Home
        </motion.p>
      </Link>
      <Link to="gallery">
        <motion.p
          className="drop-shadow-[3px_3px_2px_#183D3D]"
          whileHover={{
            scale: 1.1,
            filter: "drop-shadow(5px 8px 6px #183D3D)",
          }}
        >
          Gallery
        </motion.p>
      </Link>
      <Link to={"about"}>
        <motion.p
          className="drop-shadow-[3px_3px_2px_#183D3D]"
          whileHover={{
            scale: 1.1,
            filter: "drop-shadow(5px 8px 6px #183D3D)",
          }}
        >
          About
        </motion.p>
      </Link>
      <Link to={"contact"}>
        <motion.p
          className="drop-shadow-[3px_3px_2px_#183D3D]"
          whileHover={{
            scale: 1.1,
            filter: "drop-shadow(5px 8px 6px #183D3D)",
          }}
        >
          Contact
        </motion.p>
      </Link>
      <Link
        to={loggedInUser ? `/profile/${loggedInUser.data.username}` : "/login"}
      >
        {loggedInUser ? (
          <motion.p
            className="drop-shadow-[3px_3px_2px_#183D3D]"
            whileHover={{
              scale: 1.1,
              filter: "drop-shadow(5px 8px 6px #183D3D)",
            }}
          >
            Profile
          </motion.p>
        ) : (
          <motion.p
            className="drop-shadow-[3px_3px_2px_#183D3D]"
            whileHover={{
              scale: 1.1,
              filter: "drop-shadow(5px 8px 6px #183D3D)",
            }}
          >
            Login
          </motion.p>
        )}
      </Link>
    </motion.section>
  );
};

export default Nav;

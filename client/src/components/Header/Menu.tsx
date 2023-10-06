// Not currently in use but I don't want to lose this component yet.

import React, { useEffect } from "react";
import {
  motion,
  useAnimate,
  usePresence,
} from "framer-motion";
import Auth from "../../utils/auth";


interface MenuProps {
  handleOnClick: () => void;
}

const Menu = ({ handleOnClick }: MenuProps) => {
  const [isPresent, safeToRemove] = usePresence();
  const [userMenuRef, animateUserMenuRef] = useAnimate();

  useEffect(() => {
    if (isPresent) {
      const openMenu = async () => {
        animateUserMenuRef("div", {
          direction: "rtl",
          width: ["0%", "100%"],
          borderRadius: ["50% 0% 0% 50%", "0% 0% 0% 0%"],
        });
        animateUserMenuRef("p", { opacity: [0, 1] }, { delay: 0.2 });
      };
      openMenu();
    } else {
      const closeMenu = async () => {
        animateUserMenuRef("p", { opacity: [1, 0] });
        await animateUserMenuRef(
          "div",
          {
            width: ["100%", "0%"],
            borderRadius: ["0% 0% 0% 0%", "50% 0% 0% 50%"],
          },
          { delay: 0.2 }
        );
        safeToRemove();
      };
      closeMenu();
    }
  }, [isPresent]);

  return (
    <motion.div
      ref={userMenuRef}
      className=" "
      initial={{ x: 15 }}
      style={{ direction: "rtl" }}
    >
      <div className="w-full bg-light">
        <p className="ml-2 mr-6 font-bold text-sm pointer-events-auto cursor-pointer" onClick={()=> Auth.logout()}>LOGOUT</p>
      </div>
    </motion.div>
  );
};

export default Menu;

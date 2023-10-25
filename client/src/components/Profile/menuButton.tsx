import { useState, useRef } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../utils/mutations";
import { UserData } from "../../utils/customClientTypes";
import { motion } from "framer-motion";

interface ButtonProps {
  icon: string;
  label: string;
  handleButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const MenuButton = ({ icon, label, handleButtonClick }: ButtonProps) => {
  return (
    <motion.button
      id={label.split(" ",1)[0]}
      type="button"
      className="flex justify-around items-center w-full h-24 px-4 text-pdark font-semibold bg-plight rounded-xl shadow-[3px_3px_5px_#301E67]"
      whileHover={{ scale: 1.01, boxShadow: "5px 8px 10px #301E67" }}
      whileTap={{ scale: 0.99, boxShadow: "0px 0px 10px #5B8FB9" }}
      transition={{ delay: 0.1 }}
      onClick={handleButtonClick}
    >
      <div className="flex flex-row text-left items-center w-full space-x-3 pointer-events-none">
        <span className="material-symbols-rounded text-4xl">{icon}</span>

        {/* NOTE Using viewport width to control text size. May need additional attention */}
        <p className="text-[5vw] pointer-events-none">{label}</p>
      </div>
      <span className="material-symbols-rounded text-4xl pointer-events-none">
        chevron_right
      </span>
    </motion.button>
  );
};

export default MenuButton;

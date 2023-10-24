import { useState, useRef } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../utils/mutations";
import { UserData } from "../../utils/customClientTypes";
import { motion } from "framer-motion";

interface MenuProps {
  handleButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ProfileMenu = ({ handleButtonClick }: MenuProps) => {
  return (
    <section className="flex flex-col flex-grow w-full p-5 space-y-10">
      <motion.button
        id="account"
        type="button"
        className="flex justify-around items-center w-full h-24 text-pdark text-2xl bg-plight rounded-xl shadow-[3px_3px_5px_#301E67]"
        whileHover={{ scale: 1.01, boxShadow: "5px 8px 10px #301E67" }}
        whileTap={{ scale: 0.99, boxShadow: "0px 0px 10px #5B8FB9" }}
        transition={{ delay: 0.1 }}
        onClick={handleButtonClick}
      >
        <span className="material-symbols-rounded text-4xl ml-3 pointer-events-none">
          menu_book
        </span>
        <p className="pointer-events-none">Account Information</p>
        <span className="material-symbols-rounded text-4xl pointer-events-none">
          chevron_right
        </span>
      </motion.button>

      <motion.button
        id="personal"
        type="button"
        className="flex justify-around items-center w-full h-24 text-pdark text-2xl bg-plight rounded-xl shadow-[3px_3px_5px_#301E67]"
        whileHover={{ scale: 1.01, boxShadow: "5px 8px 10px #301E67" }}
        whileTap={{ scale: 0.99, boxShadow: "0px 0px 10px #5B8FB9" }}
        transition={{ delay: 0.1 }}
      >
        <span className="material-symbols-rounded text-4xl ml-3">
          account_circle
        </span>
        <p className="">Personal Information</p>
        <span className="material-symbols-rounded text-4xl">chevron_right</span>
      </motion.button>

      <motion.button
        id="contact"
        type="button"
        className="flex justify-around items-center w-full h-24 text-pdark text-2xl bg-plight rounded-xl shadow-[3px_3px_5px_#301E67]"
        whileHover={{ scale: 1.01, boxShadow: "5px 8px 10px #301E67" }}
        whileTap={{ scale: 0.99, boxShadow: "0px 0px 10px #5B8FB9" }}
        transition={{ delay: 0.1 }}
      >
        <span className="material-symbols-rounded text-4xl ml-3">
          contact_page
        </span>
        <p className="">Contact Information</p>
        <span className="material-symbols-rounded text-4xl">chevron_right</span>
      </motion.button>
    </section>
  );
};

export default ProfileMenu;

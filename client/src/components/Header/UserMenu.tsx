import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import menu_icon from "../../images/menu_FILL0_wght200_GRAD-25_opsz20.svg";
import {
  motion,
  AnimatePresence,
  useAnimate,
  usePresence,
} from "framer-motion";
import Nav from "./Navbar";
import Menu from "./Menu";
import tempPic from "../../images/profile_pic.png";
import Auth from "../../utils/auth";

const UserMenu = () => {

  return (
    <div
      className="flex justify-center items-center"
    >
      <span
        className="material-symbols-rounded text-2xl text-light text-center"
        onClick={() => Auth.logout()}
      >
        logout
      </span>
    </div>
  );
};

export default UserMenu;

import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { motion, useAnimate } from "framer-motion";
import profilePic from "../images/profile_pic.png";
import galleryPic from "../images/gallery_pic.png";
import { QUERY_ME, QUERY_USER } from "../utils/queries";
import Auth from "../utils/auth";
import ProfileCard from "../components/Profile/profile_card";
import DragnDrop from "../components/Profile/dragndrop";
import LoginBox from "../components/Login/LoginBox";
import SignupBox from "../components/Login/SignupBox";

const Login = () => {
  const [isShowLogin, setIsShowLogin] = useState(true);

  const handleLoginDisplay = () => {
    setIsShowLogin(!isShowLogin);
  };

  return (
    <section className="flex flex-col flex-grow bg-pdark">
      <div
        id="profile_card"
        className="profile_hero_image relative flex flex-col justify-center items-center"
      >
        {isShowLogin ? (
          <LoginBox handleLoginDisplay={handleLoginDisplay} />
        ) : (
          <SignupBox handleLoginDisplay={handleLoginDisplay} />
        )}
      </div>
    </section>
  );
};

export default Login;

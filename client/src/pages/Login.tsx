import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { motion, useAnimate } from "framer-motion";
import profilePic from "../images/profile_pic.png";
import galleryPic from "../images/gallery_pic.png";
import { QUERY_ME, QUERY_USER } from "../utils/queries";
import Auth from "../utils/auth";
import ProfileCard from "../components/profile/avatar";
import DragnDrop from "../components/profile/dragndrop";
import LoginBox from "../components/login/loginForm";
import SignupBox from "../components/login/signupForm";

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

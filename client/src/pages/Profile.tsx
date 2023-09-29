import React from "react";
import { motion } from "framer-motion";
import profilePic from "../images/profile_pic.png";
import galleryPic from "../images/gallery_pic.png"

const Profile = () => {
  return (
    <>
      <section className="flex flex-col justify-center items-center">
        <div className="max-h-96">
          <img
            src={galleryPic}
            className="opacity-30"
          />
        </div>

        <div className="absolute top-20 w-fit flex flex-col justify-center items-center rounded-2xl shadow-[0px_5px_15px_0px_rgb(0,0,0,0.5)] bg-primary z-20">
          <div className="w-[50%] -translate-y-[50%]">
            <img src={profilePic} />
          </div>

          <div className="">
            <p>User Name</p>
          </div>

        </div>

        <div className="flex w-full min-h-screen bg-light z-10"></div>
      </section>
    </>
  );
};

export default Profile;

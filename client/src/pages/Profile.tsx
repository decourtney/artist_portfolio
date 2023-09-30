import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import profilePic from "../images/profile_pic.png";
import galleryPic from "../images/gallery_pic.png";
import { QUERY_ME, QUERY_USER } from "../utils/queries";
import Auth from "../utils/auth";

const Profile = () => {
  // const { username: userParam } = useParams();
  const userParam = "tempuser@gmail.com";
  let user;

  const { loading, error, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { email: userParam },
  });

  if (data) {
    user = data.user;
  }

  return (
    <section className="flex flex-col flex-grow bg-pdark">
      <div className="relative flex justify-center items-center">
        <div className="profile_hero_image w-screen h-72 opacity-30 rounded-b-full" />

        {user && (
          <div className="absolute bottom-0 rounded-2xl">
            <div className="relative w-full h-auto">
              <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 rounded-full">
                <img src={profilePic} className="drop-shadow-2xl" />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center w-72 h-auto pt-10 text-contrast">
              <p className="font-black text-xl">
                {user.firstName} {user.lastName}
              </p>
              <p className="font-medium text-sm">
                Collection: {user.products.length}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className=""></div>
    </section>
  );
};

export default Profile;

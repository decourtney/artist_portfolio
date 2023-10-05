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
import Signup from "../components/Login/SignupBox";

const Profile = () => {
  const { username: userParam } = useParams();

  const userinfo = useParams();
  if (!userParam) console.log("No user logged in " + userinfo);
  console.log(userinfo);

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { email: userParam },
  });

  const user = data?.me || data?.user || {};
  if (Auth.loggedIn() && Auth.getProfile() === userParam) {
    return <Navigate to="/profile" />;
  }

  return (
    <section className="flex flex-col flex-grow bg-pdark">
      <div
        id="profile_card"
        className="profile_hero_image relative flex flex-col justify-center items-center"
      >
        {Auth.loggedIn() && (
          <>
            <ProfileCard
              fullname={user?.fullname}
              username={user?.username}
              numOfProducts={2}
              profilePic={user?.profilePic}
            />
            <div className="flex flex-grow justify-center items-center m-5 p-12 rounded-2xl font-medium text-center text-pdark bg-plight">
              <DragnDrop />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Profile;

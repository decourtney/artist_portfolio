import { useState } from "react";
import { Navigate, useParams, redirect } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { motion, useAnimate } from "framer-motion";
import profilePic from "../images/profile_pic.png";
import galleryPic from "../images/gallery_pic.png";
import { QUERY_ME, QUERY_USER } from "../utils/queries";
import Auth from "../utils/auth";
import ProfileCard from "../components/profile/profile_card";
import DragnDrop from "../components/profile/dragndrop";
import Signup from "../components/login/signupBox";

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  // This snippet isnt necessary for this build but keeping here for future reference
  // if (Auth.loggedIn() && Auth.getProfile()?.username === userParam) {
  //   return <Navigate to={`/profile/${userParam}`} />;
  // }

  // if (!loading) {
  //   console.log("userParams: ", userParam);
  //   console.log("data: ", data);
  //   console.log("getProfile: ", Auth.getProfile());
  //   console.log("data.user: ", user);
  // }

  return (
    <>
      {Auth.loggedIn() ? (
        <section className="flex flex-col flex-grow bg-pdark">
          <div
            id="profile_card"
            className="profile_hero_image flex flex-col flex-grow justify-center items-center"
          >
            {loading ? (
              <></>
            ) : (
              <>
                <ProfileCard
                  username={user.username}
                  profilePic={user.profilePic}
                />
                <div className="flex flex-grow justify-center items-center m-5 p-12 rounded-2xl font-medium text-center text-pdark bg-plight z-10">
                  <DragnDrop />
                </div>
              </>
            )}
          </div>
        </section>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default Profile;

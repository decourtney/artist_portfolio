import React, { useState, useEffect } from "react";
import { Navigate, useParams, redirect } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { motion, useAnimate } from "framer-motion";
import { QUERY_ME, QUERY_USER } from "../utils/queries";
import Auth from "../utils/auth";
import UserInfo from "../components/profile/userInfo";
import EditProfile from "../components/profile/editProfile";

const Profile = () => {
  const { username: userParam } = useParams();
  const [isEditForm, setIsEditForm] = useState(false);

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  if(loading)
    return(<></>)

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
            className="profile_hero_image flex flex-col flex-grow items-center mx-5 mb-5"
          >
            {/* {loading ? (
              <></>
            ) : (
              <> */}
                {isEditForm ? (
                  <EditProfile userData={user} setIsEditForm={setIsEditForm} />
                ) : (
                  <UserInfo userData={user} setIsEditForm={setIsEditForm} />
                )}
              {/* </>
            )} */}
          </div>
        </section>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default Profile;

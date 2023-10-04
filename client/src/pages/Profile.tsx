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
import Login from "../components/Profile/Login";
import Signup from "../components/Profile/Signup";

const Profile = () => {
  const [isShowLogin, setIsShowLogin] = useState(false);
  // const { username: userParam } = useParams();

  const userParam = "tempuser@gmail.com"; // test parameters

  // Get user info
  const { loading, error, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { email: userParam },
  });

  let user;
  if (data) {
    user = data.user;
  }

  const handleLoginDisplay = () => {
    setIsShowLogin(!isShowLogin);
    console.log('show login')
  };

  return (
    <section className="flex flex-col flex-grow bg-pdark">
      <div
        id="profile_card"
        className="profile_hero_image relative flex flex-col justify-center items-center"
      >
        {Auth.loggedIn() ? (
          <>
            <ProfileCard
              fullname={user?.fullname}
              username={user?.username}
              numOfProducts={user?.products.length}
              profilePic={user?.profilePic}
            />
            <div className="flex flex-grow justify-center items-center m-5 p-12 rounded-2xl font-medium text-center text-pdark bg-plight">
              <DragnDrop />
            </div>
          </>
        ) : isShowLogin ? (
          <Login handleLoginDisplay={handleLoginDisplay} />
        ) : (
          <Signup handleLoginDisplay={handleLoginDisplay} />
        )}
      </div>
    </section>
  );
};

export default Profile;

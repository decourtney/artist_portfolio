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

const Profile = () => {
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

  return (
    <section className="flex flex-col flex-grow bg-pdark">
      <div
        id="profile_card"
        className="relative flex justify-center items-center "
      >
        <div className="profile_hero_image w-screen h-72 opacity-30 rounded-b-full" />
        {Auth.loggedIn() ? (
          <ProfileCard
            fullname={user?.fullname}
            username={user?.username}
            numOfProducts={user?.products.length}
            profilePic={user?.profilePic}
          />
        ) : (
          <Login />
        )}
      </div>

      <div className="flex flex-grow justify-center items-center m-5 mt-20 p-12 rounded-2xl font-medium text-center text-dark bg-light">
        <DragnDrop />
      </div>
    </section>
  );
};

export default Profile;

// {user && (
//   <ProfileCard
//     fullname={user.fullname}
//     username={user.username}
//     numOfProducts={user.products.length}
//     profilePic={user.profilePic}
//   />
// )}

import React, { useState, useEffect } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { motion, useAnimate } from "framer-motion";
import { QUERY_USER } from "../utils/queries";
import Auth from "../utils/auth";
import ProfileMenu from "../components/profile/profileMenu";
import Avatar from "../components/profile/avatar";
import AccountInfo from "../components/profile/accountInfo";
import PersonalInfo from "../components/profile/personalInfo";
import EditProfile from "../components/profile/editPersonalInfo";
import BiographyInfo from "../components/profile/biographyInfo";
import SocialInfo from "../components/profile/socialInfo";

const Profile = () => {
  const { username: userParam, content: contentParam } = useParams();
  const [displayInfo, setDisplayInfo] = useState("default");
  const [isEditForm, setIsEditForm] = useState(false);
  const navigate = useNavigate();

  // If no contentParam then reset to defaults
  useEffect(() => {
    if (contentParam) {
      setDisplayInfo(contentParam);
    } else {
      setIsEditForm(false);
      setDisplayInfo("default");
    }
  }, [contentParam]);

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: userParam },
  });

  // TODO Need skeleton loading images
  if (loading) return <></>;

  const user = data?.me || data?.user || {};

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.id;

    // If back button hit then
    if (id === "back") navigate(`/profile/${userParam}`);
    else navigate(`/profile/${userParam}/${id}`);
  };

  const displaySwitch = (p: string) => {
    switch (p) {
      case "account":
        return (
          <AccountInfo
            setIsEditForm={setIsEditForm}
            handleBackButton={handleButtonClick}
          />
        );
      case "personal":
        // TODO Change edit mode controlled within PersonalInfo. Reference AccountInfo's createCategory
        return isEditForm ? (
          <EditProfile userData={user} setIsEditForm={setIsEditForm} />
        ) : (
          <PersonalInfo
            userData={user}
            setIsEditForm={setIsEditForm}
            handleBackButton={handleButtonClick}
          />
        );
      case "biography":
        return (
          <BiographyInfo
            userData={user}
            setIsEditForm={setIsEditForm}
            handleBackButton={handleButtonClick}
          />
        );
      case "social":
        return (
          <>
            <SocialInfo
              userData={user}
              setIsEditForm={setIsEditForm}
              handleBackButton={handleButtonClick}
            />
          </>
        );
      default:
        // return (
        //   <AccountInfo
        //     userData={user}
        //     setIsEditForm={setIsEditForm}
        //     handleBackButton={handleButtonClick}
        //   />
        // ); // FIXME Temporary insert accountInfo
        return (
          <>
            <ProfileMenu handleButtonClick={handleButtonClick} />
          </>
        );
    }
  };

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
            className="profile_hero_image flex flex-col flex-grow items-center mx-5"
          >
            <Avatar
              username={user?.username}
              fullname={user?.fullname}
              email={user?.email}
              profilePic={user?.profilePic}
            />
            {displaySwitch(displayInfo)}

            {/* <ProfileMenu handleButtonClick={handleButtonClick} /> */}
            {/* {isEditForm ? (
              <EditProfile userData={user} setIsEditForm={setIsEditForm} />
            ) : (
              <PersonalInfo userData={user} setIsEditForm={setIsEditForm} />
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

import { useEffect, useState } from "react";
import tempPic from "../../images/profile_pic.png";

interface UserInfo {
  username: string;
  profilePic: string;
}

  const baseCDN =
    process.env.BASE_CDN ||
    "https://chumbucket.donovancourtney.dev/artist_portfolio";

const ProfileCard = ({
  username,
  profilePic,
}: UserInfo) => {
  const [picUrl, setPicUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (profilePic === "default_avatar.png")
      setPicUrl(`${baseCDN}/${profilePic}`);
    else
      setPicUrl(`${baseCDN}/${username}/${profilePic}`);
  }, []);

  return (
    <>
      {/* <div className="flex flex-col items-center z-10"> */}
      <div className="w-36 h-72 z-10">
        <div className="flex flex-col justify-center items-center w-36 h-72 translate-y-14">
          <div className="w-28 rounded-full">
            <img
              src={picUrl}
              className="drop-shadow-2xl"
              alt="User profile picture"
            />
          </div>
          {/* <div> */}
            <span className="font-bold text-2xl text-plight">{username}</span>
          {/* </div> */}
        </div>
      </div>
      {/* <div className="flex flex-col justify-center items-center w-72 h-auto text-contrast bg-pdark">
          <p className="font-black text-xl">{fullname}</p>
          <p className="font-medium text-xs">collection: {numOfProducts}</p>
        </div> */}
      {/* </div> */}
    </>
  );
};

export default ProfileCard;

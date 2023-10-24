import { useEffect, useState } from "react";
import tempPic from "../../images/profile_pic.png";

interface UserInfo {
  fullname: string | undefined;
  email: string | undefined;
  profilePic: string | undefined;
}

const baseCDN =
  process.env.BASE_CDN ||
  "https://chumbucket.donovancourtney.dev/artist_portfolio";

const Avatar = ({ fullname, email, profilePic }: UserInfo) => {
  const [picUrl, setPicUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (profilePic === "default_avatar.png")
      setPicUrl(`${baseCDN}/${profilePic}`);
    else setPicUrl(`${baseCDN}/${fullname}/${profilePic}`);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full h-72">
      <div className="w-28 rounded-full">
        <img
          src={picUrl}
          className="drop-shadow-2xl"
          alt="User profile picture"
        />
      </div>
      <span className="font-bold text-2xl text-plight">{fullname}</span>
      <span className="font-bold text-xs text-plight">{email}</span>
    </div>
  );
};

export default Avatar;

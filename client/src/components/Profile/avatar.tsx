import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import tempPic from "../../images/profile_pic.png";

interface UserInfo {
  username: string | undefined;
  fullname: string | undefined;
  email: string | undefined;
  profilePic: string | undefined;
}

const baseCDN =
  process.env.BASE_CDN ||
  "https://chumbucket.donovancourtney.dev/artist_portfolio";

const Avatar = ({ username, fullname, email, profilePic }: UserInfo) => {
  const [picUrl, setPicUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (profilePic === "default_avatar.png")
      setPicUrl(`${baseCDN}/${profilePic}`);
    else setPicUrl(`${baseCDN}/${username}/${profilePic}`);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full h-72">
      <div className="w-28 rounded-full">
        <LazyLoadImage
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

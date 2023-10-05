import { useEffect, useState } from "react";
import tempPic from "../../images/profile_pic.png";

interface UserInfo {
  fullname: string;
  username: string;
  numOfProducts: number;
  profilePic: string;
}

const ProfileCard = ({
  fullname,
  username,
  numOfProducts = 1,
  profilePic,
}: UserInfo) => {
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);

  useEffect(() => {
    const fullcdn =
      process.env.REACT_APP_BASE_CDN + "/" + username + "/" + profilePic;
    console.log(fullcdn);
    if (fullcdn) setProfilePicUrl(fullcdn);
  }, [profilePic]);

  return (
    <div className="">
      <div className="relative w-full">
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 rounded-full">
          <img
            src={profilePicUrl || tempPic}
            className="drop-shadow-2xl"
            alt="User profile picture"
          />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-72 h-auto text-contrast translate-y-16">
        <p className="font-black text-xl">{fullname}</p>
        <p className="font-medium text-xs">collection: {numOfProducts}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
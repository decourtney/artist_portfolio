import { UserData } from "../../utils/customClientTypes";
import { motion } from "framer-motion";
import Avatar from "./avatar";

interface UserInfoProps {
  userData: UserData | null;
  setIsEditForm: (setIsEditForm: boolean) => void;
  handleBackButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const UserInfo = ({
  userData,
  setIsEditForm,
  handleBackButton,
}: UserInfoProps) => {
  return (
    <>
      {/* <Avatar firstName={userData?.firstName} profilePic={userData?.profilePic}/> */}
      <section className="flex flex-col w-full rounded-2xl font-medium text-plight">
        <div className="relative grid grid-cols-2 grid-rows-1 gap-0 mt-4 text-center after:content-[''] after:bg-psecondary after:absolute after:top-0 after:left-1/2 after:h-3/4 after:w-[1px]">
          <div className="relative pb-3 after:content-[''] after:bg-psecondary after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[1px] after:w-3/4">
            <span>{userData?.productCount}</span>
            <p>Collections</p>
          </div>
          <div className="relative pb-3 after:content-[''] after:bg-psecondary after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[1px] after:w-3/4">
            <span>{userData?.categoryCount}</span>
            <p>Categories</p>
          </div>
        </div>
        <div className="relative flex flex-col items-center px-2 py-4">
          <div className="w-full space-y-4 my-4 px-4 text-lg ">
            <div className="relative flex flex-col w-full bg-pdark border-b-2 border-psecondary">
              <span className="material-symbols-rounded text-sm">person</span>
              <p className="p-1 rounded-md">
                {userData?.firstName || "Hello. "}{" "}
                {userData?.lastName || "My name is Kevin"}
              </p>
            </div>

            <div className="relative flex flex-col w-full bg-pdark border-b-2 border-psecondary">
              <span className="material-symbols-rounded text-sm">email</span>
              <p className="p-1 rounded-md">{userData?.email}</p>
            </div>
          </div>
          <div className="absolute bottom-[95%]">
            <motion.button
              className="w-fit py-1 px-2 rounded-l-full rounded-r-full text-xs font-black text-plight bg-pdark shadow-[0px_0px_2px_#5B8FB9]"
              type="submit"
              whileHover={{
                // scale: 1.1,
                boxShadow: "0px 0px 10px #5B8FB9",
              }}
              whileTap={{ scale: 0.95, boxShadow: "0px -2px 1px #5B8FB9" }}
              onClick={() => setIsEditForm(true)}
            >
              EDIT
            </motion.button>
          </div>
        </div>
      </section>
      <motion.button
        id="back"
        type="button"
        className="rounded-full bg-plight bg-opacity-30"
        onClick={handleBackButton}
      >
        <span className="material-symbols-rounded mx-2 text-light text-4xl text-center align-middle">
          chevron_left
        </span>
      </motion.button>
    </>
  );
};

export default UserInfo;

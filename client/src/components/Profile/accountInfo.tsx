import { UserData } from "../../utils/customClientTypes";
import { motion } from "framer-motion";
import ProfileCarousel from "./profileCarousel";


interface AccountProps {
  userData: UserData | null;
  setIsEditForm: (setIsEditForm: boolean) => void;
  handleBackButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const AccountInfo = ({
  userData,
  setIsEditForm,
  handleBackButton,
}: AccountProps) => {
  console.log(userData);

  return (
    <>
      <section className="flex flex-col flex-grow w-full h-full font-medium text-plight">
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
        <div className="relative flex flex-col flex-grow items-center px-2 py-4">
          <div className="flex w-full justify-end">
            <button className="">
              <span className="material-symbols-rounded text-3xl align-middle">
                add
              </span>
            </button>
          </div>
          <div className="w-full h-72 ">
            <ProfileCarousel />
          </div>
        </div>
      </section>
      <div className="w-full">
        <motion.button
          id="back"
          type="button"
          className="rounded-full"
          onClick={handleBackButton}
        >
          <span className="material-symbols-rounded mx-2 text-light text-4xl text-center align-middle">
            chevron_left
          </span>
        </motion.button>
      </div>
    </>
  );
};

export default AccountInfo;

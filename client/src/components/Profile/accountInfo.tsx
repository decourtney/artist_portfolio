import { UserData } from "../../utils/customClientTypes";
import { motion } from "framer-motion";

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
  return (
    <>
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

export default AccountInfo;

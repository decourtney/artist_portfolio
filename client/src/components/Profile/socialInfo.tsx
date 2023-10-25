import { UserData } from "../../utils/customClientTypes";
import { motion } from "framer-motion";

interface SocialProps {
  userData: UserData | null;
  setIsEditForm: (setIsEditForm: boolean) => void;
  handleBackButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const SocialInfo = ({
  userData,
  setIsEditForm,
  handleBackButton,
}: SocialProps) => {
  return (
    <>
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

export default SocialInfo;

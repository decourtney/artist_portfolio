import { UserData } from "../../utils/customClientTypes";
import { motion } from "framer-motion";
import BackButton from "./backButton";

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
      <BackButton />
    </>
  );
};

export default SocialInfo;

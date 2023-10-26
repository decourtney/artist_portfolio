import { UserData } from "../../utils/customClientTypes";
import { motion } from "framer-motion";
import BackButton from "./backButton";

interface BiographyProps {
  userData: UserData | null;
  setIsEditForm: (setIsEditForm: boolean) => void;
  handleBackButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const BiographyInfo = ({
  userData,
  setIsEditForm,
  handleBackButton,
}: BiographyProps) => {
  return (
    <>
      <BackButton />
    </>
  );
};

export default BiographyInfo;

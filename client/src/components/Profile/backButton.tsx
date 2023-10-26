import { Navigate, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <>
      <motion.button
        id="back"
        type="button"
        className="rounded-full"
        onClick={() => navigate(-1)}
      >
        <span className="material-symbols-rounded mx-2 text-light text-4xl text-center align-middle">
          chevron_left
        </span>
      </motion.button>
    </>
  );
};

export default BackButton;

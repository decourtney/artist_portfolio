import { useCallback, Dispatch, SetStateAction } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { QUERY_ACCOUNT } from "../../utils/queries";
import { ADD_CATEGORY } from "../../utils/mutations";
import { AccountItem } from "../../utils/customClientTypes";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useAnimation,
  useAnimationControls,
} from "framer-motion";
import CreateCategory from "./createCategory";
import Slider from "./slider";
import BackButton from "./backButton";
import DragnDrop from "./dragndrop";

interface ButtonProps {
  setAddCollection: Dispatch<SetStateAction<boolean>>;
}

const CollapsibleButton = ({setAddCollection}:ButtonProps) => {
  const controls = useAnimationControls();

  const handleToggle = async () => {
    controls.start("open");
  };

  return (
    <div className="flex justify-end items-center mb-1 text-xs">
      <motion.div
        className="overflow-hidden whitespace-nowrap"
        animate={controls}
        variants={{
          open: { maxWidth: 100 },
          close: { maxWidth: 0 },
        }}
        initial="close"
      >
        <p>Add Collection</p>
      </motion.div>
      <motion.button
        type="button"
        onHoverStart={() => controls.start("open")}
        onHoverEnd={() => controls.start("close")}
        onClick={() => setAddCollection(true)}
      >
        <span className="material-symbols-rounded px-1 text-lg pointer-events-none">
          add
        </span>
      </motion.button>
    </div>
  );
};

export default CollapsibleButton;

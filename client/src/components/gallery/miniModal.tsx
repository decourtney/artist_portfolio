import React, {
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
} from "react";
import {
  Navigate,
  useParams,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { Category, Product } from "../../utils/customClientTypes";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { RootState } from "../../store";
import { setSliderState } from "../../redux/sliderSlice";
import { setMiniModalState } from "../../redux/miniModalSlice";
import { debounce } from "lodash";

const baseCDN =
  import.meta.env.VITE_BASE_CDN ||
  "https://chumbucket.donovancourtney.dev/artist_portfolio";

const MiniModal = () => {
  const dispatch = useAppDispatch();
  const { sliderItem, sliderItemRect, showMiniModal } = useAppSelector(
    (state: RootState) => state.miniModal.miniModalState
  );
  const [scope, animate] = useAnimate();

  useEffect(() => {
    // console.log(sliderItem);
  }, [sliderItemRect]);

  // Not sure why but framer-motion's AnimatePresence is buggy with the current setup
  // So handleMouseLeave awaits the animation then disables the modal
  const handleMouseLeave = async () => {
    await animate(
      scope.current,
      {
        width: sliderItemRect.width,
        height: sliderItemRect.height,
      },
      { duration: 0.2 }
    );
    dispatch(setMiniModalState({ showMiniModal: false }));
  };

  if (!showMiniModal || !sliderItemRect) return null;

  const variants = {
    open: {
      width: sliderItemRect.width + sliderItemRect.width * 0.2,
      height: sliderItemRect.height + sliderItemRect.height * 0.2,
      transition: {
        duration: 0.2,
      },
    },
    close: {
      width: sliderItemRect.width,
      height: sliderItemRect.height,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="absolute w-full h-full  ">
      <motion.div
        ref={scope}
        key={sliderItem.name}
        className="absolute bg-red-500 z-50"
        style={{ ...sliderItemRect }}
        variants={variants}
        initial={{ top: 0, left: 0 }}
        animate="open"
        // exit="close"
        onMouseLeave={handleMouseLeave}
      >
        stuff
      </motion.div>
    </div>
  );
};

export default MiniModal;

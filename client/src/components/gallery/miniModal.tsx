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

  const handleMouseLeave = async () => {
    console.log('mouse left')
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
    initial: {
      top: 0, left: 0, right: 0, bottom: 0,
    },
    open: {
      width: sliderItemRect.width + sliderItemRect.width * 0.2,
      height: sliderItemRect.height + sliderItemRect.height * 0.2,
      margin: "calculate margin from width and new width",
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className={`absolute w-full h-full z-10`}
    >
      {/* <div className="relative "> */}
      <div className="absolute flex justify-center items-center bg-green-500" style={{ ...sliderItemRect }}>
        <motion.div
          ref={scope}
          key={sliderItem.name}
          className="absolute bg-red-500 w-full h-full"
          //style={{ ...sliderItemRect }}
          variants={variants}
          initial='initial'
          animate="open"
          onMouseOut={handleMouseLeave}
        >
          stuff
        </motion.div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default MiniModal;

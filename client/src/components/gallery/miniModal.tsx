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
  const [loadedImageSrc, setLoadedImageSrc] = useState("");
  const [scope, animate] = useAnimate();
  const increasePercentage = 0.1;
  let sliderItemWidth = sliderItemRect.width;
  let sliderItemHeight = sliderItemRect.height;
  let { username: userParam } = useParams();
  if (!userParam) userParam = import.meta.env.VITE_BASE_USER;

  // useEffect(() => {
  //   sliderItemWidth = sliderItemRect.width;
  //   sliderItemHeight = sliderItemRect.height;
  // }, [sliderItemRect]);

  useEffect(() => {
    const img = new Image();
    const imgsrc = `${baseCDN}/${userParam}/${sliderItem.image}`;
    img.src = imgsrc;
    img.onload = () => {
      setLoadedImageSrc(imgsrc);
    };
  }, []);

  const handleMouseLeave = async () => {
    await animate(
      scope.current,
      {
        width: sliderItemRect.width,
        height: sliderItemRect.height,
        margin: 0,
      },
      { duration: 0.2 }
    );
    dispatch(setMiniModalState({ showMiniModal: false }));
  };

  if (!showMiniModal || !sliderItemRect) return null;

  const variants = {
    initial: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    open: {
      width: sliderItemWidth + sliderItemWidth * increasePercentage,
      height: sliderItemHeight + sliderItemHeight * increasePercentage,
      margin:
        (sliderItemRect.width + sliderItemRect.height) *
        increasePercentage *
        0.5 *
        -0.5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className={`absolute w-full h-full z-10`}>
      <div
        className="absolute flex justify-center items-center bg-green-500"
        style={{ ...sliderItemRect }}
      >
        <motion.div
          ref={scope}
          key={sliderItem.name}
          className="absolute bg-red-500 w-full h-full"
          variants={variants}
          initial="initial"
          animate="open"
          onMouseLeave={handleMouseLeave}
        >
          <div className="w-full h-full">
            {loadedImageSrc && (
              <img
                src={loadedImageSrc}
                className="inline-block w-full h-full max-h-[96dvh] max-w-[96dvw] object-contain"
                alt={`${sliderItem.name}`}
                loading="lazy"
              />
            )}
            <div className="w-full h-[50px] bg-green-500"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MiniModal;

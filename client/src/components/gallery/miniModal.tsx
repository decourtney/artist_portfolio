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
  const [imgDimensions, setImgDimensions] = useState<{ width: number, height: number, margin: string }>({ width: 0, height: 0, margin: '0' });
  const [scope, animate] = useAnimate();
  const increasePercentage = 0.1;
  const maxModalWidth = 200;
  const maxModalHeight = 200;
  let sliderItemWidth = sliderItemRect.width;
  let sliderItemHeight = sliderItemRect.height;
  let { username: userParam } = useParams();
  if (!userParam) userParam = import.meta.env.VITE_BASE_USER;

  useEffect(() => {
    const img = new Image();
    const imgsrc = `${baseCDN}/${userParam}/${sliderItem.image}`;
    img.src = imgsrc;

    img.onload = () => {
      const imgWidth = img.width;
      const imgHeight = img.height;
      const aspectRatio = imgWidth / imgHeight;

      // Calculate dimensions based on max width and height
      const calculatedWidth = Math.max(sliderItemRect.width, Math.min(sliderItemWidth, maxModalWidth));
      const calculatedHeight = Math.max(sliderItemRect.height, calculatedWidth / aspectRatio);

      // Ensure calculated dimensions do not exceed max height
      const finalHeight = Math.min(calculatedHeight, maxModalHeight);

      // Calculate final width based on the aspect ratio
      const finalWidth = finalHeight * aspectRatio;

      // Calculate the margin to center the modal within the sliderItem
      const horizontalMargin = (sliderItemWidth - finalWidth) / 2;
      const verticalMargin = (sliderItemHeight - finalHeight) / 2;

      setImgDimensions({ width: finalWidth, height: finalHeight, margin: `${verticalMargin}px ${horizontalMargin}px` });
    };
  }, [])

  // if (!showMiniModal || !sliderItemRect) return null;

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

  const variants = {
    initial: {
      top: 0,
      left: 0,

      // opacity: 0
    },
    open: {
      // opacity: 1,
      width: imgDimensions.width,
      height: imgDimensions.height,
      margin: `${imgDimensions.margin}`,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className={`absolute w-full h-full z-10`}>
      {/* <div
        className="absolute"
        style={{ ...sliderItemRect }}
      > */}
      <motion.div
        ref={scope}
        key={sliderItem.name}
        className={`absolute bg-blue-500`}
        style={{ ...sliderItemRect, minHeight: sliderItemHeight }}
        variants={variants}
        initial="initial"
        animate="open"
      >
        {/* <div className=""> */}
        {sliderItem && (
          <img
            onMouseLeave={handleMouseLeave}
            src={`${baseCDN}/${userParam}/${sliderItem.image}`}
            className=" w-full h-full object-cover"
            alt={`${sliderItem.name}`}
            loading="lazy"
          />
        )}
        {/* <div className="w-full h-[50px] bg-green-500"></div> */}
        {/* </div> */}
      </motion.div>
      {/* </div> */}
    </div>
  );
};

export default MiniModal;

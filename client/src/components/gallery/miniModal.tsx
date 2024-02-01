import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, useAnimate } from "framer-motion";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { RootState } from "../../store";
import { setMiniModalState } from "../../redux/miniModalSlice";

const baseCDN =
  import.meta.env.VITE_BASE_CDN ||
  "https://chumbucket.donovancourtney.dev/artist_portfolio";

const MiniModal = () => {
  const dispatch = useAppDispatch();
  const { sliderItem, sliderItemRect } = useAppSelector(
    (state: RootState) => state.miniModal.miniModalState
  );
  const [imgDimensions, setImgDimensions] = useState<{
    width: number;
    height: number;
    margin: string;
  } | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [scope, animate] = useAnimate();
  const maxModalWidth = 300;
  const maxModalHeight = 300;
  const detailsHeight = 96;
  let sliderItemWidth = sliderItemRect.width;
  let sliderItemHeight = sliderItemRect.height;
  let { username: userParam } = useParams();
  if (!userParam) userParam = import.meta.env.VITE_BASE_USER;

  useEffect(() => {
    // Construct the image URL and set it in state
    setImgSrc(`${baseCDN}/${userParam}/${sliderItem.image}`);
  }, [userParam, sliderItem]);

  useEffect(() => {
    const img = new Image();
    if (imgSrc) img.src = imgSrc;

    img.onload = () => {
      const aspectRatio = img.width / img.height;

      // Determine minimal width and height
      const minWidth = Math.max(sliderItemWidth, maxModalWidth);
      const minHeight = Math.max(sliderItemHeight, maxModalHeight);

      // Calculate final width and height based on the aspect ratio
      let finalWidth = Math.max(minWidth, minHeight);
      let finalHeight = finalWidth / aspectRatio;

      // If the calculated height is less than the minimum height, adjust dimensions
      // if (finalHeight < minHeight) {
      //   finalHeight = minHeight;
      //   finalWidth = finalHeight * aspectRatio;
      // }

      // Calculate the margin to center the modal relative to sliderItem size
      const horizontalMargin = (sliderItemWidth - finalWidth) * 0.5;
      const verticalMargin =
        (sliderItemHeight - finalHeight + -detailsHeight) * 0.5;

      setImgDimensions({
        width: finalWidth,
        height: finalHeight,
        margin: `${verticalMargin}px ${horizontalMargin}px`,
      });
    };
  }, [imgSrc]);

  useEffect(() => {
    if (imgDimensions) animateOpen();
  }, [imgDimensions]);

  const animateOpen = async () => {
    await animate([
      [scope.current,
      {
        width: imgDimensions?.width,
        height: imgDimensions?.height,
        margin: `${imgDimensions?.margin}`,
      },
      { duration: 0.2 },
      ],
      [".details-div", { height: `${detailsHeight}px` }, { duration: 0.2, at: 0 }],
    ]);
  };

  const animateClosed = async () => {
    await animate([
      [
        scope.current,
        {
          width: sliderItemWidth,
          height: sliderItemHeight,
          margin: 0,
        },
        { duration: 0.2 },
      ],
      [".details-div", { height: 0 }, { duration: 0.2, at: 0 }],
    ]);
    dispatch(setMiniModalState({ showMiniModal: false }));
  };

  return (
    <section id="miniModal" className={`absolute w-full h-full z-10`}>
      <motion.div
        ref={scope}
        key={sliderItem.name}
        className="shadow-md w-full h-full"
        style={{ ...sliderItemRect }}
        initial={{
          width: sliderItemWidth,
          height: sliderItemHeight,
          top: 0,
          left: 0,
        }}
        onMouseLeave={animateClosed}
      >
        {imgSrc && (
          <div className="w-full h-full">
            <img
              src={imgSrc}
              className="w-full h-full shadow-lg object-cover rounded-t-md"
              style={{ imageRendering: "auto" }}
              alt={`${sliderItem.name}`}
              loading="lazy"
            />
            <motion.div
              className="details-div w-full h-24 shadow-lg rounded-b-md bg-plight text-center"
              initial={{ height: 0 }}
            >
              Words and stuff go here
            </motion.div>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default MiniModal;

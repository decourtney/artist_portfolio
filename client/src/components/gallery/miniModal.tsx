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
  const { sliderItem, sliderItemRect, showMiniModal } = useAppSelector(
    (state: RootState) => state.miniModal.miniModalState
  );
  const [imgDimensions, setImgDimensions] = useState<{
    width: number;
    height: number;
    margin: string;
  } | null>(null);
  const [scope, animate] = useAnimate();
  const increasePercentage = 0.1;
  const maxModalWidth = 300;
  const maxModalHeight = 300;
  const detailsHeight = 96;
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
      const maxWidth = Math.min(imgWidth, maxModalWidth);
      const maxHeight = Math.min(imgHeight, maxModalHeight);

      // Calculate final width and height based on the aspect ratio
      let finalWidth = maxWidth;
      let finalHeight = maxWidth / aspectRatio;

      // If the calculated height is less than the minimum height, adjust dimensions
      if (finalHeight < sliderItemHeight) {
        finalHeight = sliderItemHeight;
        finalWidth = finalHeight * aspectRatio;
      }

      // Ensure final dimensions do not exceed max height
      finalHeight = Math.min(finalHeight, maxHeight);

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
  }, []);

  useEffect(() => {
    if (imgDimensions) animateOpen();
  }, [imgDimensions]);

  const animateOpen = async () => {
    await animate(
      scope.current,
      {
        width: imgDimensions?.width,
        height: imgDimensions?.height,
        margin: `${imgDimensions?.margin}`,
      },
      { duration: 0.2 }
    );
  };

  const animateClosed = async () => {
    await animate(
      scope.current,
      {
        width: sliderItemWidth,
        height: sliderItemHeight,
        margin: 0,
      },
      { duration: 0.2 }
    );
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
      >
        {sliderItem && (
          <div className="w-full h-full">
            <img
              onMouseLeave={animateClosed}
              src={`${baseCDN}/${userParam}/${sliderItem.image}`}
              className="w-full h-full shadow-lg object-cover rounded-t-md"
              style={{ imageRendering: "auto" }}
              alt={`${sliderItem.name}`}
              loading="lazy"
            />
            <div className="w-full h-24 shadow-lg rounded-b-md bg-plight text-center">
              Words and stuff go here
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default MiniModal;

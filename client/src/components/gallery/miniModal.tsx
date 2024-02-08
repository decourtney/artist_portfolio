import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, useAnimate } from "framer-motion";
import { Category, Product } from "../../utils/customClientTypes";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { RootState } from "../../store";
import { setMiniModalState } from "../../redux/miniModalSlice";
import { setProductState } from "../../redux/productSlice";

const baseCDN =
  import.meta.env.VITE_BASE_CDN ||
  "https://chumbucket.donovancourtney.dev/artist_portfolio";

const MiniModal = () => {
  const navigate = useNavigate();
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
  const sliderItemWidth = sliderItemRect.width;
  const sliderItemHeight = sliderItemRect.height;
  const detailsHeight = 96;
  let { username: userParam } = useParams();
  if (!userParam) userParam = import.meta.env.VITE_BASE_USER;

  useEffect(() => {
    // Construct the image URL and set it in state
    if (sliderItem) setImgSrc(`${baseCDN}/${userParam}/${sliderItem.image}`);
  }, [userParam, sliderItem]);

  useEffect(() => {
    if (imgSrc) {
      const img = new Image();
      img.src = imgSrc;

      img.onload = () => {
        const aspectRatio = img.width / img.height;

        // Determine minimal width and height
        const minWidth = Math.max(sliderItemWidth, maxModalWidth);
        const minHeight = Math.max(sliderItemHeight, maxModalHeight);

        // Calculate final width and height based on the aspect ratio
        let finalWidth = Math.max(minWidth, minHeight);
        let finalHeight = finalWidth / aspectRatio;

        // TODO This will affect how horizontal images are displayed = smaller if not used. Will Probably keep this code.
        // If the calculated height is less than the minimum height, adjust dimensions
        // if (finalHeight < minHeight) {
        //   finalHeight = minHeight;
        //   finalWidth = finalHeight * aspectRatio;
        // }

        // Calculate the margin to center the modal relative to sliderItem size
        const horizontalMargin = (sliderItemWidth - finalWidth) * 0.5;
        const verticalMargin = (sliderItemHeight - finalHeight + -detailsHeight) * 0.5;

        setImgDimensions({
          width: finalWidth,
          height: finalHeight,
          margin: `${verticalMargin}px ${horizontalMargin}px`,
        });
      };
    }
  }, [imgSrc]);

  useEffect(() => {
    if (imgDimensions) animateOpen();
  }, [imgDimensions]);

  const animateOpen = async () => {
    await animate([
      [
        scope.current,
        {
          width: imgDimensions?.width,
          height: imgDimensions?.height,
          margin: `${imgDimensions?.margin}`,
        },
        { duration: 0.2 },
      ],
      [
        ".details-div",
        { height: `${detailsHeight}px` },
        { duration: 0.2, at: 0 },
      ],
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

  // productModal should appear to expand from the miniModal by passing current size and having productmodal animate out just like the miniModal
  const handleOnClick = () => {
    const { bottom, height, left, right, top, width, x, y } = scope.current.getBoundingClientRect();
    dispatch(setProductState({ product: sliderItem as Product, productRect: { bottom, height, left, right, top, width, x, y }, showProductModal: true }));;
    navigate(`/gallery/${sliderItem.name}`);
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
        onClick={handleOnClick}
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

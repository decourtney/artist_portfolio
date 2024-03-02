import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, useAnimate } from "framer-motion";
import { Category, Product } from "../../utils/customClientTypes";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { setMiniModalState } from "../../redux/miniModalSlice";
import { setProductState } from "../../redux/productSlice";
import { setSliderItemState } from "../../redux/sliderItemSlice";

const baseCDN =
  import.meta.env.VITE_BASE_CDN ||
  "https://chumbucket.donovancourtney.dev/artist_portfolio";

const MiniModal = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { miniModalContainerId, modalItem, marginPosition } = useAppSelector(
    (state: RootState) => state.miniModal.miniModalState
  );
  const sliderItemState = useAppSelector(
    (state: RootState) => state.sliderItem.sliderItemState
  );
  const [miniImgDimensions, setMiniImgDimensions] = useState<{
    width: number;
    height: number;
    margin: string;
  } | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [scope, animate] = useAnimate();
  const maxModalWidth = 300;
  const maxModalHeight = 300;
  const sliderItemWidth =
    sliderItemState[miniModalContainerId].sliderItemRect.width;
  const sliderItemHeight =
    sliderItemState[miniModalContainerId].sliderItemRect.height;
  const detailsHeight = 96;

  let { username: userParam } = useParams();
  if (!userParam) userParam = import.meta.env.VITE_BASE_USER;

  // responsiveness much better but need to fix bug - when modal's sliderItem leaves visible space
  // the modal stays open and lost = need to close when sliderItem leaves.

  useEffect(() => {
    // Construct image URL
    if (modalItem) setImgSrc(`${baseCDN}/${userParam}/${modalItem.image}`);
  }, [userParam, modalItem]);

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

        // NOTE Affects the size of horizontal images
        // If the calculated height is less than the minimum height, adjust dimensions
        if (finalHeight < minHeight) {
          finalHeight = minHeight;
          finalWidth = finalHeight * aspectRatio;
        }

        // Calculate the margin to center the modal relative to modalItem size
        let horizontalMargin = (sliderItemWidth - finalWidth) * 0.5;
        const verticalMargin =
          (sliderItemHeight - finalHeight + -detailsHeight) * 0.5;

        // Adjust margin for first and last item
        if (marginPosition === "left") {
          horizontalMargin = 0;
        } else if (marginPosition === "right") {
          horizontalMargin = horizontalMargin * 2;
        }

        setMiniImgDimensions({
          width: finalWidth,
          height: finalHeight,
          margin: `${verticalMargin}px ${horizontalMargin}px`,
        });
      };
    }
  }, [imgSrc, sliderItemState]);

  useEffect(() => {
    if (miniImgDimensions) animateOpen();
  }, [miniImgDimensions]);

  const animateOpen = async () => {
    await animate([
      [
        scope.current,
        {
          ...miniImgDimensions,
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

  const animateClose = async () => {
    await animate([
      [
        scope.current,
        {
          ...sliderItemState[miniModalContainerId].sliderItemRect,
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

  const animateExpand = async ()=>{
    
  }

  const handleOnClick = () => {
    const { bottom, height, left, right, top, width, x, y } =
      scope.current.getBoundingClientRect();

    dispatch(
      setProductState({
        productContainerId: miniModalContainerId,
        product: modalItem as Product,
        productRect: { bottom, height, left, right, top, width, x, y },
      })
    );

    dispatch(
      setSliderItemState({
        sliderItemId: miniModalContainerId,
        sliderItemVisibility: "hidden",
      })
    );

    dispatch(
      setMiniModalState({
        showMiniModal: false,
      })
    );

    navigate(`/gallery/${modalItem.name}`);
  };

  return (
    <section
      id="miniModal"
      className="absolute w-full h-full z-10"
      onClick={animateClose}
    >
      <motion.div
        ref={scope}
        key={modalItem.name}
        className="z-20"
        style={{ ...sliderItemState[miniModalContainerId].sliderItemRect }}
        onMouseLeave={animateClose}
        onClick={(event) => {
          event.stopPropagation();
          handleOnClick();
        }}
      >
        {imgSrc && (
          <>
            <img
              src={imgSrc}
              className="w-full h-full shadow-lg object-cover rounded-t-md"
              style={{ imageRendering: "auto" }}
              alt={`${modalItem.name}`}
              loading="lazy"
            />
            <motion.div
              className="details-div w-full h-24 shadow-lg rounded-b-md bg-plight text-center"
              initial={{ height: 0 }}
            >
              Words and stuff go here
            </motion.div>
          </>
        )}
      </motion.div>
    </section>
  );
};

export default MiniModal;

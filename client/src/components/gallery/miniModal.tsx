import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { Category, Product } from "../../utils/customClientTypes";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { setMiniModalState } from "../../redux/miniModalSlice";
import { setProductState } from "../../redux/productSlice";
import { setSliderItemState } from "../../redux/sliderItemSlice";
import { getModalDimensions } from "./getModalDimensions";

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
    (state: RootState) => state.sliderItem.sliderItemState[miniModalContainerId]
  );
  const [scope, animate] = useAnimate();
  const miniImgDimensions = useRef<{
    width: number;
    height: number;
    margin: string;
  } | null>(null);
  const isExpanding = useRef<boolean>(false);
  const aspectRatio = useRef<number>(0);
  const maxModalWidth = 350;
  const maxModalHeight = 250;
  const sliderItemWidth = sliderItemState.sliderItemRect.width;
  const sliderItemHeight = sliderItemState.sliderItemRect.height;

  let { username: userParam } = useParams();
  if (!userParam) userParam = import.meta.env.VITE_BASE_USER;

  const imgSrc = `${baseCDN}/${userParam}/${modalItem.image}`;

  // TODO responsiveness much better but need to fix bug - when modal's sliderItem leaves visible space
  // the modal stays open and lost = need to close when sliderItem leaves.

  useEffect(() => {
    const img = new Image();
    img.src = imgSrc;

    img.onload = () => {
      aspectRatio.current = img.width / img.height;

      miniImgDimensions.current = getModalDimensions({
        aspectRatio: aspectRatio.current,
        maxWidth: maxModalWidth,
        maxHeight: maxModalHeight,
        minWidth: sliderItemWidth,
        minHeight: sliderItemHeight,
        marginPosition,
      });

      animateOpen();
    };
  }, []);

  const animateOpen = async () => {
    await animate(
      scope.current,
      {
        ...miniImgDimensions.current,
      },
      {
        duration: 0.2,
        onComplete: () => {
          dispatch(
            setSliderItemState({
              sliderItemId: miniModalContainerId,
              sliderItemVisibility: "hidden",
            })
          );
        },
      }
    );
  };

  const animateClose = async () => {
    if (!isExpanding.current) {
      await animate(
        scope.current,
        {
          ...sliderItemState.sliderItemRect,
          width: sliderItemWidth,
          height: sliderItemHeight,
          margin: 0,
        },
        {
          duration: 0.2,
          onComplete: () => {
            dispatch(setMiniModalState({ showMiniModal: false }));
            dispatch(
              setSliderItemState({
                sliderItemId: miniModalContainerId,
                sliderItemVisibility: "visible",
              })
            );
          },
        }
      );
    }
  };

  const animateExpand = async () => {
    isExpanding.current = true;
    const targetDimensions = await getModalDimensions({
      aspectRatio: aspectRatio.current,
      maxWidth: window.innerWidth,
      maxHeight: window.innerHeight,
    });

    await animate(
      scope.current,
      { ...targetDimensions, x: 0, y: 0 },
      {
        duration: 0.2,
        ease: "easeInOut",
        onComplete: () => {
          const { height, width, x, y, top, bottom, left, right } =
            scope.current.getBoundingClientRect();

          dispatch(
            setMiniModalState({
              showMiniModal: false,
            })
          );
          dispatch(
            setProductState({
              productContainerId: miniModalContainerId,
              product: modalItem as Product,
              productRect: { height, width, x, y, top, bottom, left, right },
              showProductModal: true,
            })
          );
        },
      }
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
        style={{ ...sliderItemState.sliderItemRect }}
        onMouseLeave={animateClose}
        onClick={(event) => {
          event.stopPropagation();
          animateExpand();
        }}
      >
        {imgSrc && (
          <img
            src={imgSrc}
            className="w-full h-full shadow-lg object-cover rounded-sm"
            style={{ imageRendering: "auto" }}
            alt={`${modalItem.name}`}
            loading="lazy"
          />
        )}
      </motion.div>
    </section>
  );
};

export default MiniModal;

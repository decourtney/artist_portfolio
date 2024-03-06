import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useAnimate,
  usePresence,
} from "framer-motion";
import { Category, Product } from "../../utils/customClientTypes";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { setMiniModalState } from "../../redux/miniModalSlice";
import { setProductState } from "../../redux/productSlice";
import { setSliderItemState } from "../../redux/sliderItemSlice";
import GetModalDimensions from "../../utils/getModalDimensions";

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
  const [isPresent, safeToRemove] = usePresence();
  const miniImgDimensions = useRef<{
    width: number;
    height: number;
    margin: string;
  } | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const isExpanding = useRef<boolean>(false);
  const aspectRatio = useRef<number>(0);
  const maxModalWidth = 350;
  const maxModalHeight = 250;
  const sliderItemWidth = sliderItemState.sliderItemRect.width;
  const sliderItemHeight = sliderItemState.sliderItemRect.height;

  let { username: userParam } = useParams();
  if (!userParam) userParam = import.meta.env.VITE_BASE_USER;

  const imgSrc = `${baseCDN}/${userParam}/${modalItem.image}`;

  useEffect(() => {
    if (isPresent) {
      if (imgRef.current) {
        const imgWidth = imgRef.current.naturalWidth;
        const imgHeight = imgRef.current.naturalHeight;

        const openAnimation = async () => {
          await animate(
            scope.current,
            {
              ...miniImgDimensions.current,
            },
            {
              duration: 0.2,
              ease: "easeInOut",
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

        imgRef.current.onload = () => {
          aspectRatio.current = imgWidth / imgHeight;

          miniImgDimensions.current = GetModalDimensions({
            aspectRatio: aspectRatio.current,
            maxWidth: maxModalWidth,
            maxHeight: maxModalHeight,
            minWidth: sliderItemWidth,
            minHeight: sliderItemHeight,
            marginPosition,
          });

          openAnimation();
        };
      }
    } else {
      const closeAnimation = async () => {
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
            ease: "easeInOut",
          }
        );

        safeToRemove();
      };

      closeAnimation();
    }
  }, [isPresent, imgRef]);

  const animateExpand = async () => {
    isExpanding.current = true;
    const targetDimensions = await GetModalDimensions({
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

  const handleClose = () => {
    if (!isExpanding.current) {
      dispatch(setMiniModalState({ showMiniModal: false }));
      dispatch(
        setSliderItemState({
          sliderItemId: miniModalContainerId,
          sliderItemVisibility: "visible",
        })
      );
    }
  };

  return (
    <section
      id="miniModal"
      className="absolute w-full h-full "
      onClick={handleClose}
    >
      <motion.div
        ref={scope}
        key={modalItem.name}
        className=" "
        style={{ ...sliderItemState.sliderItemRect }}
        onMouseLeave={handleClose}
        onClick={(event) => {
          event.stopPropagation();
          animateExpand();
        }}
      >
        {imgSrc && (
          <img
            ref={imgRef}
            src={imgSrc}
            className="w-full h-full shadow-lg object-cover rounded-sm pointer-events-none"
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

import React, { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, useAnimate } from "framer-motion";
import { Product } from "../../utils/customClientTypes";
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
  const { miniModalContainerId, modalItem, marginPosition, showMiniModal } =
    useAppSelector((state: RootState) => state.miniModal.miniModalState);
  const sliderItemState = useAppSelector(
    (state: RootState) => state.sliderItem[miniModalContainerId]
  );
  const [scope, animate] = useAnimate();
  const miniImgDimensions = useRef<{
    width: number;
    height: number;
    margin: string;
  } | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const aspectRatio = useRef<number>(0);
  const isExpanding = useRef<boolean>(false);
  const maxModalWidth = 350;
  const maxModalHeight = 250;
  const sliderItemWidth = sliderItemState.sliderItemRect.width;
  const sliderItemHeight = sliderItemState.sliderItemRect.height;

  let { username: userParam } = useParams();
  if (!userParam) userParam = import.meta.env.VITE_BASE_USER;

  const imgSrc = `${baseCDN}/${userParam}/${modalItem.image}`;

  const animateOpen = async () => {
    if (imgRef.current) {
      const imgWidth = imgRef.current.naturalWidth;
      const imgHeight = imgRef.current.naturalHeight;

      const animateOpen = async () => {
        await animate(
          scope.current,
          {
            ...miniImgDimensions.current,
          },
          {
            duration: 0.2,
            ease: "easeInOut",
          }
        );
      };

      aspectRatio.current = imgWidth / imgHeight;

      miniImgDimensions.current = GetModalDimensions({
        aspectRatio: aspectRatio.current,
        maxWidth: maxModalWidth,
        maxHeight: maxModalHeight,
        minWidth: sliderItemWidth,
        minHeight: sliderItemHeight,
        marginPosition,
      });

      animateOpen();
    }
  };

  const animateClose = async () => {
    if (isExpanding.current) return;

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
        onComplete() {
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
  };

  const animateExpand = async () => {
    const targetDimensions = GetModalDimensions({
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
        onPlay: () => {
          dispatch(
            setSliderItemState({
              sliderItemId: miniModalContainerId,
              sliderItemVisibility: "hidden",
            })
          );
        },
        onComplete: () => {
          isExpanding.current = false;
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

  const handleExpandModal = (event: React.MouseEvent) => {
    if (isExpanding.current) return;
    isExpanding.current = true;
    event.stopPropagation();
    animateExpand();
  };

  return (
    <section
      id="miniModal"
      className="absolute w-full h-full"
      onClick={animateClose}
    >
      <motion.div
        ref={scope}
        key={modalItem.name}
        style={{ ...sliderItemState.sliderItemRect }}
        onMouseLeave={animateClose}
        onClick={handleExpandModal}
      >
        {imgSrc && (
          <img
            ref={imgRef}
            src={imgSrc}
            className="w-full h-full shadow-lg object-cover rounded-sm pointer-events-none"
            style={{ imageRendering: "auto" }}
            alt={`${modalItem.name}`}
            loading="lazy"
            onLoad={() => animateOpen()}
          />
        )}
      </motion.div>
    </section>
  );
};

export default MiniModal;

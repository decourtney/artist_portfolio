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
import { AnimatePresence, motion } from "framer-motion";
import { Category, Product } from "../../utils/customClientTypes";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { RootState } from "../../store";
import { setSliderState } from "../../redux/sliderSlice";
import { setGalleryState } from "../../redux/gallerySlice";

const baseCDN =
  import.meta.env.VITE_BASE_CDN ||
  "https://chumbucket.donovancourtney.dev/artist_portfolio";

const MiniModal = () => {
  const dispatch = useAppDispatch();
  const galleryState = useAppSelector(
    (state: RootState) => state.gallery.galleryState
  );
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (galleryState.sliderItemId) {
      const sliderItemElement = document.getElementById(
        galleryState.sliderItemId
      );

      // FIXME Issues with mini modal - check if sliderItemElement can be populated outside the useEffect
      // FIXME data was here before using the useEffect
      console.log(sliderItemElement)
      if (sliderItemElement) {
        setDimensions({
          width: sliderItemElement.offsetWidth,
          height: sliderItemElement.offsetHeight,
        });
      }
    }
  }, [galleryState.sliderItemId]);
  
  // console.log(dimensions)
  return (
    <section
      className={`absolute top-0 left-0 w-[${dimensions.width}px] h-[${dimensions.height}px] bg-blue-500`}
      onClick={() =>
        dispatch(setGalleryState({ sliderItemId: null, showMiniModal: false }))
      }
    ></section>
  );
};

export default MiniModal;

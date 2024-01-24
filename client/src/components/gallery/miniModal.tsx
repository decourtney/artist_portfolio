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

const baseCDN =
  import.meta.env.VITE_BASE_CDN ||
  "https://chumbucket.donovancourtney.dev/artist_portfolio";

const MiniModal = () => {
  const galleryState = useAppSelector(
    (state: RootState) => state.gallery.galleryState
  );

  useEffect(() => {
    console.log(galleryState);
  });
  return <></>;
};

export default MiniModal;

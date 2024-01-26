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
import { setMiniModalState } from "../../redux/miniModalSlice";

const baseCDN =
  import.meta.env.VITE_BASE_CDN ||
  "https://chumbucket.donovancourtney.dev/artist_portfolio";

const MiniModal = () => {
  const dispatch = useAppDispatch();
  const { sliderItem, sliderItemRect, showMiniModal } = useAppSelector(
    (state: RootState) => state.miniModal.miniModalState
  );

  useEffect(() => {
    console.log(sliderItemRect);
  }, [sliderItemRect]);

  if (!showMiniModal || !sliderItemRect) return null;

  return (
    <section>
      <motion.div
        className="bg-blue-500"
        style={{ position: "absolute", ...sliderItemRect }}
        initial={{ top: 0, left: 0 }}
        animate={{
          bottom: "50%",
          height: "50%",
          left: "50%",
          right: "50%",
          top: "50%",
          width: "50%",
          x: "-50%",
          y: "-50%",
        }}
        onClick={() => dispatch(setMiniModalState({ showMiniModal: false }))}
      ></motion.div>
    </section>
  );
};

export default MiniModal;

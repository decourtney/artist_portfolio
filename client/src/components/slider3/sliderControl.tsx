import React from "react";
import { Icon } from "@iconify/react";
import chevronLeft from "@iconify/icons-mdi/chevron-left";
import chevronRight from "@iconify/icons-mdi/chevron-right";
import { motion } from "framer-motion";

interface SliderControlProps {
  arrowDirection: "left" | "right";
  onClick: () => void;
}

const SliderControl = ({ arrowDirection, onClick }: SliderControlProps) => {
  return (
    <div
      id="slider-control"
      className={`absolute flex top-0 ${arrowDirection}-0 w-[4%] h-full bg-black bg-opacity-25 text-5xl text-white z-10 pointer-events-auto cursor-pointer hover:bg-opacity-50`}
      onClick={onClick}
    >
      <motion.div className="flex justify-center items-center opacity-0 group-hover:opacity-100 hover:-scale-y-150 w-full h-full">
        <Icon icon={arrowDirection === "right" ? chevronRight : chevronLeft} />
      </motion.div>
    </div>
  );
};

export default SliderControl;

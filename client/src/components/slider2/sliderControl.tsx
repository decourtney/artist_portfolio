import React from "react";
import { Icon } from "@iconify/react";
import chevronLeft from "@iconify/icons-mdi/chevron-left";
import chevronRight from "@iconify/icons-mdi/chevron-right";

interface SliderControlProps {
  arrowDirection: "left" | "right";
  onClick: () => void;
}

const SliderControl = ({ arrowDirection, onClick }: SliderControlProps) => {
  return (
    <div
      id="slider-control"
      className={`bg-blue-400 absolute flex justify-center items-center top-0 ${arrowDirection}-0 w-[4%] h-full text-5xl z-10 pointer-events-auto cursor-pointer active:block`}
    >
      <div className="" onClick={onClick}>
        <Icon icon={arrowDirection === "right" ? chevronRight : chevronLeft} />
      </div>
    </div>
  );
};

export default SliderControl;

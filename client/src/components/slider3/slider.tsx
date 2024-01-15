import React, { useState, useEffect } from "react";
import { Product, Category } from "../../utils/customClientTypes";
import { motion } from "framer-motion";
import SliderItem from "./sliderItem";

interface SliderProps {
  handleOnClickItem: (item: Product | Category) => void;
  itemsToDisplay: Product[] | Category[];
  numberToDisplay: number;
  isCenteredSlides?: boolean;
  displayDirection?: "horizontal" | "vertical" | undefined;
  categoryIndex: number;
}

const Slider = ({
  handleOnClickItem,
  itemsToDisplay,
  categoryIndex,
  numberToDisplay,
  isCenteredSlides,
  displayDirection,
}: SliderProps) => {
  const [itemsPerGroup, setItemsPerGroup] = useState(4);
  const [lowestVisibleIndex, setLowestVisibleIndex] = useState(0);
  const [sliderHasMoved, setSliderHasMoved] = useState(true);

  /* Returns an array of indexes. Starting index is relative to the lowestVisibleIndex and position requested */
  const getIndexGroup = (position: "previous" | "visible" | "next") => {
    let indexes = [];
    let currentIndex = 0;

    // Get the starting index based on group position
    switch (position) {
      case "previous":
        currentIndex =
          (lowestVisibleIndex - itemsPerGroup + itemsToDisplay.length) %
          itemsToDisplay.length;
        break;
      case "visible":
        currentIndex = lowestVisibleIndex;
        break;
      case "next":
        currentIndex =
          (lowestVisibleIndex + itemsPerGroup) % itemsToDisplay.length;
        break;
      default:
        currentIndex = 0;
        break;
    }

    for (let i = 0; i < itemsPerGroup; i++) {
      if (currentIndex < 0 || Object.is(currentIndex, -0)) {
        currentIndex =
          (currentIndex + itemsToDisplay.length) % itemsToDisplay.length;
      }
      indexes.push(currentIndex);

      currentIndex = (currentIndex + 1) % itemsToDisplay.length;
    }

    return indexes;
  };

  const getSlides = () => {};

  // console.log(getPreviousIndexes(), getVisibleIndexes(), getNextIndexes());
  console.log(
    getIndexGroup("previous"),
    getIndexGroup("visible"),
    getIndexGroup("next")
  );

  const handlePrev = () => {};

  const handleNext = () => {};

  return (
    <div id="slider" className="relative">
      <div className="relative flex flex-row items-center h-36 w-full bg-orange-500">
        <div className="absolute flex h-full w-full">
          {getIndexGroup("visible").map((index, i) => {
            return (
              <SliderItem
                itemToDisplay={itemsToDisplay[index]}
                key={`${itemsToDisplay[index]?.name}-${categoryIndex}-${i}`}
                width={100 / itemsPerGroup}
              />
            );
          })}
        </div>

        <div className="absolute left-full flex h-full w-full">
          {getIndexGroup("next").map((index, i) => {
            return (
              <SliderItem
                itemToDisplay={itemsToDisplay[index]}
                key={`${itemsToDisplay[index]?.name}-${categoryIndex}-${i}`}
                width={100 / itemsPerGroup}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Slider;

import React, { useState, useEffect, Children } from "react";
import { Product, Category } from "../../utils/customClientTypes";
import { motion, useAnimate, AnimatePresence, stagger } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import SliderItem from "./sliderItem";
import SliderControl from "./sliderControl";

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
  const [sliderHasMoved, setSliderHasMoved] = useState(false);
  const [previousGroup, setPreviousGroup] = useState<number[]>([]);
  const [visibleGroup, setVisibleGroup] = useState<number[]>([]);
  const [nextGroup, setNextGroup] = useState<number[]>([]);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    handleWindowResize(window);
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  // handle window resize and sets items in row
  const handleWindowResize = (e: any) => {
    if (window.innerWidth > 1440) {
      setItemsPerGroup(6);
    } else if (window.innerWidth >= 1000) {
      setItemsPerGroup(5);
    } else if (window.innerWidth < 1000) {
      setItemsPerGroup(4);
    }
  };

  /* Returns an array of indexes. Starting index is relative to the lowestVisibleIndex and position requested */
  const getIndexGroup = (position: "previous" | "visible" | "next") => {
    let indexes = [];
    let previous = [];
    let visible = [];
    let next = [];
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

  useEffect(() => {
    setPreviousGroup(getIndexGroup("previous"));
    setVisibleGroup(getIndexGroup("visible"));
    setNextGroup(getIndexGroup("next"));
  }, [lowestVisibleIndex, itemsPerGroup]);

  // console.log(
  //   getIndexGroup("previous"),
  //   getIndexGroup("visible"),
  //   getIndexGroup("next")
  // );

  const handlePrev = async () => {
    await animate(
      "#slider-item",
      { translateX: `${100 * itemsPerGroup}%` },
      { duration: 1 }
    );
    setSliderHasMoved(true);

    setLowestVisibleIndex(
      (lowestVisibleIndex - itemsPerGroup + itemsToDisplay.length) %
        itemsToDisplay.length
    );

    setPreviousGroup(getIndexGroup("previous"));
    setVisibleGroup(getIndexGroup("visible"));
    setNextGroup(getIndexGroup("next"));
  };

  const handleNext = async () => {
    await animate(
      "#slider-item",
      { translateX: `-${100 * itemsPerGroup}%` },
      { duration: 1 }
    );
    setSliderHasMoved(true);

    setLowestVisibleIndex(
      (lowestVisibleIndex + itemsPerGroup) % itemsToDisplay.length
    );

    setPreviousGroup(getIndexGroup("previous"));
    setVisibleGroup(getIndexGroup("visible"));
    setNextGroup(getIndexGroup("next"));
  };

  return (
    <div id="slider" className="group relative px-[4%]">
      {sliderHasMoved && (
        <SliderControl arrowDirection={"left"} onClick={handlePrev} />
      )}

      <div
        ref={scope}
        className="slider-row relative flex flex-row items-center h-[20dvh]"
      >
        {/* <SliderItem
          key={uuidv4()}
          itemsToDisplay={itemsToDisplay}
          indexList={visibleGroup}
        />
        <SliderItem
          key={uuidv4()}
          itemsToDisplay={itemsToDisplay}
          indexList={nextGroup}
          position={"left-full"}
        /> */}

        <section className="slider-group absolute right-full flex h-full w-full">
          {sliderHasMoved &&
            previousGroup.map((index, i) => {
              return (
                <SliderItem
                  itemToDisplay={itemsToDisplay[index]}
                  key={uuidv4()}
                />
              );
            })}
        </section>

        <section className="slider-group absolute flex h-full w-full">
          {visibleGroup.map((index, i) => {
            return (
              <SliderItem
                itemToDisplay={itemsToDisplay[index]}
                key={uuidv4()}
              />
            );
          })}
        </section>

        <section className="slider-group absolute left-full flex h-full w-full">
          {nextGroup.map((index, i) => {
            return (
              <SliderItem
                itemToDisplay={itemsToDisplay[index]}
                key={uuidv4()}
              />
            );
          })}
        </section>
      </div>

      <SliderControl arrowDirection={"right"} onClick={handleNext} />
    </div>
  );
};

export default Slider;

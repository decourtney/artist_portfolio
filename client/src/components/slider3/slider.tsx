import React, { useState, useEffect, useRef } from "react";
import { Product, Category } from "../../utils/customClientTypes";
import { motion, useAnimate, AnimatePresence, stagger, useAnimationFrame } from "framer-motion";
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
  const [previousPeek, setPreviousPeek] = useState<number>(0);
  const [nextPeek, setNextPeek] = useState<number>(0);
  const [scope, animate] = useAnimate();
  // const [isSliding, setIsSliding] = useState(false);
  const isSliding = useRef(false);

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

  useEffect(() => {
    setPreviousGroup(getIndexGroup("previous"));
    setVisibleGroup(getIndexGroup("visible"));
    setNextGroup(getIndexGroup("next"));
  }, [lowestVisibleIndex, itemsPerGroup]);

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
        // Endcap for group
        setPreviousPeek((lowestVisibleIndex - (itemsPerGroup + 1) + itemsToDisplay.length) % itemsToDisplay.length);

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

        // Endcap for group
        setNextPeek((lowestVisibleIndex + itemsPerGroup * 2) % itemsToDisplay.length);
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

  const handlePrev = async () => {
    if (!isSliding.current) {
      isSliding.current = true;

      await animate(
        "#slider-item",
        { translateX: `${100 * itemsPerGroup}%` },
        { duration: 1, onComplete: () => isSliding.current = false }
      );
      setSliderHasMoved(true);

      setLowestVisibleIndex(
        (lowestVisibleIndex - itemsPerGroup + itemsToDisplay.length) %
        itemsToDisplay.length
      );

      setPreviousGroup(getIndexGroup("previous"));
      setVisibleGroup(getIndexGroup("visible"));
      setNextGroup(getIndexGroup("next"));
    }
  };

  const handleNext = async () => {
    if (!isSliding.current) {
      isSliding.current = true;

      await animate(
        "#slider-item",
        { translateX: `-${100 * itemsPerGroup}%` },
        { duration: 1, onComplete: () => isSliding.current = false }
      );
      setSliderHasMoved(true);

      setLowestVisibleIndex(
        (lowestVisibleIndex + itemsPerGroup) % itemsToDisplay.length
      );

      setPreviousGroup(getIndexGroup("previous"));
      setVisibleGroup(getIndexGroup("visible"));
      setNextGroup(getIndexGroup("next"));
    }
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
        <section className="slider-group absolute right-full flex h-full w-full">
          {sliderHasMoved &&
            previousGroup.map((index) => {
              return (
                <SliderItem
                  key={uuidv4()}
                  itemToDisplay={itemsToDisplay[index]}
                />
              );
            })}
        </section>

        <section className="slider-group absolute flex h-full w-full">
          {visibleGroup.map((index) => {
            return (
              <SliderItem
                key={uuidv4()}
                itemToDisplay={itemsToDisplay[index]}
              />
            );
          })}

        </section>

        <section className="slider-group absolute left-full flex h-full w-full">
          {nextGroup.map((index) => {
            return (
              <SliderItem
                key={uuidv4()}
                itemToDisplay={itemsToDisplay[index]}
              />
            );
          })}

        </section>

        <section className={`slider-group absolute left-full h-full flex justify-center w-full`}>
          {/* <div className="flex"> */}
            <SliderItem key={uuidv4} itemToDisplay={itemsToDisplay[nextPeek]} />
          {/* </div> */}
        </section>

      </div>

      <SliderControl arrowDirection={"right"} onClick={handleNext} />
    </div>
  );
};

export default Slider;

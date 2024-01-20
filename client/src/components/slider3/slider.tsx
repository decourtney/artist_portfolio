import React, { useState, useEffect, useRef } from "react";
import { Product, Category } from "../../utils/customClientTypes";
import {
  motion,
  useAnimate,
  AnimatePresence,
  stagger,
  useAnimationFrame,
} from "framer-motion";
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
  const [sliderItemWidth, setSliderItemWidth] = useState(0);
  let isSliding = false;

  useEffect(() => {
    handleWindowResize(window);
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  useEffect(() => {
    setPreviousGroup(getIndexGroup("previous"));
    setVisibleGroup(getIndexGroup("visible"));
    setNextGroup(getIndexGroup("next"));
    setSliderItemWidth(100 / itemsPerGroup);
  }, [lowestVisibleIndex, itemsPerGroup]);

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

  const getPositiveModulo = (n: number) => {
    const mod =
      ((n % itemsToDisplay.length) + itemsToDisplay.length) %
      itemsToDisplay.length;

    return mod;
  };

  /* Returns an array of indexes. Starting index is relative to the lowestVisibleIndex and position requested */
  const getIndexGroup = (position: "previous" | "visible" | "next") => {
    let indexes = [];
    let currentIndex = 0;

    // Get the starting index based on group position
    switch (position) {
      case "previous": {
        // Calc index for group peek
        setPreviousPeek(
          getPositiveModulo(lowestVisibleIndex - itemsPerGroup - 1)
        );

        currentIndex = getPositiveModulo(lowestVisibleIndex - itemsPerGroup);
        break;
      }
      case "visible":
        currentIndex = lowestVisibleIndex;
        break;
      case "next": {
        currentIndex =
          (lowestVisibleIndex + itemsPerGroup) % itemsToDisplay.length;

        // Calc index for group peek
        setNextPeek(
          (lowestVisibleIndex + itemsPerGroup * 2) % itemsToDisplay.length
        );
        break;
      }
      default:
        currentIndex = 0;
        break;
    }

    for (let i = 0; i < itemsPerGroup; i++) {
      indexes.push(currentIndex);

      currentIndex = (currentIndex + 1) % itemsToDisplay.length;
    }

    return indexes;
  };

  const handlePrev = async () => {
    if (!isSliding) {
      isSliding = true;

      await animate(
        "#slider-item",
        { x: `${100 * itemsPerGroup}%` },
        {
          duration: 1,
          onComplete: () => (isSliding = false),
        }
      );
      setSliderHasMoved(true);

      setLowestVisibleIndex(
        getPositiveModulo(lowestVisibleIndex - itemsPerGroup)
      );

      setPreviousGroup(getIndexGroup("previous"));
    }
  };

  const handleNext = async () => {
    if (!isSliding) {
      isSliding = true;

      await animate(
        "#slider-item",
        { x: `-${100 * itemsPerGroup}%` },
        {
          duration: 1,
          onComplete: () => (isSliding = false),
        }
      );
      setSliderHasMoved(true);

      setLowestVisibleIndex(
        (lowestVisibleIndex + itemsPerGroup) % itemsToDisplay.length
      );

      setNextGroup(getIndexGroup("next"));
    }
  };

  return (
    <div id="slider" className="group relative px-[4%] overflow-clip">
      {sliderHasMoved && (
        <SliderControl arrowDirection={"left"} onClick={handlePrev} />
      )}

      <div
        ref={scope}
        className="slider-row relative flex flex-row items-center h-[20dvh]"
      >
        <section className="slider-group absolute right-full flex h-full w-full">
          <div
            id="groupCap"
            className={`absolute right-full flex justify-end h-full w-full`}
          >
            <SliderItem
              key={uuidv4()}
              itemToDisplay={itemsToDisplay[previousPeek]}
              sliderItemWidth={sliderItemWidth}
            />
          </div>

          {sliderHasMoved &&
            previousGroup.map((index) => {
              return (
                <SliderItem
                  key={uuidv4()}
                  itemToDisplay={itemsToDisplay[index]}
                  sliderItemWidth={sliderItemWidth}
                  // onClick={handleOnClickItem}
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
                sliderItemWidth={sliderItemWidth}
                // onClick={handleOnClickItem}
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
                sliderItemWidth={sliderItemWidth}
                // onClick={handleOnClickItem}
              />
            );
          })}

          <div
            id="groupCap"
            className="absolute left-full flex justify-start h-full w-full"
          >
            <SliderItem
              key={uuidv4()}
              itemToDisplay={itemsToDisplay[nextPeek]}
              sliderItemWidth={sliderItemWidth}
              // onClick={handleOnClickItem}
            />
          </div>
        </section>
      </div>

      <SliderControl arrowDirection={"right"} onClick={handleNext} />
    </div>
  );
};

export default Slider;

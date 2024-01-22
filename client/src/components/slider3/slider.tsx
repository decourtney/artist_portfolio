import React, { useState, useEffect, useRef } from "react";
import { Product, Category } from "../../utils/customClientTypes";
import {
  motion,
  useAnimate,
  AnimatePresence,
  stagger,
  useAnimationFrame,
} from "framer-motion";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setLowestVisibleIndex, setIsSliding } from "../../redux/sliderSlice";
import { v4 as uuidv4 } from "uuid";
import SliderItem from "./sliderItem";
import SliderControl from "./sliderControl";

interface SliderProps {
  itemsToDisplay: Product[] | Category[];
  numberToDisplay: number;
  isCenteredSlides?: boolean;
  displayDirection?: "horizontal" | "vertical" | undefined;
  categoryIndex: number;
}

const Slider = ({
  itemsToDisplay,
  categoryIndex,
  numberToDisplay,
  isCenteredSlides,
  displayDirection,
}: SliderProps) => {
  // const dispatch = useAppDispatch();
  // const currentIndex = useAppSelector((state) => state.slider.currentIndex);
  // const isSliding = useAppSelector((state) => state.slider.isSliding);

  const [itemsPerGroup, setItemsPerGroup] = useState(1);
  // const [lowestVisibleIndex, setLowestVisibleIndex] = useState(0);
  const [renderSlider, setRenderSlider] = useState(false);
  const [sliderHasMoved, setSliderHasMoved] = useState(false);
  const [previousGroup, setPreviousGroup] = useState<number[]>([]);
  const [visibleGroup, setVisibleGroup] = useState<number[]>([]);
  const [nextGroup, setNextGroup] = useState<number[]>([]);

  // const previousGroup = useRef<number[]>([]);
  // const visibleGroup = useRef<number[]>([]);
  // const nextGroup = useRef<number[]>([]);
  // const previousPeek = useRef<number>(0);
  // const nextPeek = useRef<number>(0);

  const [previousPeek, setPreviousPeek] = useState<number>(0);
  const [nextPeek, setNextPeek] = useState<number>(0);
  // const [sliderItemWidth, setSliderItemWidth] = useState(0);
  const lowestVisibleIndex = useRef(0);
  const [scope, animate] = useAnimate();
  let sliderItemWidth = useRef(0);
  let isSliding = false;

  useEffect(() => {
    // setPreviousGroup(renderContent("previous"));
    // setVisibleGroup(renderContent("visible"));
    // setNextGroup(renderContent("next"));

    // setSliderItemWidth(100 / itemsPerGroup);
    sliderItemWidth.current = 100 / itemsPerGroup;
    getSliderIndexGroups();
  }, [renderSlider, itemsPerGroup]);

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

  const getPositiveModulo = (n: number) => {
    const mod =
      ((n % itemsToDisplay.length) + itemsToDisplay.length) %
      itemsToDisplay.length;

    return mod;
  };

  /* Returns an array of indexes. Starting index is relative to the lowestVisibleIndex and position requested */
  const getSliderIndexGroups = () => {
    let previous = [];
    let visible = [];
    let next = [];
    let currentIndex = lowestVisibleIndex.current;

    for (let i = 0; i < itemsPerGroup; i++) {
      previous.push(getPositiveModulo(currentIndex - itemsPerGroup));
      visible.push(currentIndex);
      next.push(getPositiveModulo(currentIndex + itemsPerGroup));

      currentIndex = (currentIndex + 1) % itemsToDisplay.length;
    }

    setPreviousPeek(
      getPositiveModulo(lowestVisibleIndex.current - itemsPerGroup - 1)
    );
    setPreviousGroup(previous);
    setVisibleGroup(visible);
    setNextGroup(next);
    setNextPeek(
      (lowestVisibleIndex.current + itemsPerGroup * 2) % itemsToDisplay.length
    );
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

      lowestVisibleIndex.current = getPositiveModulo(
        lowestVisibleIndex.current - itemsPerGroup
      );

      setRenderSlider(!renderSlider);
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

      lowestVisibleIndex.current =
        (lowestVisibleIndex.current + itemsPerGroup) % itemsToDisplay.length;

      setRenderSlider(!renderSlider);
    }
  };

  return (
    <div id="slider" className="group relative px-[4%] overflow-hidden">
      {sliderHasMoved && (
        <SliderControl arrowDirection={"left"} onClick={handlePrev} />
      )}

      <div
        ref={scope}
        className="slider-row relative flex flex-row items-center h-[20dvh]"
      >
        <section className="slider-group absolute right-full flex h-full w-full">
          <div
            id="groupPeek"
            className={`absolute right-full flex justify-end h-full w-full`}
          >
            <SliderItem
              key={uuidv4()}
              itemToDisplay={itemsToDisplay[previousPeek]}
              sliderItemWidth={sliderItemWidth.current}
            />
          </div>

          {sliderHasMoved &&
            previousGroup.map((index) => {
              return (
                <SliderItem
                  key={uuidv4()}
                  itemToDisplay={itemsToDisplay[index]}
                  sliderItemWidth={sliderItemWidth.current}
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
                sliderItemWidth={sliderItemWidth.current}
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
                sliderItemWidth={sliderItemWidth.current}
              />
            );
          })}

          <div
            id="groupPeek"
            className="absolute left-full flex justify-start h-full w-full"
          >
            <SliderItem
              key={uuidv4()}
              itemToDisplay={itemsToDisplay[nextPeek]}
              sliderItemWidth={sliderItemWidth.current}
            />
          </div>
        </section>
      </div>

      <SliderControl arrowDirection={"right"} onClick={handleNext} />
    </div>
  );
};

export default Slider;

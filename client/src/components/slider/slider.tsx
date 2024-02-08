/* 
Slider uses a combination of Redux and local state management. Redux is used to track individual slider's
lowest visible index for slide scrolling and if the slider has moved - resulting in the display of the 
previous button and peek card. Redux also has a global state, isSliding, to disable mouse events while
any slider is moving.

Currently, the slider adjusts the number of displayed cards relative to the window width and slides that
many cards each iteration.

Possible additions:
- Need more window size breakpoints.
- Currently the animation can be easily modified in code for different visuals but would
be nice to have this a configurable option.
- Configurable slide speed.
- Disable/Enable looping slides.
*/

import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Category } from "../../utils/customClientTypes";
import { useAnimate } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { RootState } from "../../store";
import { setSliderState } from "../../redux/sliderSlice";
import SliderItem from "./sliderItem";
import SliderControl from "./sliderControl";

interface SliderProps {
  categoryToDisplay: Category;
}

const Slider = ({ categoryToDisplay }: SliderProps) => {
  const [itemsPerGroup, setItemsPerGroup] = useState(1); // This value is dynamically changed with window size
  const [previousGroup, setPreviousGroup] = useState<number[]>([]); // Stores indexes of previous group
  const [visibleGroup, setVisibleGroup] = useState<number[]>([]); // Stores indexes of visible group
  const [nextGroup, setNextGroup] = useState<number[]>([]); // Stores indexes of next group
  const [previousPeek, setPreviousPeek] = useState<number>(0); // Stores the index of the previous peek card
  const [nextPeek, setNextPeek] = useState<number>(0); // Stores the index of the next peek card
  const [slideDirection, setSlideDirection] = useState<"next" | "prev" | null>(
    null
  );
  const [scope, animate] = useAnimate();
  const dispatch = useAppDispatch();
  const sliderState = useAppSelector(
    (state: RootState) => state.slider.sliderState
  );
  const sliderGlobalState = useAppSelector(
    (state: RootState) => state.slider.globalSettings
  );
  const previousPeekKey = uuidv4();
  const nextPeekKey = uuidv4();
  const sliderItemWidth = useRef(0);
  const itemsToDisplay = categoryToDisplay.products;
  const sliderId = `${categoryToDisplay.name}-slider`; // Used to track each slider for redux state management

  if (!itemsToDisplay) return null;

  useLayoutEffect(() => {
    getSliderIndexGroups();
    sliderItemWidth.current = 100 / itemsPerGroup;
  }, [itemsPerGroup, sliderState[sliderId]?.lowestVisibleIndex]);

  useLayoutEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (!sliderState[sliderId]) {
      dispatch(
        setSliderState({
          sliderId: `${categoryToDisplay.name}-slider`,
          lowestVisibleIndex: 0,
          sliderHasMoved: false,
        })
      );
    }
  }, []);

  useEffect(() => {
    if (sliderGlobalState.isSliding) {
      let currentLowestIndex: number;
      let xValue: string;

      if (slideDirection === "next") {
        {
          currentLowestIndex = getPositiveModulo(
            sliderState[sliderId].lowestVisibleIndex + itemsPerGroup
          );
          xValue = `-${100 * itemsPerGroup}%`;
        }
      } else if (slideDirection === "prev") {
        {
          currentLowestIndex = getPositiveModulo(
            sliderState[sliderId].lowestVisibleIndex - itemsPerGroup
          );
          xValue = `${100 * itemsPerGroup}%`;
        }
      }

      const playAnim = async () => {
        await animate(
          ".slider-item",
          { x: xValue },
          {
            duration: 1,
            ease: "easeInOut",
            onComplete: () => {
              setSlideDirection(null);
              dispatch(
                setSliderState({
                  sliderId,
                  lowestVisibleIndex: currentLowestIndex,
                  sliderHasMoved: true,
                })
              );
              dispatch(
                setSliderState({ globalSettings: { isSliding: false } })
              );
            },
          }
        );
      };

      playAnim();
    }
  }, [sliderGlobalState.isSliding]);

  // handle window resize and sets items in row
  const handleWindowResize = () => {
    const innerWidth = window.innerWidth;
    let newItemsPerGroup;

    switch (true) {
      case innerWidth > 1920:
        newItemsPerGroup = 7
        break;
      case innerWidth > 1440:
        newItemsPerGroup = 6;
        break;
      case innerWidth >= 1200:
        newItemsPerGroup = 5;
        break;
      case innerWidth >= 992:
        newItemsPerGroup = 4;
        break;
      case innerWidth >= 768:
        newItemsPerGroup = 4;
        break;
      case innerWidth >= 480:
        newItemsPerGroup = 3;
        break;
      case innerWidth < 480:
        newItemsPerGroup = 2;
        break;
      default:
        newItemsPerGroup = 2;
    }

    setItemsPerGroup(newItemsPerGroup);
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
    const lowestVisibleIndex = sliderState[sliderId]?.lowestVisibleIndex;
    let currentIndex = lowestVisibleIndex;

    for (let i = 0; i < itemsPerGroup; i++) {
      previous.push(getPositiveModulo(currentIndex - itemsPerGroup));
      visible.push(currentIndex);
      next.push(getPositiveModulo(currentIndex + itemsPerGroup));

      currentIndex = (currentIndex + 1) % itemsToDisplay.length;
    }

    setPreviousPeek(getPositiveModulo(lowestVisibleIndex - itemsPerGroup - 1));
    setPreviousGroup(previous);
    setVisibleGroup(visible);
    setNextGroup(next);
    setNextPeek(
      (lowestVisibleIndex + itemsPerGroup * 2) % itemsToDisplay.length
    );
  };

  const handlePrev = async () => {
    if (!sliderGlobalState.isSliding) {
      setSlideDirection("prev");
      dispatch(setSliderState({ globalSettings: { isSliding: true } }));
    }
  };

  const handleNext = async () => {
    if (!sliderGlobalState.isSliding) {
      setSlideDirection("next");
      dispatch(setSliderState({ globalSettings: { isSliding: true } }));
    }
  };

  return (
    <div id="slider" className="group relative px-[4vw] overflow-hidden">
      {sliderState[sliderId] && sliderState[sliderId].sliderHasMoved && (
        <SliderControl arrowDirection={"left"} onClick={handlePrev} />
      )}

      <div
        ref={scope}
        className={`slider-row relative flex flex-row items-center h-[20dvh] ${
          sliderGlobalState.isSliding
            ? "pointer-events-none"
            : "pointer-events-auto"
        }`}
      >
        <section className="absolute right-full flex h-full w-full pointer-events-none">
          <div
            id="groupPeek"
            className="absolute right-full flex h-full w-full"
          >
            <SliderItem
              key={previousPeekKey}
              sliderItemId={previousPeekKey}
              itemToDisplay={itemsToDisplay[previousPeek]}
              sliderItemWidth={sliderItemWidth.current}
            />
          </div>

          {sliderState[sliderId] &&
            sliderState[sliderId].sliderHasMoved &&
            previousGroup.map((index) => {
              const key = uuidv4();
              return (
                <SliderItem
                  key={key}
                  sliderItemId={key}
                  itemToDisplay={itemsToDisplay[index]}
                  sliderItemWidth={sliderItemWidth.current}
                />
              );
            })}
        </section>

        <section className="absolute flex h-full w-full">
          {visibleGroup.map((index) => {
            const key = uuidv4();
            return (
              <SliderItem
                key={key}
                sliderItemId={key}
                itemToDisplay={itemsToDisplay[index]}
                sliderItemWidth={sliderItemWidth.current}
              />
            );
          })}
        </section>

        <section className="absolute left-full flex h-full w-full pointer-events-none">
          {nextGroup.map((index) => {
            const key = uuidv4();
            return (
              <SliderItem
                key={key}
                sliderItemId={key}
                itemToDisplay={itemsToDisplay[index]}
                sliderItemWidth={sliderItemWidth.current}
              />
            );
          })}

          <div id="groupPeek" className="absolute left-full flex h-full w-full">
            <SliderItem
              key={nextPeekKey}
              sliderItemId={nextPeekKey}
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

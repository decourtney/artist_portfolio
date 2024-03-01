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
import { useAnimate, motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { setSliderState } from "../../redux/sliderSlice";
import SliderItem from "./sliderItem";
import SliderControl from "./sliderControl";
import { Product } from "../../utils/customClientTypes";

interface SliderProps {
  categoryToDisplay: Category;
}

const Slider = ({ categoryToDisplay }: SliderProps) => {
  const [scope, animate] = useAnimate();
  const dispatch = useAppDispatch();
  const sliderState = useAppSelector(
    (state: RootState) => state.slider.sliderState
  );
  const sliderGlobalState = useAppSelector(
    (state: RootState) => state.slider.globalSettings
  );
  const [itemsPerGroup, setItemsPerGroup] = useState<number>(8); // This value is dynamically changed with window size
  const [scrollAmount, setScrollAmount] = useState<number>(1); // Controls how many items are scrolled through
  const [previousGroup, setPreviousGroup] = useState<number[]>([]); // Stores indexes of previous group
  const [visibleGroup, setVisibleGroup] = useState<number[]>([]); // Stores indexes of visible group
  const [nextGroup, setNextGroup] = useState<number[]>([]); // Stores indexes of next group
  const [previousPeek, setPreviousPeek] = useState<number>(0); // Stores the index of the previous peek card
  const [nextPeek, setNextPeek] = useState<number>(0); // Stores the index of the next peek card
  const [slideDirection, setSlideDirection] = useState<"next" | "prev" | null>(
    null
  );
  const previousPeekKey = uuidv4();
  const nextPeekKey = uuidv4();
  const sliderItemWidth = useRef(0);
  const itemsToDisplay: Product[] = categoryToDisplay.products;
  const sliderId = `${categoryToDisplay.name}-slider`; // Used to track each slider for redux state management

  if (!sliderState[sliderId]) {
    dispatch(
      setSliderState({
        sliderId: `${categoryToDisplay.name}-slider`,
        lowestVisibleIndex: 0,
        sliderHasMoved: false,
      })
    );
  }

  if (!itemsToDisplay) return null;

  const { lowestVisibleIndex, sliderHasMoved } = useAppSelector(
    (state: RootState) => state.slider.sliderState[sliderId]
  );

  useLayoutEffect(() => {
    handleWindowResize();

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  // Set the number of items to display based on window size
  useLayoutEffect(() => {
    getSliderIndexGroups();

    sliderItemWidth.current = 100 / itemsPerGroup;
  }, [itemsPerGroup, lowestVisibleIndex]);

  // useEffect(() => {
  //   if (!sliderState[sliderId]) {
  //     dispatch(
  //       setSliderState({
  //         sliderId: `${categoryToDisplay.name}-slider`,
  //         lowestVisibleIndex: 0,
  //         sliderHasMoved: false,
  //       })
  //     );
  //   }
  // }, []);

  // Get the indexes of the previous, visible and next groups
  useEffect(() => {
    if (sliderGlobalState.isSliding) {
      let currentLowestIndex: number;
      let xValue: string;

      if (slideDirection === "next") {
        {
          currentLowestIndex = getPositiveModulo(
            lowestVisibleIndex + scrollAmount
          );
          xValue = `-${100 * scrollAmount}%`;
        }
      } else if (slideDirection === "prev") {
        {
          currentLowestIndex = getPositiveModulo(
            lowestVisibleIndex - scrollAmount
          );
          xValue = `${100 * scrollAmount}%`;
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
        newItemsPerGroup = 7;
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

    setScrollAmount(newItemsPerGroup); // For now the scroll amount matches number of items displayed
    setItemsPerGroup(newItemsPerGroup);
  };

  /* Returns an array of indexes. Starting index is relative to the lowestVisibleIndex and position requested */
  const getSliderIndexGroups = () => {
    // const lowestVisibleIndex = sliderState[sliderId]?.lowestVisibleIndex;
    let currentIndex = lowestVisibleIndex;
    let previous = [];
    let visible = [];
    let next = [];

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

  const getPositiveModulo = (n: number) => {
    const mod =
      ((n % itemsToDisplay.length) + itemsToDisplay.length) %
      itemsToDisplay.length;

    return mod;
  };

  const getMarginPosition = (index: number, arrLength: number) => {
    if (index === 0) {
      return "left";
    } else if (index === arrLength - 1) {
      return "right";
    } else {
      return null;
    }
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

  // Touch Event Handlers
  //-------------------------------------------------------------------------
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number | null>(null);
  const deltaXThreshold = 40;

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const deltaX = touchEndX.current
      ? touchEndX.current - touchStartX.current
      : 0;

    if (deltaX > deltaXThreshold) {
      // Swipe right
      handlePrev();
    } else if (deltaX < -deltaXThreshold) {
      // Swipe left
      handleNext();
    }

    touchStartX.current = 0;
    touchEndX.current = null;
  };
  //-------------------------------------------------------------------------

  return (
    <div id="slider" className="group relative px-[4dvw] overflow-hidden">
      {sliderHasMoved && (
        <SliderControl arrowDirection={"left"} onClick={handlePrev} />
      )}

      <motion.div
        ref={scope}
        className="slider-row relative flex flex-row items-center w-full h-[20dvh]"
        draggable="true"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Previous Group */}
        <section className="absolute right-full flex h-full w-full pointer-events-none">
          <div
            id="groupPeek"
            className="absolute flex h-full w-full"
            style={{right: `${100 / itemsPerGroup}%`}}
          >
            <SliderItem
              key={previousPeekKey}
              partialSliderItemId={previousPeekKey}
              itemToDisplay={itemsToDisplay[previousPeek]}
              sliderItemWidth={sliderItemWidth.current}
            />
          </div>

          {sliderHasMoved &&
            previousGroup.map((item, index) => {
              const key = uuidv4();

              return (
                <SliderItem
                  key={key}
                  partialSliderItemId={`${index}-previous-${categoryToDisplay.name}`}
                  itemToDisplay={itemsToDisplay[item]}
                  sliderItemWidth={sliderItemWidth.current}
                />
              );
            })}
        </section>

        {/* Visible Group */}
        <section className={`absolute flex h-full w-full `}>
          {visibleGroup.map((item, index) => {
            const key = uuidv4();
            const marginPosition = getMarginPosition(
              index,
              visibleGroup.length
            );

            return (
              <SliderItem
                key={key}
                partialSliderItemId={`${index}-visible-${categoryToDisplay.name}`}
                itemToDisplay={itemsToDisplay[item]}
                sliderItemWidth={sliderItemWidth.current}
                marginPosition={marginPosition}
              />
            );
          })}
        </section>

        {/* Next Group */}
        <section className="absolute left-full flex h-full w-full pointer-events-none">
          {nextGroup.map((item, index) => {
            const key = uuidv4();

            return (
              <SliderItem
                key={key}
                partialSliderItemId={`${index}-next-${categoryToDisplay.name}`}
                itemToDisplay={itemsToDisplay[item]}
                sliderItemWidth={sliderItemWidth.current}
              />
            );
          })}

          <div id="groupPeek" className="absolute left-full flex h-full w-full">
            <SliderItem
              key={nextPeekKey}
              partialSliderItemId={nextPeekKey}
              itemToDisplay={itemsToDisplay[nextPeek]}
              sliderItemWidth={sliderItemWidth.current}
            />
          </div>
        </section>
      </motion.div>

      <SliderControl arrowDirection={"right"} onClick={handleNext} />
    </div>
  );
};

export default Slider;

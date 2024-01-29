import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { Product, Category } from "../../utils/customClientTypes";
import { useAnimate } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import SliderItem from "./sliderItem";
import SliderControl from "./sliderControl";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { RootState } from "../../store";
import { setSliderState } from "../../redux/sliderSlice";

interface SliderProps {
  categoryToDisplay: Category;
}

// Try changing lowestvisibleindex to a global state
const Slider = ({ categoryToDisplay }: SliderProps) => {
  const [itemsPerGroup, setItemsPerGroup] = useState(1);
  const [renderSlider, setRenderSlider] = useState(false);
  const [previousGroup, setPreviousGroup] = useState<number[]>([]);
  const [visibleGroup, setVisibleGroup] = useState<number[]>([]);
  const [nextGroup, setNextGroup] = useState<number[]>([]);
  const [previousPeek, setPreviousPeek] = useState<number>(0);
  const [nextPeek, setNextPeek] = useState<number>(0);
  const [isSliding, setIsSliding] = useState(false);
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
  const isSlidingRef = useRef(false);
  const itemsToDisplay = categoryToDisplay.products;
  const sliderId = `${categoryToDisplay.name}-slider`;

  useLayoutEffect(() => {
    getSliderIndexGroups();
    sliderItemWidth.current = 100 / itemsPerGroup;
  }, [itemsPerGroup, sliderState[sliderId]?.lowestVisibleIndex]);

  useLayoutEffect(() => {
    handleWindowResize(window);
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
    setIsSliding(sliderGlobalState.isSliding);
    console.log(sliderGlobalState.isSliding)
    console.log(isSliding)
  }, [sliderGlobalState.isSliding]);

  useEffect(() => {
    setIsSliding(sliderGlobalState.isSliding);
    if (isSliding) {
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
              // setIsSliding(false);
              dispatch(
                setSliderState({
                  sliderId,
                  lowestVisibleIndex: currentLowestIndex,
                  sliderHasMoved: true,
                  globalSettings: { isSliding: false },
                })
              );
            },
          }
        );
      };

      playAnim();
    }
  }, [isSliding]);

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
    if (!isSliding) {
      setSlideDirection("prev");
      // setIsSliding(true);
      dispatch(setSliderState({ globalSettings: { isSliding: true } }));
    }
  };

  const handleNext = async () => {
    if (!isSliding) {
      setSlideDirection("next");
      // setIsSliding(true);
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
          isSliding
            ? "pointer-events-none"
            : "pointer-events-auto"
        }`}
      >
        <section className="absolute right-full flex h-full w-full">
          <div
            id="groupPeek"
            className={`absolute right-full flex justify-end h-full w-full`}
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

        <section className="absolute left-full flex h-full w-full">
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

          <div
            id="groupPeek"
            className="absolute left-full flex justify-start h-full w-full"
          >
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

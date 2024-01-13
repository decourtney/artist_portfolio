import React, { useState, useEffect } from "react";
import SliderControl from "./sliderControl";
import SliderItem from "./sliderItem";
import { Product, Category } from "../../utils/customClientTypes";

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
  const [sliderHasMoved, setSliderHasMoved] = useState(false); // boolean to display prev arrow
  const [sliderMoving, setSliderMoving] = useState(false); // boolean for slider animation
  const [movePercentage, setMovePercentage] = useState(0); // move percentage to shift slider during animation
  const [sliderMoveDirection, setSliderMoveDirection] = useState<String | null>(
    null
  ); // direction of movement of animation
  const [lowestVisibleIndex, setLowestVisibleIndex] = useState(0); // lowest visible index of slider content
  const [itemsInRow, setItemsInRow] = useState(20); // number of items in the slider content changed dynamically on window size

  const totalItems = itemsToDisplay.length;

  console.log("Items To Display", itemsToDisplay);

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
      setItemsInRow(6);
    } else if (window.innerWidth >= 1000) {
      setItemsInRow(5);
    } else if (window.innerWidth < 1000) {
      setItemsInRow(4);
    }
  };

  if (!itemsToDisplay.length) return null;

  const renderSliderContent = () => {
    // gets the indexes to be displayed
    const left = [];
    const mid = [];
    const right = [];

    let visibleIndexCounter = 0;
    for (let i = 0; i < itemsInRow; i++) {
      if (visibleIndexCounter + lowestVisibleIndex >= totalItems) {
        visibleIndexCounter = 0;
      }

      if (sliderHasMoved) {
        // left
        // if (lowestVisibleIndex + i - itemsInRow < 0) {
        //   left.push(totalItems - itemsInRow + lowestVisibleIndex + i);
        // } else {
        //   left.push(i + lowestVisibleIndex - itemsInRow); // issue here
        // }

        left.push(visibleIndexCounter + lowestVisibleIndex - itemsInRow);
      }

      // mid
      // if (i + lowestVisibleIndex >= totalItems) {
      //   mid.push(i + lowestVisibleIndex - totalItems);
      //   console.log("Mid Push Upper:", i + lowestVisibleIndex - totalItems);
      // } else {
      //   mid.push(i + lowestVisibleIndex);
      //   console.log("Mid Push Lower:", i + lowestVisibleIndex);
      // }

      mid.push(visibleIndexCounter + lowestVisibleIndex);

      // right
      // if (i + lowestVisibleIndex + itemsInRow >= totalItems) {
      //   right.push(i + lowestVisibleIndex + itemsInRow - totalItems);
      //   console.log(
      //     "Right Push Upper2:",
      //     i + lowestVisibleIndex + itemsInRow - totalItems
      //   );
      // } else {
      //   right.push(i + lowestVisibleIndex + itemsInRow);
      //   console.log("Right Push Lower:", i + lowestVisibleIndex + itemsInRow);
      // }

      right.push(visibleIndexCounter + lowestVisibleIndex);

      visibleIndexCounter++;
    }

    // combine indexes
    const indexToDisplay = [...left, ...mid, ...right];
    console.log("Index To Display:", indexToDisplay);

    // add on leading and trailing indexes for peek image when sliding
    if (sliderHasMoved) {
      const trailingIndex =
        indexToDisplay[indexToDisplay.length - 1] === totalItems - 1
          ? 0
          : indexToDisplay[indexToDisplay.length - 1] + 1;
      const leadingIndex =
        indexToDisplay[0] === 0 ? totalItems - 1 : indexToDisplay[0] - 1;

      indexToDisplay.unshift(leadingIndex);
      indexToDisplay.push(trailingIndex);
    }

    const sliderContents = [];
    let itemToDisplayCounter = 0;
    for (let index of indexToDisplay) {
      console.log(itemsToDisplay[index]);
      sliderContents.push(
        <SliderItem
          itemToDisplay={itemsToDisplay[index]}
          key={`${itemsToDisplay[index]?.name}-${categoryIndex}-${itemToDisplayCounter}`}
          width={100 / itemsInRow}
        />
      );

      itemToDisplayCounter++;
    }

    // let itemToDisplayCounter = 0;
    // for (let i = 0; i < indexToDisplay.length; i++) {
    //   console.log(itemsToDisplay[i]);
    //   sliderContents.push(
    //     <SliderItem
    //       itemToDisplay={itemsToDisplay[i]}
    //       key={`${itemsToDisplay[i]?.name}-${categoryIndex}-${i}`}
    //       width={100 / itemsInRow}
    //     />
    //   );
    // }

    // adds empty divs to take up appropriate spacing when slider at initial position
    if (!sliderHasMoved) {
      for (let i = 0; i < itemsInRow; i++) {
        sliderContents.unshift(
          <div
            className="slider-item"
            style={{ width: `${100 / itemsInRow}%` }}
            key={i}
          />
        );
      }
    }

    return sliderContents;
  };

  const handlePrev = () => {
    // get the new lowest visible index
    let newIndex: number;
    if (lowestVisibleIndex < itemsInRow && lowestVisibleIndex !== 0) {
      newIndex = 0;
    } else if (lowestVisibleIndex - itemsInRow < 0) {
      newIndex = totalItems - itemsInRow;
    } else {
      newIndex = lowestVisibleIndex - itemsInRow;
    }

    // get the move percentage
    let newMovePercentage;
    if (lowestVisibleIndex === 0) {
      newMovePercentage = 0;
    } else if (lowestVisibleIndex - newIndex < itemsInRow) {
      newMovePercentage =
        ((itemsInRow - (lowestVisibleIndex - newIndex)) / itemsInRow) * 100;
    } else {
      newMovePercentage = 0;
    }

    setSliderMoving(true);
    setSliderMoveDirection("left");
    setMovePercentage(newMovePercentage);

    setTimeout(() => {
      setLowestVisibleIndex(newIndex);
      setSliderMoving(false);
    }, 750);
  };

  const handleNext = () => {
    // get the new lowest visible index
    let newIndex: number;
    if (lowestVisibleIndex === totalItems - itemsInRow) {
      newIndex = 0;
    } else if (lowestVisibleIndex + itemsInRow > totalItems - itemsInRow) {
      newIndex = totalItems - itemsInRow;
    } else {
      newIndex = lowestVisibleIndex + itemsInRow;
    }

    // get the move percentage
    let newMovePercentage;
    if (newIndex !== 0) {
      newMovePercentage = ((newIndex - lowestVisibleIndex) / itemsInRow) * 100;
    } else {
      newMovePercentage = 100;
    }

    setSliderMoving(true);
    setSliderMoveDirection("right");
    setMovePercentage(newMovePercentage);

    setTimeout(() => {
      setLowestVisibleIndex(newIndex);
      setSliderMoving(false);
    }, 750);

    // slider has moved and show the previous arrow
    if (!sliderHasMoved) {
      setSliderHasMoved(true);
    }
  };

  let style = {};
  if (sliderMoving) {
    let translate = "";
    if (sliderMoveDirection === "right") {
      translate = `translateX(-${100 + movePercentage + 100 / itemsInRow}%)`;
    } else if (sliderMoveDirection === "left") {
      translate = `translateX(-${movePercentage + 100 / itemsInRow}%)`;
    }

    style = {
      transform: translate,
      transitionDuration: "750ms",
    };
  } else {
    style = {
      transform: `translateX(-${
        100 + (sliderHasMoved ? 100 / itemsInRow : 0)
      }%)`,
    };
  }

  return (
    <div className="slider">
      {sliderHasMoved && (
        <SliderControl arrowDirection={"left"} onClick={handlePrev} />
      )}
      <div className="slider-content" style={style}>
        {renderSliderContent()}
      </div>
      <SliderControl arrowDirection={"right"} onClick={handleNext} />
    </div>
  );
};

export default Slider;

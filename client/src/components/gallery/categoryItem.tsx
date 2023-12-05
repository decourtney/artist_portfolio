import React, { Dispatch, SetStateAction } from "react";
import { Category, Product } from "../../utils/customClientTypes";
import Slider from "../slider";

interface CategoryItemProps {
  category: Category;
  index: number;
  handleOnClick: (category: Category) => void;
}

const CategoryItem=({category, index, handleOnClick}:CategoryItemProps)=>{
  const isCenterSlides = false;

  return (
    <>
      <div className="block w-full my-[3vw] bg-dark">
        <button
          className="mb-2 mx-[4%]"
          onClick={() => handleOnClick(category)}
        >
          <h2 className="text-light">{category.name}</h2>
        </button>
        <div className="px-[4%]">
          <Slider
            itemsToDisplay={category.products}
            numberToDisplay={2}
            isCenteredSlides={isCenterSlides}
          />
        </div>
      </div>
    </>
  );
}

export default CategoryItem;
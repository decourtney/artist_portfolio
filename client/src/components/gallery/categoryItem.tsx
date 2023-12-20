import React, { Dispatch, SetStateAction } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { Category, Product } from "../../utils/customClientTypes";
import Slider from "../slider";

interface CategoryItemProps {
  category: Category;
  index: number;
}

const CategoryItem = ({
  category,
  index,
}: CategoryItemProps) => {
  const navigate = useNavigate();
  const isCenterSlides = false;
  // console.log(category)

  return (
    <>
      <div className="w-full my-[3vw] bg-dark">
        <button
          type="button"
          className="mb-2 mx-[4%] bg-blue-500"
          onClick={() => {
            navigate(`/gallery/c/${category.name}`);
          }}
        >
          <h2 className="text-light pointer-events-none">{category.name}</h2>
        </button>
        <div className="px-[4%]">
          <Slider
            itemsToDisplay={category.products}
            numberToDisplay={4}
            isCenteredSlides={isCenterSlides}
          />
        </div>
      </div>
    </>
  );
};

export default CategoryItem;

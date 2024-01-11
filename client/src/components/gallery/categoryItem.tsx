import React, { Dispatch, SetStateAction } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setCategoryState } from "../../redux/categorySlice";
import { Category, Product } from "../../utils/customClientTypes";
import Slider from "../slider";

interface CategoryItemProps {
  category: Category;
  index: number;
}

const CategoryItem = ({ category, index }: CategoryItemProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isCenterSlides = false;
  const numberToDisplay = 4;
  const displayDirection = 'horizontal';

  const handleOnClickProduct = (item: Product | Category) => {
    if (item.__typename === "Product") {
      navigate(`/gallery/${item.name}`);
    }
  };

  return (
    <div className="w-full bg-dark">
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
          handleOnClickItem={handleOnClickProduct}
          itemsToDisplay={category.products}
          numberToDisplay={numberToDisplay}
          isCenteredSlides={isCenterSlides}
          displayDirection={displayDirection}
        />
      </div>
    </div>
  );
};

export default CategoryItem;

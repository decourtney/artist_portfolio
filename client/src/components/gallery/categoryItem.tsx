import React, { Dispatch, SetStateAction } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryState } from "../../redux/categorySlice";
import { Category, Product } from "../../utils/customClientTypes";
import Slider from "../slider";

interface CategoryItemProps {
  category: Category;
  handleOnClick: (category: Product | Category) => void;
  index: number;
}

const CategoryItem = ({
  handleOnClick,
  category,
  index,
}: CategoryItemProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isCenterSlides = false;
  const numberToDisplay = 4;

  return (
    <>
      <div className="w-full my-[3vw] bg-dark">
        <button
          type="button"
          className="mb-2 mx-[4%] bg-blue-500"
          onClick={() => {
            // handleOnClick(category);
            dispatch(setCategoryState(category));
            navigate(`/gallery/c/${category.name}`);
          }}
        >
          <h2 className="text-light pointer-events-none">{category.name}</h2>
        </button>
        <div className="px-[4%]">
          <Slider
            handleOnClick={handleOnClick}
            itemsToDisplay={category.products}
            numberToDisplay={numberToDisplay}
            isCenteredSlides={isCenterSlides}
          />
        </div>
      </div>
    </>
  );
};

export default CategoryItem;

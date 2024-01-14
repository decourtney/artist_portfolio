import React, { Dispatch, SetStateAction } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setCategoryState } from "../../redux/categorySlice";
import { Category, Product } from "../../utils/customClientTypes";
import { motion, useScroll } from "framer-motion";
import Slider from "../slider3/slider";

interface CategoryItemProps {
  category: Category;
  index: number;
}

const CategoryItem = ({ category, index }: CategoryItemProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { scrollYProgress, scrollY } = useScroll();
  const isCenterSlides = false;
  const numberToDisplay = 4;
  const displayDirection = "horizontal";

  const handleOnClickProduct = (item: Product | Category) => {
    if (item.__typename === "Product") {
      navigate(`/gallery/${item.name}`);
    }
  };

  return (
    <motion.div
      key={category.name}
      id="category-item"
      className="w-full pt-14 "
    >
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
          categoryIndex={index}
        />
      </div>
    </motion.div>
  );
};

export default CategoryItem;

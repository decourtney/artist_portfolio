import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setCategoryState } from "../../redux/categorySlice";
import { Category, Product } from "../../utils/customClientTypes";
import { motion, useScroll } from "framer-motion";
import Slider from "../slider/slider";

interface CategoryItemProps {
  category: Category;
  index: number;

}

const CategoryItem = ({ category  }: CategoryItemProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleOnClick = () => {
    dispatch(setCategoryState({ data: category as Category }));
    navigate(`/gallery/c/${category.name}`);
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
        onClick={handleOnClick}
      >
        <h2 className="text-light pointer-events-none">{category.name}</h2>
      </button>
      <Slider
        categoryToDisplay={category}
      />
    </motion.div>
  );
};

export default CategoryItem;

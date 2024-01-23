import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import {
  Navigate,
  useParams,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORY, QUERY_USER_CATEGORIES } from "../utils/queries";
import {
  motion,
  useAnimate,
  AnimatePresence,
  usePresence,
} from "framer-motion";
import { useAppSelector, useAppDispatch } from "../redux/hooks";

import { Category, Product } from "../utils/customClientTypes";
import { LoggedInUser } from "../utils/customClientTypes";
import { useInView } from "react-intersection-observer";
import Slider from "../components/slider1/slider";
import ProductModal from "../components/gallery/productModal";
import CategoryModal from "../components/gallery/categoryModal";
import CategoryItem from "../components/gallery/categoryItem";
import { setCategoryState } from "../redux/categorySlice";
import { setProductState } from "../redux/productSlice";
import Hero from "../components/home/hero";

const Gallery = () => {
  const categoryData = useAppSelector<Category | undefined>(
    (state) => state.category.data
  );
  const productData = useAppSelector<Product | undefined>(
    (state) => state.product.data
  );
  const { categoryName, productName } = useParams();
  const { ref, inView, entry } = useInView({ threshold: 0 });
  const location = useLocation();
  const navigate = useNavigate();
  const [isCategoryModal, setIsCategoryModal] = useState(false);
  const [isProductModal, setIsProductModal] = useState(false);
  const dispatch = useAppDispatch();

  const { loading, data } = useQuery(QUERY_USER_CATEGORIES, {
    variables: { username: import.meta.env.VITE_BASE_USER }, // FIXME need to change to a global variable thats set when a user
  });

  let categories: Category[] | null = null;
  if (data) {
    ({ categories } = data.userCategories);
  }

  useLayoutEffect(() => {
    if (data) {
      if (productName) {
        setIsProductModal(true);
        // setIsCategoryModal(false);
      } else if (categoryName) {
        setIsCategoryModal(true);
        // setIsProductModal(false);
      }
    }
  }, [data]);

  if (loading) return null;

  return (
    <>
      {/* <Hero /> */}
      <section id="gallery" className="relative flex flex-col">
        {/* <div className=""> */}
        {categories &&
          categories.length > 0 &&
          categories.map((category: Category, index: number) => {
            if (category.products.length > 0) {
              
              return (
                <CategoryItem
                  key={`${category.name}-${index}`}
                  category={category}
                  index={index}
                />
              );
            }
          })}
        {/* </div> */}

        {isCategoryModal && <CategoryModal />}

        {isProductModal && <ProductModal />}
      </section>
    </>
  );
};

export default Gallery;

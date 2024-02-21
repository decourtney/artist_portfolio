/** TODO
 * Refresh site breaks routes - Route /gallery/:productName will refresh to default gallery page
 * but still be on appropriate route. Moving product to redux state introduced this bug
 * Try using redux-persist
 */

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
import { RootState } from "../store";
import { setCategoryState } from "../redux/categorySlice";
import { setProductState } from "../redux/productSlice";
import { v4 as uuidv4 } from "uuid";
import { Category, Product } from "../utils/customClientTypes";
import { LoggedInUser } from "../utils/customClientTypes";
import { useInView } from "react-intersection-observer";
import CategoryItem from "../components/gallery/categoryItem";
import CategoryModal from "../components/gallery/categoryModal";
import ProductModal from "../components/gallery/productModal";
import MiniModal from "../components/gallery/miniModal";
import Hero from "../components/home/hero";

const Gallery = () => {
  const { showMiniModal } = useAppSelector(
    (state: RootState) => state.miniModal.miniModalState
  );
  const { showProductModal } = useAppSelector(
    (state) => state.product.productState
  );
  const { categoryName, productName } = useParams();
  const { ref, inView, entry } = useInView({ threshold: 0 });
  const location = useLocation();
  const navigate = useNavigate();
  const [isCategoryModal, setIsCategoryModal] = useState(false);
  const [isProductModal, setIsProductModal] = useState(false);
  const [isMiniModal, setIsMiniModal] = useState(false);
  const dispatch = useAppDispatch();

  const { loading, data } = useQuery(QUERY_USER_CATEGORIES, {
    variables: { username: import.meta.env.VITE_BASE_USER }, // FIXME need to change to a global variable thats set when a user
  });

  let categories: Category[] | null = null;
  if (data) {
    ({ categories } = data.userCategories);
  }
  console.log(categories)

  // TODO Change this over to using global redux state similar to miniModal
  // useEffect(() => {
  //   if (data) {
  //     if (productName) {
  //       setIsProductModal(true);
  //       // setIsCategoryModal(false);
  //     } else if (categoryName) {
  //       setIsCategoryModal(true);
  //       // setIsProductModal(false);
  //     }
  //   }
  // }, [data]);

  // TODO Currently this uselayouteffect doesnt seem to be necessary if not using the commented out miniModal render
  // TODO Continue monitoring for unintended effects
  // useLayoutEffect(() => {
  //   setIsMiniModal(miniModalState.showMiniModal);
  // }, [miniModalState.showMiniModal]);

  if (loading) return null;

  return (
    <>
      <section id="gallery" className="relative flex flex-col h-full min-h-screen">
        {categories &&
          categories.length > 0 &&
          categories.map((category: Category, index: number) => {
            if (category.products.length > 0) {
              return (
                <CategoryItem
                  key={uuidv4()}
                  category={category}
                  index={index}
                />
              );
            }
          })}

        {isCategoryModal && <CategoryModal />}
        {showProductModal && <ProductModal />}
        {showMiniModal && <MiniModal />}
      </section>
    </>
  );
};

export default Gallery;

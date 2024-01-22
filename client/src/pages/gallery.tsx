import React, { useEffect, useState, useRef } from "react";
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

  // Handles displaying and dispatching data for Modals
  // useEffect(() => {
  //   if (data) {
  //     if (productName) {
  //       const findProductForModal = async () => {
  //         try {
  //           const category = categoryData
  //             ? categories?.find((c) => {
  //                 return c.name === categoryData?.name;
  //               })
  //             : // Catch all for page refresh
  //               categories?.find((c) => {
  //                 return c.defaultCategory === true;
  //               });

  //           const productForModal = category?.products.find(
  //             (p) => p.name === productName
  //           );

  //           dispatch(setProductState(productForModal));
  //           setIsProductModal(true);
  //           setIsCategoryModal(false);
  //           // console.log("productformodal:", productForModal);
  //         } catch (err) {
  //           console.log(err);
  //         }
  //       };

  //       findProductForModal();
  //     } else if (categoryName) {
  //       const findCategoryForModal = async () => {
  //         try {
  //           const categoryForModal = categories?.find(
  //             (category: Category) => category.name === categoryName
  //           );

  //           dispatch(setCategoryState(categoryForModal));
  //           setIsCategoryModal(true);
  //           setIsProductModal(false);
  //           // console.log("categoryformodal:", categoryForModal);
  //         } catch (err) {
  //           console.log(err);
  //         }
  //       };

  //       findCategoryForModal();
  //     }
  //   }
  // }, [data]);

  useEffect(() => {
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

        {isCategoryModal ? <CategoryModal /> : null}

        {isProductModal ? <ProductModal /> : null}
      </section>
    </>
  );
};

export default Gallery;

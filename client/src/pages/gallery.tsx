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
import Slider from "../components/slider";
import ProductModal from "../components/gallery/productModal";
import CategoryModal from "../components/gallery/categoryModal";
import CategoryItem from "../components/gallery/categoryItem";

const Gallery = () => {
  const categoryData = useAppSelector((state) => state.category.data);
  const productData = useAppSelector((state) => state.product.data);
  const { categoryName, productName } = useParams();
  const { ref, inView, entry } = useInView({ threshold: 0 });
  const location = useLocation();
  const navigate = useNavigate();
  const [isCategoryModal, setIsCategoryModal] = useState(false);
  const [isProductModal, setIsProductModal] = useState(false);

  const { loading, data } = useQuery(QUERY_USER_CATEGORIES, {
    variables: { username: import.meta.env.VITE_BASE_USER }, // FIXME need to change to a global variable thats set when a user
  });

  // let categories: any = [];
  let categories: Category[] | null = null;
  if (data) {
    ({ categories } = data.userCategories);
  }
  // console.log(data)

  // Make adjustments so that all cats and prods are sent to the modals
  // Enabling scrolling through the rest of the cats or prods in the modal display
  // useEffect(() => {
  //   if (categoryName) {
  //     const categoryForModal = categories?.find(
  //       (category: Category) => category.name === categoryName
  //     );

  //     setModalData(categoryForModal);
  //     setIsCategoryModal(true);
  // }
  // if (productName) {
  // const productForModal = categories?.find((category: Category) => {
  //   return category.products.find((product: Product) => {
  //     return product.name === productName;
  //   });
  // });

  //     let productForModal = undefined;
  //     categories?.some((category) => {
  //       const product = category.products.find((p) => p.name === productName);
  //       if (product) {
  //         productForModal = product;
  //         return true; // to break out of the 'some' loop once a product is found
  //       }
  //       return false;
  //     });

  //     console.log(productForModal);
  //     setModalData(productForModal);
  //     setIsProductModal(true);
  //   }
  // }, [categoryName, productName]);

  useEffect(() => {
    if (productData) {
      console.log("Product:", productData);
      setIsProductModal(true);
    }
    if (categoryData) {
      console.log("Category:", categoryData);
    }
  }, []);

  if (loading) return <></>;

  console.log(productData)
  return (
    <section className="flex flex-col   min-h-screen">
      <div className="">
        {categories &&
          categories.length > 0 &&
          categories.map((category: Category, index: number) => (
            <CategoryItem key={index} category={category} index={index} />
          ))}
      </div>

      {categoryData ? <CategoryModal /> : null}

      {isProductModal ? <ProductModal /> : null}
    </section>
  );
};

export default Gallery;

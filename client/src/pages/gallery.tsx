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
import { Category, Product } from "../utils/customClientTypes";
import { LoggedInUser } from "../utils/customClientTypes";
import { useInView } from "react-intersection-observer";
import Slider from "../components/slider";
import ProductModal from "../components/gallery/productModal";
import GalleryModal from "../components/gallery/categoryModal";
import CategoryItem from "../components/gallery/categoryItem";

const Gallery = () => {
  const { categoryName, productName } = useParams();
  const { ref, inView, entry } = useInView({ threshold: 0 });
  const location = useLocation();
  const navigate = useNavigate();
  const [isCategoryModal, setIsCategoryModal] = useState(false);
  const [isProductModal, setIsProductModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const modalContent = useRef<Category | null>(null);

  const { loading, data } = useQuery(QUERY_USER_CATEGORIES, {
    variables: { username: import.meta.env.VITE_BASE_USER }, // FIXME need to change to a global variable thats set when a user
  });

  useEffect(() => {
    if (categoryName) {
      setIsCategoryModal(true);
    } else if (productName) {
      setIsProductModal(true);
    }
  }, [categoryName, productName]);

  if (loading) return <></>;
  const { categories } = data.userCategories;
  console.log(categories);

  const handleCloseModal = () => {
    navigate(-1)
  };

  return (
    <section
      className="flex flex-col   min-h-screen"
    >
      <div className="">
        {categories.length > 0 &&
          categories.map((category: Category, index: number) => (
            <CategoryItem
              key={index}
              category={category}
              index={index}
            />
          ))}
      </div>

      {isCategoryModal ? (
        <GalleryModal data={modalData} close={handleCloseModal} />
      ) : null}

      {isProductModal ? (
        <ProductModal data={modalData} close={handleCloseModal} />
      ) : null}
    </section>
  );
};

export default Gallery;

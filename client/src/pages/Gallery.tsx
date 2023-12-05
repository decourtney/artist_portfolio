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
import GalleryModal from "../components/gallery/modal";
import CategoryItem from "../components/gallery/categoryItem";

const Gallery = () => {
  const { categoryName, collectionName } = useParams();
  const { ref, inView, entry } = useInView({ threshold: 0 });
  const location = useLocation();
  const navigate = useNavigate;
  const [isDisplayModal, setIsDisplayModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const modalContent = useRef<Category | null>(null);

  useEffect(() => {}, [categoryName, collectionName]);

  const { loading, data } = useQuery(QUERY_USER_CATEGORIES, {
    variables: { username: "donovancourtney" },
  });

  if (loading) return <></>;
  const { categories } = data.userCategories;
  console.log(categories);

  const handleOpenModal = (category: Category) => {
    setIsDisplayModal(true);
  };

  const handleCloseModal = () => {
    setIsDisplayModal(false);
  };

  return (
    <motion.section
      // initial={{ y: "100%",  }}
      // animate={{ y: "0%", transition: { duration: .5 } }}
      exit={{ opacity: 0 }}
      className="flex flex-col   min-h-screen"
    >
      <div className="">
        {categories.map((category: Category, index: number) => (
          <CategoryItem
            key={index}
            category={category}
            index={index}
            handleOnClick={handleOpenModal}
          />
        ))}
      </div>

      {isDisplayModal ? (
        <GalleryModal data={modalData} close={handleCloseModal} />
      ) : null}
    </motion.section>
  );
};

export default Gallery;

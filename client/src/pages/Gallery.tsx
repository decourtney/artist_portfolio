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
import { Category } from "../utils/customClientTypes";
import { LoggedInUser } from "../utils/customClientTypes";
import { Element } from "react-scroll";
import { useInView } from "react-intersection-observer";
import Slider from "../components/Slider";

const Gallery = () => {
  const { categoryName, collectionName } = useParams();
  const { ref, inView, entry } = useInView({ threshold: 0 });
  const location = useLocation();
  const navigate = useNavigate;
  const [isDisplayModal, setIsDisplayModal] = useState(false);
  const modalContent = useRef<Category | null>(null);

  useEffect(() => {
    if (inView) {
      // window.history.replaceState(null, "", "/gallery");
      window.location.hash = "gallery";
    }
  }, [inView]);

  const { loading, data } = useQuery(QUERY_USER_CATEGORIES, {
    variables: { username: "donovancourtney" },
  });

  if (loading) return <></>;
  const { categories } = data.userCategories;
  console.log(categories);

  const handleOpenModal = (category: Category) => {
    modalContent.current = category;
    console.log(modalContent.current);
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
      className="flex flex-col justify-center items-center min-h-screen"
    >
      {categories.map((category: Category, index: number) => (
        <div
          key={index}
          className="box-border my-[3vw] bg-dark"
          onClick={() => handleOpenModal(category)}
        >
          <button type="button">
            <h2 className="text-light">{category.name}</h2>
          </button>
          {/* <Slider /> */}
        </div>
      ))}



      {isDisplayModal ? (
        <>
          <div className="fixed inset-0 z-50 outline-none focus:outline-none pointer-events-none">
            <div className="relative w-[80vw] mt-6 mx-auto h-full">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full h-full bg-secondary outline-none focus:outline-none pointer-events-auto">
                {/*header*/}
                <div className="flex justify-center items-center h-32 rounded-t text-light text-2xl">
                  <h3 className="font-semibold">Modal Title</h3>
                </div>

                {/*body*/}
                <div className="relative px-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    I always felt like I could do anything. That’s the main
                    thing people are controlled by! Thoughts- their perception
                    of themselves! They're slowed down by their perception of
                    themselves. If you're taught you can’t do anything, you
                    won’t do anything. I was taught I could do everything.
                  </p>
                </div>
                {/* close button */}
                <button
                  className="absolute top-5 right-5 bg-transparent border-0 outline-none focus:outline-none"
                  onClick={handleCloseModal}
                >
                  <span className="material-symbols-rounded bg-transparent text-2xl outline-none focus:outline-none text-light">
                    close
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div
            className="opacity-50 fixed inset-0 z-40 bg-black"
            onClick={handleCloseModal}
          ></div>
        </>
      ) : null}
    </motion.section>
  );
};

export default Gallery;

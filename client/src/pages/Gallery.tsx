import React, { useEffect } from "react";
import {
  Navigate,
  useParams,
  useNavigate,
  useLocation,
  Link
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
  const navigate = useNavigate

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

  return (
    <motion.section
      // initial={{ y: "100%",  }}
      // animate={{ y: "0%", transition: { duration: .5 } }}
      exit={{ opacity: 0 }}
      className="flex flex-col justify-center items-center w-full h-screen "
    >
      <div className="flex justify-center items-center">
        <p className="text-lg font-black">Gallery</p>
      </div>

      {categories.map((category: Category, index: number) => (
        <div key={index} className="relative box-border my-[3vw] bg-dark" onClick={}>
          <button type="button">
            <h2 className="text-light">{category.name}</h2>
          </button>
          {/* <Slider /> */}
        </div>
      ))}
    </motion.section>
  );
};

export default Gallery;

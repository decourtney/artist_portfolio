import React, { useEffect } from "react";
import { Navigate, useParams, useNavigate, useLocation } from "react-router-dom";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORY, QUERY_USER_CATEGORIES } from "../utils/queries";
import {
  motion,
  useAnimate,
  AnimatePresence,
  usePresence,
} from "framer-motion";
import { LoggedInUser } from "../utils/customClientTypes";
import { Element } from "react-scroll";
import { useInView } from "react-intersection-observer";

const Gallery = () => {
  const { categoryName, collectionName } = useParams();
  const { ref, inView, entry } = useInView({ threshold: 0 });
  const location = useLocation();

  useEffect(() => {
    if (inView) {
      // window.history.replaceState(null, "", "/gallery");
      window.location.hash = "gallery"
    }
  }, [inView]);

  const { loading, data } = useQuery(QUERY_USER_CATEGORIES, {
    variables: { username: "donovancourtney" },
  });

  if (loading) return <></>;
  const categories = data;

  console.log(categories);

  return (
    <section
      ref={ref}
      className="flex flex-col justify-center items-center w-full h-screen bg-dark"
    >
      <div className="flex justify-center items-center">
        <p className="text-lg font-black">Gallery</p>
      </div>

      {categoryName && <div className="w-36 h-36 bg-orange-500"></div>}
      {collectionName && <div className="w-36 h-36 bg-blue-500"></div>}
    </section>
  );
};

export default Gallery;

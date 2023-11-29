import React, { useEffect, useRef } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORY, QUERY_CATEGORIES } from "../utils/queries";
import { CategoryItem } from "../utils/customClientTypes";
import Slider from "../components/slider";

import Auth from "../utils/auth";
import {
  motion,
  useAnimate,
  AnimatePresence,
  usePresence,
} from "framer-motion";
import { LoggedInUser } from "../utils/customClientTypes";

import mountains from "../images/mountains.jpg";

const Home = () => {
  const displayed = 2;

  const { loading, data } = useQuery(QUERY_CATEGORIES, {
    variables: { username: "donovancourtney" },
  });

  if (loading) return <></>;
  const categories = data;

  console.log(categories);
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-secondary"
    >
      <div className="flex flex-col justify-center">
        <div className="w-full">
          <img src={mountains} className="w-full" />
        </div>

        {/* {categories.map((category) => (
          <div>
            <h3>{category.name}</h3>
            <div>
              <Slider
                itemsToDisplay={category.products}
                numberToDisplay={displayed}
              />
            </div>
          </div>
        ))} */}
      </div>
    </motion.section>
  );
};

export default Home;

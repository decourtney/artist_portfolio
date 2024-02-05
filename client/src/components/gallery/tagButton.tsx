import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import {
  Navigate,
  useParams,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import Auth from "../../utils/auth";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER_PRODUCT } from "../../utils/queries";
import { UPDATE_PRODUCT } from "../../utils/mutations";
import { Category, Product } from "../../utils/customClientTypes";
import { v4 as uuidv4 } from "uuid";

interface Props {
  category: Category;
  onClick: (categoryName: String) => void;
}

const TagButton = ({ category, onClick }: Props) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleCategoryButtonClick = (event: React.MouseEvent) => {
    const el = event.currentTarget;

    setIsToggled(!isToggled);
    onClick(el.id)
  };

  return (
    <>
      <motion.button
        key={uuidv4()}
        id={`${category.name}`}
        name="name"
        className={`test-button-shadow w-fit px-2 rounded-full text-secondary bg-light ${
          isToggled
            ? "active-category-button"
            : "shadow-[inset_2px_2px_2px_0px_rgba(255,255,255,0.7),inset_-2px_-2px_2px_0px_rgba(0,0,0,0.7)]"
        }`}
        onClick={handleCategoryButtonClick}
      >
        <div className="pointer-events-none">
          <span className={`text-xl font-medium align-middle `}>
            {category.name}{" "}
          </span>
          {category.defaultCategory && (
            <span className="material-symbols-rounded bg-transparent text-lg align-middle outline-none focus:outline-none">
              close
            </span>
          )}
        </div>
      </motion.button>
    </>
  );
};
export default TagButton;

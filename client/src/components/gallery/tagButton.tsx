import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import {
  Navigate,
  useParams,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import Auth from "../../utils/auth";
import { motion, useAnimate } from "framer-motion";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER_PRODUCT } from "../../utils/queries";
import { UPDATE_PRODUCT } from "../../utils/mutations";
import { Category, Product } from "../../utils/customClientTypes";
import { v4 as uuidv4 } from "uuid";

interface Props {
  category: Category;
  onClick: (category: Category) => void;
  isToggled: boolean;
}

const TagButton = ({ category, onClick, isToggled }: Props) => {
  const [scope, animate] = useAnimate();

  const handleCategoryButtonClick = (event: React.MouseEvent) => {
    const el = event.currentTarget;

    // setIsToggled(!isToggled);
    // onClick(el.id);
  };

  // useEffect(() => {
  //   if (isToggled) {
  //     animate(scope.current, {
  //       backgroundColor: "rgba(147 177 166 0.5)",
  //       boxShadow:
  //         "inset 1px 2px 4px rgba(0, 0, 0, 0.5), 1px 2px 5px 1px rgb(74, 222, 128)",
  //       color: "rgb(255, 255, 255)",
  //       textShadow: "0 0 5px #fff, 0 0 10px #fff, 0 0 20px #0fa, 0 0 30px #0fa",
  //     });
  //   } else {
  //     animate(scope.current, {
  //       backgroundColor: "rgb(147 177 166)",
  //       boxShadow:
  //         "inset 2px 2px 2px 0px rgba(255, 255, 255, 0.7), inset -2px -2px 2px 0px rgba(0,0,0,0.7)",
  //       color: "rgb(24 61 61)",
  //     });
  //   }
  // }, [isToggled]);

  // TODO Change the toggle transition to a framer motion animation
  return (
    <>
      <motion.button
        ref={scope}
        key={uuidv4()}
        id={`${category.name}`}
        className={`w-fit px-2 pb-1 mb-3 mx-2 rounded-full ${
          isToggled
            ? "bg-slate-800 bg-opacity-50 text-light shadow-[1px_1px_5px_rgba(0,0,0,0.7),2px_2px_2px_0px]"
            : "bg-light text-secondary shadow-[inset_2px_2px_2px_0px_rgba(255,255,255,0.7),inset_-2px_-2px_2px_0px_rgba(0,0,0,0.7)]"
        }`}
        type="button"
        tabIndex={0}
        aria-pressed="false"
        onClick={() => onClick(category)}
      >
        <div className="pointer-events-none">
          <span className={`text-xl font-medium  `}>{category.name} </span>
        </div>
      </motion.button>
    </>
  );
};
export default TagButton;

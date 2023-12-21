import React, { useEffect, useRef, lazy } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import {
  motion,
  useAnimate,
  AnimatePresence,
  usePresence,
} from "framer-motion";
import { Element } from "react-scroll";
import { useInView } from "react-intersection-observer";

import mountains from "../../images/mountains.jpg";

const Hero = () => {
  const { ref, inView, entry } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView) {
      // window.history.replaceState(null, "", "/");
      window.location.hash = "";
    }
  }, [inView]);

  return (
    <>
      <section
        ref={ref}
        id="/"
        className="flex flex-col justify-center h-screen"
      >
        <div className="w-full">
          <img src={mountains} className="w-full" />
        </div>
      </section>
    </>
  );
};

export default Hero;

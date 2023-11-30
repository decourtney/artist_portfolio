import React, { useEffect, useRef, lazy } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { CategoryItem } from "../utils/customClientTypes";
import Gallery from "./Gallery";
import Hero from "../components/home/Hero";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Auth from "../utils/auth";
import {
  motion,
  useAnimate,
  AnimatePresence,
  usePresence,
} from "framer-motion";
import { LoggedInUser } from "../utils/customClientTypes";
import { Element } from "react-scroll";
import { useInView } from "react-intersection-observer";

import mountains from "../images/mountains.jpg";

const Home = () => {
  return (
    <>
      <section className=" bg-secondary">
        <Element id="/">
          <Hero />
        </Element>

        <Element id="gallery">
          <Gallery />
        </Element>

        <Element id="about">
          <About />
        </Element>

        <Element id="contact">
          <Contact />
        </Element>
      </section>
    </>
  );
};

export default Home;

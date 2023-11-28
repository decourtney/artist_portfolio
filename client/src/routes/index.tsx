import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";

import About from "../pages/About";
import Contact from "../pages/Contact";
import Gallery from "../pages/Gallery";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Header from "../components/header";
import Footer from "../components/footer";
import { AnimatePresence, LayoutGroup } from "framer-motion";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          {/* <Route path="/" element={<Profile />} />{" "} */}
          {/* This is just for initial development stages. delete when necessary */}
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:collection" element={<></>} />
          <Route path="/gallery/:category" element={<></>} />
          <Route path="/gallery/:category/:collection" element={<></>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/profile/:username/:content" element={<Profile />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
};

export default AnimatedRoutes;

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

import About from "../pages/about";
import EditProduct from "../components/gallery/editProduct";
import Gallery from "../pages/gallery";
import Home from "../pages/home";
import Login from "../pages/login";
import Profile from "../pages/profile";
import Header from "../components/header";
import Footer from "../components/footer";
import { AnimatePresence } from "framer-motion";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* <Route path="/" element={<EditProduct />} /> */}
          {/* This is just for initial development stages. delete when necessary */}
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:productName" element={<Gallery />} />
          <Route path="/gallery/c/:categoryName" element={<Gallery />} />
          <Route
            path="/gallery/c/:categoryName/:productName"
            element={<Gallery />}
          />
          <Route path="/about" element={<About />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/profile/:username/:content" element={<Profile />} />
        </Routes>
      </AnimatePresence>
      {/* FOOTER will need to be imported components on individual pages - not wanted on home page */}
      <Footer />
    </>
  );
};

export default AnimatedRoutes;

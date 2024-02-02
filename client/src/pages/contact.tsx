import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import {
  Navigate,
  useParams,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_USER_PRODUCT } from "../utils/queries";
import { Category, Product } from "../utils/customClientTypes";

const baseCDN =
  import.meta.env.VITE_BASE_CDN ||
  "https://chumbucket.donovancourtney.dev/artist_portfolio";

interface ContactProps {
  itemToEdit: Category | Product;
}

const tempData:Product = {
  __typename: "typename",
  name: "Flag-of-the-USA - Copy",
  image: "Flag-of-the-USA - Copy.jpg",
  description: "Empty String",
  categories: [],
};

const Contact = ({ itemToEdit=tempData }: ContactProps) => {
  let { username: userParam } = useParams();
  if (!userParam) userParam = import.meta.env.VITE_BASE_USER;

  const { loading, data } = useQuery(QUERY_USER_PRODUCT, {
    variables: {
      username: import.meta.env.VITE_BASE_USER,
      product: itemToEdit.name,
    }, // FIXME need to change to a global variable thats set when a user
  });

  console.log(data);

  let userProduct: Product | null = null;
  if (data) {
    userProduct = data
  }

  if (loading) return null;

  return (
    <>
      <section className="flex flex-col justify-start items-center min-h-screen pt-24 mx-2 bg-secondary">
        <div className="">
          <img
            src={`${baseCDN}/${userParam}/${itemToEdit.image}`}
            className="w-full h-full shadow-lg object-cover rounded-sm"
            style={{ imageRendering: "auto" }}
            alt={`${itemToEdit.name}`}
            loading="lazy"
          />
        </div>
        <div className="flex w-full h-full bg-blue-500">Stuff</div>
      </section>
    </>
  );
};

export default Contact;

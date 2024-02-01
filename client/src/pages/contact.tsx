import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Category, Product } from "../../utils/customClientTypes";

const baseCDN =
  import.meta.env.VITE_BASE_CDN ||
  "https://chumbucket.donovancourtney.dev/artist_portfolio";

const tempProduct: Product ={
  __typename: '',
  name: 'Flag-of-the-USA - Copy',
  description: '',
  image: 'Flag-of-the-USA - Copy.jpg',
  categories: ['All Artwork'],
}

const Contact = () => {
  let { username: userParam } = useParams();
  if (!userParam) userParam = import.meta.env.VITE_BASE_USER;


  return (
    <>
      <section
        className="flex flex-col justify-start items-center  min-h-screen pt-24 mx-2 bg-secondary"
      >
        <div className="">
          <img
            src={`${baseCDN}/${userParam}/${tempProduct.image}`}
            className="w-full h-full shadow-lg object-cover rounded-sm"
            style={{ imageRendering: "auto" }}
            alt={`${tempProduct.name}`}
            loading="lazy"
          />
        
        </div>
        <div className="flex w-full h-full bg-blue-500">Stuff</div>
      </section>
    </>
  );
};

export default Contact;

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

const tempData: Product = {
  __typename: "typename",
  name: "Flag-of-the-USA - Copy",
  image: "Flag-of-the-USA - Copy.jpg",
  description: "Empty String",
  categories: [],
};

const Contact = ({ itemToEdit = tempData }: ContactProps) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  let { username: userParam } = useParams();
  if (!userParam) userParam = import.meta.env.VITE_BASE_USER;

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => { console.log('form changed') }
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => { console.log('form submitted') }

  // const { loading, data } = useQuery(QUERY_USER_PRODUCT, {
  //   variables: {
  //     username: import.meta.env.VITE_BASE_USER,
  //     product: itemToEdit.name,
  //   },
  // });

  // let userProduct: Product | null = null;
  // if (data) {
  //   userProduct = data.userProduct[0];
  // }

  // if (loading) return null;

  return (
    <>
      <section className="flex flex-col justify-start items-center min-h-screen pt-24 mx-2 bg-secondary">
        <div className="">
          {itemToEdit && <img
            src={`${baseCDN}/${userParam}/${itemToEdit.image}`}
            className="w-full h-full shadow-lg object-cover rounded-sm"
            style={{ imageRendering: "auto" }}
            alt={`${itemToEdit.name}`}
            loading="lazy"
          />}
        </div>

        <div className="flex w-full h-full ">
          <section className="flex flex-col flex-grow w-full rounded-2xl font-medium text-plight">
            <form
              id="edit-profile-form"
              ref={formRef}
              className="relative flex flex-col flex-grow justify-between items-center px-2 py-4"
              onSubmit={handleFormSubmit}
            >
              <div className="w-full space-y-4 my-4 px-4 text-lg">
                <div className="flex flex-col w-full">
                  {/* <span className="material-symbols-rounded text-sm">person</span> */}
                  <input
                    id="name"
                    name="name"
                    className="w-1/2 p-1 pl-4 text-lg bg-transparent"
                    placeholder={itemToEdit.name}
                    onChange={handleFormChange}
                  />
                </div>

                <div className="flex flex-col w-full">
                  <span className="material-symbols-rounded text-sm">email</span>
                  <input
                    id="description"
                    name="description"
                    className="w-full p-1 pl-4 text-lg bg-transparent border-b-2 border-psecondary"
                    placeholder={itemToEdit.description}
                    onChange={handleFormChange}
                  />
                </div>             
              </div>
              <div className="flex justify-center w-full">
                <button
                  className=" py-1 px-4 rounded-l-full rounded-r-full text-md text-plight font-bold bg-green-500 shadow-[0px_0px_2px_#5B8FB9]"
                  type="submit"
                >
                  SAVE
                </button>
              </div>
            </form>
          </section>
        </div>
      </section>
    </>
  );
};

export default Contact;

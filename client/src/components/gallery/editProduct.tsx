import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import {
  Navigate,
  useParams,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import Auth from "../../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER_PRODUCT } from "../../utils/queries";
import { UPDATE_PRODUCT } from "../../utils/mutations";
import { Category, Product } from "../../utils/customClientTypes";
import { v4 as uuidv4 } from "uuid";
import TagButton from "./tagButton";

const baseCDN =
  import.meta.env.VITE_BASE_CDN ||
  "https://chumbucket.donovancourtney.dev/artist_portfolio";

interface EditProductProps {
  itemToEdit: Product;
}

const tempData: Product = {
  __typename: "typename",
  name: "Flag-of-the-USA - Copy",
  image: "Flag-of-the-USA - Copy.jpg",
  description: "Empty Description",
  categories: [],
};

const EditProduct = ({ itemToEdit = tempData }: EditProductProps) => {
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    categories: [""],
  });
  const [categoryList, setCategoryList] = useState<[String]>([""]);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const formRef = useRef<HTMLFormElement | null>(null);
  let { username: userParam } = useParams();
  if (!userParam) userParam = import.meta.env.VITE_BASE_USER;

  const { loading, data } = useQuery(QUERY_USER_PRODUCT, {
    variables: {
      username: import.meta.env.VITE_BASE_USER,
      product: itemToEdit.name,
    },
  });

  let userProduct: Product | null = null;
  let productCategories: Category[] | null = null;
  if (data) {
    userProduct = data.userProduct[0];
    if (userProduct) productCategories = userProduct?.categories as Category[];

    // console.log(userProduct);
  }

  const handleFormChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleCategoryChange = (categoryName: String) => {
    console.log(categoryName);
    if(categoryList.includes(categoryName)){
      // FIXME finish adding categories to the formstate
    }
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // First verify at least one field has a value
    if (
      Object.values(formState).some(
        (value) => value !== "" || null || undefined
      )
    ) {
      try {
        await updateProduct({ variables: formState });
      } catch (err) {
        console.log({ err });
      }
    }

    setFormState({ name: "", description: "", categories: [""] });
  };

  if (loading) return null;

  return (
    <>
      <section className="flex flex-col justify-start items-center min-h-screen pt-24 mx-2 bg-secondary">
        <div className="">
          {userProduct && (
            <img
              src={`${baseCDN}/${userParam}/${userProduct.image}`}
              className="w-full h-full shadow-lg object-cover rounded-sm"
              style={{ imageRendering: "auto" }}
              alt={`${userProduct.name}`}
              loading="lazy"
            />
          )}
        </div>

        <section className="flex flex-col flex-grow w-full my-2 text-plight rounded-2xl bg-dark">
          <form
            id="edit-product-form"
            ref={formRef}
            className="flex flex-col flex-grow justify-between w-full h-full p-2"
            onSubmit={handleFormSubmit}
          >
            <div className="flex flex-col space-y-2">
              <div className="">
                <textarea
                  id="product-name"
                  name="name"
                  className="w-full h-10 px-1 text-3xl font-bold rounded-md bg-light bg-opacity-50"
                  placeholder={userProduct?.name}
                  onChange={handleFormChange}
                />
              </div>

              <div className="w-full">
                <textarea
                  id="product-description"
                  name="description"
                  className="w-full h-10 px-1 text-lg font-medium rounded-md bg-light bg-opacity-50"
                  placeholder={userProduct?.description}
                  onChange={handleFormChange}
                />
              </div>

              <div>
                {productCategories &&
                  productCategories.length > 0 &&
                  productCategories.map((category: Category, index: number) => {
                    return (
                      <TagButton
                        category={category}
                        onClick={handleCategoryChange}
                      />
                    );
                  })}
              </div>
            </div>

            <div className="flex justify-center w-full">
              <button
                className="w-full py-2 px-4 rounded-l-full rounded-r-full text-md text-plight font-bold bg-green-500 shadow-[0px_0px_2px_#5B8FB9]"
                type="submit"
              >
                SAVE
              </button>
            </div>
          </form>
        </section>
      </section>
    </>
  );
};

export default EditProduct;

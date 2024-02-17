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
import { QUERY_USER_PRODUCT, QUERY_USER_CATEGORIES } from "../../utils/queries";
import { UPDATE_PRODUCT } from "../../utils/mutations";
import { Category, Product } from "../../utils/customClientTypes";
import { v4 as uuidv4 } from "uuid";
import TagButton from "./tagButton";
import data from "@iconify/icons-mdi/chevron-left";

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
  const [userProduct, setUserProduct] = useState<Product | null>(null);
  const [userCategories, setUserCategories] = useState<Category[] | null>(null);
  // const [categoryList, setCategoryList] = useState<string[]>([""]);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const formRef = useRef<HTMLFormElement | null>(null);
  const selectedCategories = useRef<string[]>([]);
  let { username: userParam } = useParams();
  if (!userParam) userParam = import.meta.env.VITE_BASE_USER;

  const {
    loading: loadingProduct,
    data: dataProduct,
    error: errorProduct,
  } = useQuery(QUERY_USER_PRODUCT, {
    variables: {
      username: import.meta.env.VITE_BASE_USER,
      product: itemToEdit.name,
    },
    onCompleted: (data) => {
      setUserProduct(data?.userProduct[0]);
      selectedCategories.current = data.userProduct[0].categories.map(
        (category: Category) => {
          return category.name;
        }
      );
    },
  });

  const {
    loading: loadingCategoies,
    data: dataCategories,
    error: errorCategories,
  } = useQuery(QUERY_USER_CATEGORIES, {
    variables: {
      username: import.meta.env.VITE_BASE_USER,
    },
    onCompleted: (data) => {
      setUserCategories(data?.userCategories.categories);
    },
  });

  // Error handling
  if (errorProduct) {
    // do stuff
  }
  if (errorCategories) {
    // do stuff
  }

  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log("form changed");
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Update list of selected categories
  const handleCategoryChange = (categoryName: string) => {
    console.log(categoryName);
    if (categoryName !== "All Artwork") {
      if (!isCategorySelected(categoryName)) {
        selectedCategories.current = [
          ...selectedCategories.current,
          categoryName,
        ];
      } else {
        selectedCategories.current = selectedCategories.current.filter(
          (category) => category !== categoryName
        );
      }
    }

    setFormState({
      ...formState,
      categories: selectedCategories.current,
    });
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
        console.log(formState);
        await updateProduct({ variables: formState });
      } catch (err) {
        console.log({ err });
      }
    }

    setFormState({ name: "", description: "", categories: [""] });
  };

  const isCategorySelected = (name: string) => {
    return selectedCategories.current.includes(name);
  };

  if (loadingProduct) return null;

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

        <section className="flex flex-col flex-grow w-full my-2 text-plight rounded-t-3xl bg-dark">
          <form
            id="edit-product-form"
            ref={formRef}
            className="flex flex-col w-full h-full p-2 space-y-3"
            onSubmit={handleFormSubmit}
          >
            <div className="flex justify-center w-full mt-1">
              <button
                className="w-full py-2 px-4 rounded-l-full rounded-r-full text-md text-plight font-bold bg-green-500 shadow-[0px_0px_2px_#5B8FB9]"
                type="submit"
              >
                SAVE
              </button>
            </div>

            <div className="flex flex-col space-y-2">
              <div className="">
                <input
                  id="product-name"
                  name="name"
                  className="w-full px-1 text-3xl font-bold rounded-md bg-light bg-opacity-50"
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
            </div>
          </form>
          <div className="">
            {userCategories &&
              userCategories.length > 0 &&
              userCategories.map((category: Category, index: number) => {
                return (
                  <TagButton
                    key={uuidv4()}
                    category={category}
                    onClick={handleCategoryChange}
                    isToggled={isCategorySelected(category.name)}
                  />
                );
              })}
          </div>
        </section>
      </section>
    </>
  );
};

export default EditProduct;

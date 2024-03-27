import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import {
  Navigate,
  useParams,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import Auth from "../../utils/auth";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER_PRODUCT, QUERY_USER_CATEGORIES } from "../../utils/queries";
import { UPDATE_PRODUCT } from "../../utils/mutations";
import { Category, Product } from "../../utils/customClientTypes";
import { v4 as uuidv4 } from "uuid";
import TagButton from "../gallery/tagButton";
import CompareObjects from "../../utils/compareObjects";
import data from "@iconify/icons-mdi/chevron-left";

const baseCDN =
  import.meta.env.VITE_BASE_CDN ||
  "https://chumbucket.donovancourtney.dev/artist_portfolio";

interface EditProductProps {
  itemToEdit: string;
}

interface SelectedCategory {
  name: string;
  defaultCategory: boolean;
}

const tempData = "US Flag"; // TODO remove

const EditProduct = ({ itemToEdit = tempData }: EditProductProps) => {
  const [formState, setFormState] = useState({});
  const [userProduct, setUserProduct] = useState<Product | null>(null);
  const [userAllCategories, setUserAllCategories] = useState<Category[] | null>(
    null
  );
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  // const [categoryList, setCategoryList] = useState<string[]>([""]);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const formRef = useRef<HTMLFormElement | null>(null);
  const selectedCategories = useRef<SelectedCategory[]>([]);
  let { username: userParam } = useParams();
  if (!userParam) userParam = import.meta.env.VITE_BASE_USER;

  const { loading: loadingProduct, error: errorProduct } = useQuery(
    QUERY_USER_PRODUCT,
    {
      variables: {
        username: import.meta.env.VITE_BASE_USER,
        product: itemToEdit,
      },
      onCompleted: (data) => {
        setUserProduct(data?.userProduct[0]);
        selectedCategories.current = data.userProduct[0].categories.map(
          (category: Category) => {
            return category;
          }
        );

        setFormState(data?.userProduct[0]);
      },
    }
  );

  const { loading: loadingCategoies, error: errorCategories } = useQuery(
    QUERY_USER_CATEGORIES,
    {
      variables: {
        username: import.meta.env.VITE_BASE_USER,
      },
      onCompleted: (data) => {
        setUserAllCategories(data?.userCategories.categories);
      },
    }
  );

  // Error handling for graphql queries
  if (errorProduct) {
    // do stuff
  }
  if (errorCategories) {
    // do stuff
  }

  useEffect(() => {
    if (Object.keys(formState).length > 0) {
      if (!CompareObjects(formState, userProduct)) {
        setIsSaveDisabled(false);
      } else {
        setIsSaveDisabled(true);
      }
    }
  }, [formState]);

  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Update list of selected categories
  const handleCategoryChange = (cat: Category) => {
    // create new SelectedCategory obj from Category obj
    const { name, defaultCategory } = cat;
    const newSelectedCategory: SelectedCategory = {
      name,
      defaultCategory,
    };

    if (!newSelectedCategory.defaultCategory) {
      if (!isCategorySelected(newSelectedCategory.name)) {
        selectedCategories.current = [
          ...selectedCategories.current,
          newSelectedCategory,
        ];
      } else {
        selectedCategories.current = selectedCategories.current.filter(
          (category) => category.name !== newSelectedCategory.name
        );
      }

      // TODO may need to make adjustment here - once backend is fully connected and mutated check for accuracy
      setFormState({
        ...formState,
        categories: selectedCategories.current,
      });
    }
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formState);
    // First verify formState is not an empty object
    // if (Object.keys(formState).length > 0) {
    try {
      const { data } = await updateProduct({
        variables: { id: userProduct?._id, ...formState },
      });

      setUserProduct(data.updateProduct);
    } catch (err: any) {
      console.log(err.message);
    }
    // }

    // Reset form state
    setFormState({});
  };

  const isCategorySelected = (cat: string) => {
    const val = selectedCategories.current.some(
      (selectedCategory) => selectedCategory.name === cat
    );
    return val;
  };

  if (loadingProduct) return null;

  return (
    <>
      <section className="flex flex-col justify-start items-center min-h-screen pt-24 mx-2 mb-1 bg-secondary">
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

        <section className="flex flex-col flex-grow w-full text-plight rounded-b-3xl bg-dark">
          <form
            id="edit-product-form"
            ref={formRef}
            className="flex flex-col flex-grow justify-between w-full h-full p-2"
            onSubmit={handleFormSubmit}
          >
            {/* Form Fields */}
            <div className="flex flex-col space-y-2">
              <div className="">
                <input
                  id="product-name"
                  name="name"
                  className="w-full px-1 text-3xl font-bold rounded-md bg-light bg-opacity-50"
                  // placeholder={userProduct?.name}
                  defaultValue={userProduct?.name}
                  onChange={handleFormChange}
                />
              </div>

              <div className="w-full">
                <textarea
                  id="product-description"
                  name="description"
                  className="w-full h-10 px-1 text-lg font-medium rounded-md bg-light bg-opacity-50"
                  // placeholder={userProduct?.description}
                  defaultValue={userProduct?.description}
                  onChange={handleFormChange}
                />
              </div>

              {/* Category Buttons */}
              <div className="flex flex-wrap w-full">
                {userAllCategories &&
                  userAllCategories.length > 0 &&
                  userAllCategories.map((category: Category, index: number) => {
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
            </div>

            {/* TODO Add cancel button that reverts chaange */}
            {/* Submit Button */}
            <div className="flex justify-center w-full">
              {!isSaveDisabled && (
                <motion.button
                  className="w-fit py-2 px-4 rounded-l-full rounded-r-full text-md text-plight font-bold bg-green-500 shadow-[0px_0px_2px_#5B8FB9]"
                  type="submit"
                  // initial={{ width: "fit-content" }}
                  // animate={{ width: "full" }}
                  // exit={{ opacity: 0 }}
                >
                  SAVE
                </motion.button>
              )}
            </div>
          </form>
        </section>
      </section>
    </>
  );
};

export default EditProduct;

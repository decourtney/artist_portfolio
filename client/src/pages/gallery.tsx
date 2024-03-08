/** TODO
 * Refresh site breaks routes - Route /gallery/:productName will refresh to default gallery page
 * but still be on appropriate route. Moving product to redux state introduced this bug
 * Try using redux-persist
 */

import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORY, QUERY_USER_CATEGORIES } from "../utils/queries";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { RootState } from "../redux/store";
import { v4 as uuidv4 } from "uuid";
import { Category, Product } from "../utils/customClientTypes";
import CategoryItem from "../components/gallery/categoryItem";
import CategoryModal from "../components/gallery/categoryModal";
import ProductModal from "../components/gallery/productModal";
import MiniModal from "../components/gallery/miniModal";
import Hero from "../components/home/hero";

const Gallery = () => {
  const dispatch = useAppDispatch();
  const { showMiniModal } = useAppSelector(
    (state: RootState) => state.miniModal.miniModalState
  );
  const { showProductModal } = useAppSelector(
    (state) => state.product.productState
  );
  const { showCategoryModal } = useAppSelector(
    (state) => state.category.categoryState
  );
  const [categories, setCategories] = useState<Category[]>();

  const { loading, data } = useQuery(QUERY_USER_CATEGORIES, {
    variables: { username: import.meta.env.VITE_BASE_USER },
  });

  useEffect(() => {
    if (data) {
      setCategories(data.userCategories.categories);
    }
  }, [data]);

  if (loading) return null;

  return (
    <>
      <section
        id="gallery"
        className="relative flex flex-col w-full h-full min-h-screen"
      >
        {categories &&
          categories.length > 0 &&
          categories.map((category: Category, index: number) => {
            if (category.products.length > 0) {
              return (
                <CategoryItem
                  key={uuidv4()}
                  category={category}
                  index={index}
                />
              );
            }
          })}

          {showCategoryModal && <CategoryModal />}
          {showProductModal && <ProductModal />}
          {showMiniModal && <MiniModal />}
      </section>
    </>
  );
};

export default Gallery;

/** TODO
 *
 */

import React, { Dispatch, SetStateAction, useEffect } from "react";
import {
  Navigate,
  useParams,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { setCategoryState } from "../../redux/categorySlice";
import { setProductState } from "../../redux/productSlice";
import { Category, Product } from "../../utils/customClientTypes";
import { motion, useAnimate } from "framer-motion";

const baseCDN =
  import.meta.env.VITE_BASE_CDN ||
  "https://chumbucket.donovancourtney.dev/artist_portfolio";

// need this modal to redirect to /gallery/:productName - need to test how it looks when the back button is clicked
const GalleryModal = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const categoryData = useAppSelector<Category>(
    (state) => state.category.categoryState.data
  );
  const [scope, animate] = useAnimate();

  let { username: userParam } = useParams(); // future use
  if (!userParam) userParam = import.meta.env.VITE_BASE_USER;

  const handleClose = () => {
    dispatch(setCategoryState({ showCategoryModal: false }));
    navigate("/gallery/");
  };

  const handleOnClickProduct = (item: Product) => {
    const { bottom, height, left, right, top, width, x, y } =
      scope.current.getBoundingClientRect();

    dispatch(
      setProductState({
        // productContainerId: undefined,
        product: item,
        productRect: { bottom, height, left, right, top, width, x, y },
        showProductModal: true,
      })
    );
    dispatch(setCategoryState({ showCategoryModal: false }));

    navigate(`/gallery/c/${categoryData?.name}/${item.name}`);
  };

  useEffect(() => {
    if (categoryData) console.log(categoryData);
  }, [categoryData]);

  if (!categoryData) return null;

  return (
    <section
      id="categoryModal"
      className="fixed flex justify-center items-center w-full h-full z-50"
    >
      <div
        className="absolute w-full h-full bg-black opacity-75"
        onClick={handleClose}
      />

      {/* content */}
      <motion.div className="w-fit h-full pt-3 overflow-scroll no-scrollbar">
        <div className="relative flex flex-col w-fit h-fit max-w-[90vw] min-h-full px-2 pb-3 border-0 rounded-lg shadow-lg bg-secondary outline-none focus:outline-none pointer-events-auto">
          {/*title*/}
          <div className="flex justify-center items-center h-24 rounded-t text-light text-2xl">
            <h3 className="font-semibold">{categoryData.name}</h3>
          </div>

          {/*body*/}
          {/* <div className="grid grid-cols-2 gap-2"> */}
          <div className="flex flex-row flex-wrap mb-[2vw]">
            {categoryData.products.map((product, index) => (
              <div
                ref={scope}
                key={product.name}
                className="relative w-1/2 h-36 my-1"
              >
                <div className="w-full h-full px-1 z-0">
                  <img
                    src={`${baseCDN}/${userParam}/${product?.image}`}
                    className="w-full h-full object-cover object-top"
                    alt={`${product?.name}`}
                    loading="lazy"
                    onClick={() => {
                      handleOnClickProduct(product);
                    }}
                  />
                </div>
                <div className="absolute top-2/3 bottom-0 left-0 right-0 mx-1 p-2 bg-dark">
                  <h3 className="font-bold text-[2dvw] text-slate-300">
                    {product.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* close button */}
          <button
            className="absolute top-1 right-2 bg-transparent border-0 outline-none focus:outline-none"
            onClick={handleClose}
          >
            <span className="material-symbols-rounded bg-transparent text-2xl outline-none focus:outline-none text-light">
              close
            </span>
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default GalleryModal;

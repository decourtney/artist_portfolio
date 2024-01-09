import React, { Dispatch, SetStateAction, useEffect } from "react";
import {
  Navigate,
  useParams,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { unsetCategoryState } from "../../redux/categorySlice";
import { Category, Product } from "../../utils/customClientTypes";
import Slider from "../slider";

const baseCDN =
  import.meta.env.VITE_BASE_CDN ||
  "https://chumbucket.donovancourtney.dev/artist_portfolio";

// need this modal to redirect to /gallery/:productName - need to test how it looks when the back button is clicked
const GalleryModal = () => {
  const categoryData = useAppSelector<Category | undefined>(
    (state) => state.category.data
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  let { username: userParam } = useParams(); // future use
  if (!userParam) userParam = import.meta.env.VITE_BASE_USER;

  const handleClose = () => {
    dispatch(unsetCategoryState());
    navigate("/gallery/");
  };

   const handleOnClickProduct = (item: Product | Category) => {
     if (item.__typename === "Product") {
       navigate(`/gallery/${categoryData?.name}/${item.name}`);
     }
   };

  useEffect(() => {
    if (categoryData) console.log(categoryData);
  }, [categoryData]);

  if (!categoryData) return <></>;

  return (
    <div
      className="fixed flex justify-center items-center w-full h-full z-50 outline-none focus:outline-none before:opacity-50 before:bg-black before:absolute before:inset-0"
      // onClick={handleClose}
    >
      <div className="w-fit h-full pt-3 overflow-scroll">
        {/*content*/}
        <div className="relative w-fit h-fit max-w-[90vw] px-3 pb-3 border-0 rounded-lg shadow-lg bg-secondary outline-none focus:outline-none pointer-events-auto">
          {/*title*/}
          <div className="flex justify-center items-center h-24 rounded-t text-light text-2xl">
            <h3 className="font-semibold">{categoryData.name}</h3>
          </div>

          {/*body*/}
          {categoryData.products.map((product, index) => (
            <div className="w-fit p-1 mb-[4vw] rounded-md shadow-md bg-yellow-200">
              <img
                src={`${baseCDN}/${userParam}/${product?.image}`}
                className="inline-block w-auto h-auto max-h-[96dvh]"
                alt={`${product?.name}`}
                loading="lazy"
                onClick={() => {
                  handleOnClickProduct(product);
                }}
              />
            </div>
          ))}
          {/* close button */}
          <button
            className="absolute top-5 right-5 bg-transparent border-0 outline-none focus:outline-none"
            onClick={handleClose}
          >
            <span className="material-symbols-rounded bg-transparent text-2xl outline-none focus:outline-none text-light">
              close
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryModal;

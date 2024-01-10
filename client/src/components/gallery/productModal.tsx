import React, { Dispatch, SetStateAction, useEffect } from "react";
import {
  Navigate,
  useParams,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { unsetProductState } from "../../redux/productSlice";
import { Category, Product } from "../../utils/customClientTypes";

const baseCDN =
  import.meta.env.VITE_BASE_CDN ||
  "https://chumbucket.donovancourtney.dev/artist_portfolio";

const ProductModal = () => {
  const productData = useAppSelector<Product | undefined>(
    (state) => state.product.data
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let { username: userParam } = useParams();

  if (!userParam) userParam = import.meta.env.VITE_BASE_USER;

  const handleBack = () => {
    // dispatch(unsetProductState());
    navigate(-1);
  };

  const handleClose = () => {
    // dispatch(unsetProductState());
    navigate("/gallery/");
  };

  useEffect(() => {
    if (productData) console.log(productData);
  }, [productData]);

  return (
    <div
      id="productModal"
      className="fixed flex justify-center items-center w-full h-full z-50"
    >
      <div
        className="absolute w-full h-full bg-black opacity-75"
        onClick={handleClose}
      />
      {/* content */}
      <div className="fixed w-fit h-fit p-1 border-0 rounded-md shadow-2xl bg-secondary outline-none focus:outline-none pointer-events-auto">
        {/* title */}
        <div className="relative w-full h-full py-1 px-8 text-center text-light">
          <h3>{productData?.name}</h3>

          {/* back button */}
          <button
            className="absolute top-0 left-0 bg-transparent border-0 outline-none focus:outline-none"
            onClick={handleBack}
          >
            <span className="material-symbols-rounded bg-transparent text-2xl outline-none focus:outline-none">
              arrow_back
            </span>
          </button>
          {/* close button */}
          <button
            className="absolute top-0 right-0 bg-transparent border-0 outline-none focus:outline-none"
            onClick={handleClose}
          >
            <span className="material-symbols-rounded bg-transparent text-2xl outline-none focus:outline-none">
              close
            </span>
          </button>
        </div>

        {/* image */}
        <img
          src={`${baseCDN}/${userParam}/${productData?.image}`}
          className="inline-block w-full h-auto max-h-[96dvh]"
          alt={`${productData?.name}`}
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default ProductModal;

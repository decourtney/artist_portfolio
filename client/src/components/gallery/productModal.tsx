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

  const handleClose = () => {
    // dispatch(unsetProductState());
    navigate(-1);
  };

  useEffect(() => {
    if (productData) console.log(productData);
  }, [productData]);

  return (
    <div className="fixed flex justify-center items-center w-full h-full z-50 outline-none focus:outline-none before:opacity-50 before:bg-black before:absolute before:inset-0">
      {/* content */}
      <div className="relative w-fit h-fit p-1 border-0 rounded-md shadow-2xl bg-secondary outline-none focus:outline-none pointer-events-auto">
        {/* image */}
        <img
          src={`${baseCDN}/${userParam}/${productData?.image}`}
          className="inline-block w-full h-auto max-h-[96dvh]"
          alt={`${productData?.name}`}
          loading="lazy"
        />

        {/* close button */}
        <button
          className="absolute top-[2%] right-[2%] bg-transparent border-0 outline-none focus:outline-none"
          onClick={handleClose}
        >
          <span className="material-symbols-rounded bg-transparent text-2xl outline-none focus:outline-none text-light">
            close
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProductModal;

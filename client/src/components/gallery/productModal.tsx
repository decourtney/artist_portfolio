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
    navigate("/gallery/");
  };

  useEffect(() => {
    if (productData) console.log(productData);
  }, [productData]);

  return (
    <>
      <div
        className="fixed w-full h-full z-50 outline-none focus:outline-none after:opacity-50 after:bg-black"
        onClick={handleClose}
      >
        {/* <div className=" max-w-[95vw] pt-6 mx-auto"> */}
          {/*content*/}
          <div className="relative mx-auto w-fit max-w-[95vw] max-h-[90vh] border-0 rounded-lg shadow-2xl bg-secondary outline-none focus:outline-none pointer-events-auto">
            {/*header*/}
            <div className="flex justify-center items-center rounded-t text-light text-2xl">
              <h3 className="font-semibold">Product Modal Title</h3>
            </div>

            {/*body*/}
            <div className="p-6">
              <img
                src={`${baseCDN}/${userParam}/${productData?.image}`}
                className=""
                alt={`${productData?.name}`}
                loading="lazy"
              />
              {/* <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                I always felt like I could do anything. That’s the main thing
                people are controlled by! Thoughts- their perception of
                themselves! They're slowed down by their perception of
                themselves. If you're taught you can’t do anything, you won’t do
                anything. I was taught I could do everything.
              </p> */}
            </div>
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
        {/* </div> */}

        {/* <div
          className="opacity-50 fixed inset-0 z-40 bg-black"
          onClick={handleClose}
        ></div> */}
      </div>
    </>
  );
};

export default ProductModal;

// TODO
/**
 * The productModal is good enough for now
 * Currently the productModal doesnt fully recover when the user leaves the page then back-button navigates back to the page.
 * I verified that the productModal is still in the redux state and unchanged but the modal is not using the correct dimensions.
 * The issue resides with the initial loading of the image - it uses the tailwind classes to set the dimensions of the image
 * and never re-renders with the redux values. This on only occurs in this specific case so far
 */

import React, { useState, useRef, useEffect } from "react";
import Auth from "../../utils/auth";
import { useParams, useNavigate } from "react-router-dom";
import useBackButton from "../../utils/useBackButton";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { setProductState } from "../../redux/productSlice";
import GetModalDimensions from "../../utils/getModalDimensions";
import { motion, useAnimate, usePresence } from "framer-motion";
import { setSliderItemState } from "../../redux/sliderItemSlice";
import { LoggedInUser } from "../../utils/customClientTypes";

const baseCDN =
  import.meta.env.VITE_BASE_CDN ||
  "https://chumbucket.donovancourtney.dev/artist_portfolio";

const ProductModal = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { productContainerId, product, productRect } = useAppSelector(
    (state: RootState) => state.product.productState
  );
  const { sliderItemRect } = useAppSelector(
    (state: RootState) => state.sliderItem[productContainerId]
  );
  const [productImgDimensions, setProductImgDimensions] = useState<{
    width: number;
    height: number;
    x: number;
    y: number;
    margin: string;
  } | null>(null);
  const [scope, animate] = useAnimate();
  const imgRef = useRef<HTMLImageElement>(null);
  const isAnimating = useRef<boolean>(false);
  const loggedInUser = Auth.getProfile() as LoggedInUser;

  let { username: userParam } = useParams();
  if (!userParam) userParam = import.meta.env.VITE_BASE_USER;

  const allowEditing = loggedInUser.data.username === userParam;
  const imgSrc = `${baseCDN}/${userParam}/${product.image}`;

  useEffect(() => {
    const handleWindowResize = () => {
      if (imgRef.current) {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const imgWidth = imgRef.current.naturalWidth;
        const imgHeight = imgRef.current.naturalHeight;

        const aspectRatio = imgWidth / imgHeight;

        const imgDimensions = GetModalDimensions({
          aspectRatio,
          maxWidth: windowWidth,
          maxHeight: windowHeight,
        });

        animate(
          scope.current,
          { ...imgDimensions, x: 0, y: 0 },
          { duration: 0.2, ease: "easeInOut" }
        );
      }
    };

    handleWindowResize();

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const animateClose = async () => {
    await animate(
      scope.current,
      {
        ...sliderItemRect,
        margin: 0,
      },
      {
        duration: 0.2,
        onPlay() {
          isAnimating.current = true;
        },
        onComplete() {
          isAnimating.current = false;
          dispatch(
            setSliderItemState({
              sliderItemId: productContainerId,
              sliderItemVisibility: "visible",
            })
          );
          dispatch(setProductState({ showProductModal: false }));
        },
      }
    );
  };

  const handleBack = async () => {
    if (isAnimating.current) return;

    await animateClose();
    navigate(-1);
  };

  const handleClose = async () => {
    if (isAnimating.current) return;

    await animateClose();
    navigate("/gallery/");
  };

  if (!imgRef) return null;

  return (
    <section id="productModal" className="absolute w-full h-full z-50">
      <div
        id="product-background"
        className="absolute top-0 left-0 w-full h-full opacity-50 bg-black -z-10"
        onClick={handleClose}
      />
      <motion.div
        ref={scope}
        key={product.name}
        // className="w-full h-full"
        initial={{ ...productRect }}
        // style={{ ...productImgDimensions }}
      >
        <div id="product-buttons" className="relative h-full">
          <button
            className="absolute top-[1dvw] left-[1dvw] p-1 bg-gray-400 bg-transparent rounded-full border-0"
            onClick={handleClose}
          >
            <span className="material-symbols-rounded text-1xl align-bottom">
              arrow_back
            </span>
          </button>

          <button
            className="absolute top-[1dvw] right-[1dvw]  p-1 bg-gray-400 bg-transparent rounded-full border-0"
            onClick={handleBack}
          >
            <span className="material-symbols-rounded text-1xl align-bottom">
              close
            </span>
          </button>

          {allowEditing && (
            <button
              className="absolute bottom-[1dvw] left-[1dvw] p-1 bg-gray-400 bg-transparent rounded-full border-0"
              onClick={() => console.log("edit")}
            >
              <span className="material-symbols-rounded text-1xl align-bottom">
                edit
              </span>
            </button>
          )}

          <button
            className="absolute bottom-[1dvw] right-[1dvw] p-1 bg-gray-400 bg-transparent rounded-full border-0"
            onClick={() => console.log("info")}
          >
            <span className="material-symbols-rounded text-1xl align-bottom">
              info_i
            </span>
          </button>

          <img
            ref={imgRef}
            src={imgSrc}
            className="w-full h-full object-cover rounded-sm"
            alt={`${product.name}`}
            loading="lazy"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default ProductModal;

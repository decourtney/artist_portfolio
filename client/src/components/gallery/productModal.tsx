import React, { useState, useEffect, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { setProductState } from "../../redux/productSlice";
import { getModalDimensions } from "./getModalDimensions";
import { motion, useAnimate } from "framer-motion";
import { setSliderItemState } from "../../redux/sliderItemSlice";

const baseCDN =
  import.meta.env.VITE_BASE_CDN ||
  "https://chumbucket.donovancourtney.dev/artist_portfolio";

const ProductModal = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { productContainerId, product, productRect, showProductModal } =
    useAppSelector((state: RootState) => state.product.productState);
  const { sliderItemRect, sliderItemVisibility } = useAppSelector(
    (state: RootState) => state.sliderItem.sliderItemState[productContainerId]
  );
  const [productImgDimensions, setProductImgDimensions] = useState<{
    width: number;
    height: number;
    x: number;
    y: number;
    margin: string;
  } | null>(null);
  const [scope, animate] = useAnimate();

  let { username: userParam } = useParams();
  if (!userParam) userParam = import.meta.env.VITE_BASE_USER;

  const imgSrc = `${baseCDN}/${userParam}/${product.image}`;

  useLayoutEffect(() => {
    const handleWindowResize = () => {
      const img = new Image();
      img.src = imgSrc;
      let windowWidth = window.innerWidth;
      let windowHeight = window.innerHeight;

      img.onload = () => {
        const aspectRatio = img.width / img.height;

        const imgDimensions = getModalDimensions({
          aspectRatio,
          maxWidth: windowWidth,
          maxHeight: windowHeight,
        });
        setProductImgDimensions({ ...imgDimensions, x: 0, y: 0 });
      };
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
      { duration: 0.2 }
    );

    setSliderItemVisibilityToVisible();
    dispatch(setProductState({ showProductModal: false }));
  };

  const setSliderItemVisibilityToVisible = () => {
    dispatch(
      setSliderItemState({
        sliderItemId: productContainerId,
        sliderItemVisibility: "visible",
        isSliderItemVisible: false,
      })
    );
  };

  const handleBack = async () => {
    // await animateClose();
    navigate(-1);
  };

  const handleClose = async () => {
    await animateClose();
    navigate("/gallery/");
  };

  return (
    <section id="productModal" className="absolute w-full h-full z-50">
      <div
        id="product-background"
        className="absolute top-0 left-0 w-full h-full opacity-50 bg-black -z-10"
        onClick={handleClose}
      />
      <motion.div
        ref={scope}
        style={{ ...productRect, ...productImgDimensions }}
      >
        <div id="product-buttons" className="relative">
          <button
            className="absolute -top-1 left-0 bg-transparent border-0 outline-none focus:outline-none"
            onClick={handleBack}
          >
            <span className="material-symbols-rounded bg-transparent text-2xl outline-none focus:outline-none">
              arrow_back
            </span>
          </button>

          <button
            className="absolute -top-1 right-0 bg-transparent border-0 outline-none focus:outline-none"
            onClick={handleClose}
          >
            <span className="material-symbols-rounded bg-transparent text-2xl outline-none focus:outline-none">
              close
            </span>
          </button>
        </div>

        <img
          src={imgSrc}
          className="w-full h-full object-cover rounded-sm"
          alt={`${product.name}`}
          loading="lazy"
        />
      </motion.div>
    </section>
  );
};

export default ProductModal;

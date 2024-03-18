import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useBackButton from "../../utils/useBackButton";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { setProductState } from "../../redux/productSlice";
import GetModalDimensions from "../../utils/getModalDimensions";
import { motion, useAnimate, usePresence } from "framer-motion";
import { setSliderItemState } from "../../redux/sliderItemSlice";

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
  const imgRef = useRef<HTMLImageElement>(null);
  const isAnimating = useRef<boolean>(false);

  let { username: userParam } = useParams();
  if (!userParam) userParam = import.meta.env.VITE_BASE_USER;

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

  useEffect(() => {}, []);

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
        <div id="product-buttons" className="relative">
          <button
            className="absolute -top-1 left-0 bg-transparent border-0 outline-none focus:outline-none"
            onClick={handleClose}
          >
            <span className="material-symbols-rounded bg-transparent text-2xl outline-none focus:outline-none">
              arrow_back
            </span>
          </button>

          <button
            className="absolute -top-1 right-0 bg-transparent border-0 outline-none focus:outline-none"
            onClick={handleBack}
          >
            <span className="material-symbols-rounded bg-transparent text-2xl outline-none focus:outline-none">
              close
            </span>
          </button>
        </div>

        <img
          ref={imgRef}
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

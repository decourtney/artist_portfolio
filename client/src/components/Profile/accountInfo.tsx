import { useState, useRef, useEffect } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { QUERY_ACCOUNT } from "../../utils/queries";
import { ADD_CATEGORY } from "../../utils/mutations";
import { Product } from "../../utils/customClientTypes";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useAnimation,
  useAnimationControls,
} from "framer-motion";
import CreateCategory from "./createCategory";
import Slider from "../slider";
import BackButton from "./backButton";
import CollapsibleButton from "./collapsibleButton";
import DragnDrop from "./dragndrop";

// TODO Remove and just use .env
const baseCDN = import.meta.env.VITE_BASE_CDN ||
  "https://chumbucket.donovancourtney.dev/artist_portfolio";

// TODO Not currently in use
interface AccountProps {
  setIsEditForm: (setIsEditForm: boolean) => void;
  handleBackButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const AccountInfo = ({ setIsEditForm, handleBackButton }: AccountProps) => {
  const { username: userParam } = useParams();
  const [addCategory, setAddCategory] = useState(false);
  const [addCollection, setAddCollection] = useState(false);
  const controls = useAnimationControls();

  const isCenterSlides = true;
  const categoryNumToDisplay = 5;
  const collectionNumToDisplay = 2;

  const { loading, data } = useQuery(QUERY_ACCOUNT, {
    variables: { username: userParam },
  });

  // if (!loading) console.log("query account:", data);

  // TODO Style text colors
  return (
    <>
      <section className="flex flex-col flex-grow w-full font-medium text-plight">
        {/* Category/Collection Count */}
        {/* <div className="relative grid grid-cols-2 grid-rows-1 gap-0 mt-4 text-center after:content-[''] after:bg-psecondary after:absolute after:top-0 after:left-1/2 after:h-3/4 after:w-[1px]">
          <div className="relative pb-3 after:content-[''] after:bg-psecondary after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[1px] after:w-3/4">
            <span>{data?.account.categoryCount}</span>
            <p>Categories</p>
          </div>
          <div className="relative pb-3 after:content-[''] after:bg-psecondary after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[1px] after:w-3/4">
            <span>{data?.account.productCount}</span>
            <p>Collections</p>
          </div>
        </div> */}

        {/* Category/Collection Display */}
        <div className="flex flex-col flex-grow mt-5 space-y-5">
          {/* TODO Add skeleton loading image */}
          {loading ? (
            <></>
          ) : (
            <>
              {/* TODO Create popup for visiting/editing category info, display icon */}
              {/* Category Slider */}
              <div className="flex flex-col">
                <div className="flex justify-between mb-4">
                  <div className="fade-right title-underline relative w-full">
                    <p className="ml-5">Categories</p>
                  </div>

                  {addCategory ? (
                    <div className="flex justify-end items-center w-full">
                      <CreateCategory setAddCategory={setAddCategory} />
                    </div>
                  ) : (
                    <div className="flex justify-end items-center w-full text-xs">
                      <CollapsibleButton
                        handleOnClick={setAddCategory}
                        display={addCategory}
                        title={"Add Category"}
                        symbol={"add"}
                      />
                    </div>
                  )}
                </div>
                <div className="relative edge-fade flex flex-grow w-full text-xs">
                  <Slider
                    itemsToDisplay={data.account.categories}
                    numberToDisplay={categoryNumToDisplay}
                    isCenteredSlides={isCenterSlides}
                  />
                </div>
              </div>

              {/* TODO create popup for editing collection info or for deleting */}
              {/* Collections Slider */}
              <div className="flex flex-col flex-grow">
                {addCollection ? (
                  <>
                    <div className="flex flex-col">
                      <div className="flex justify-between mb-4">
                        <div className="fade-right title-underline relative w-full">
                          <p className="ml-5">Collections</p>
                        </div>
                        <div className="flex justify-end items-center w-full mb-1 text-xs">
                          <CollapsibleButton
                            handleOnClick={setAddCollection}
                            display={addCollection}
                            title={"Close"}
                            symbol={"remove"}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-grow p-2 rounded-2xl bg-plight">
                      <DragnDrop reportSuccess={setAddCollection} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col">
                      <div className="flex justify-between mb-4">
                        <div className="fade-right title-underline relative w-full">
                          <p className="ml-5">Collections</p>
                        </div>
                        <div className="flex justify-end items-center w-full mb-1 text-xs">
                          <CollapsibleButton
                            handleOnClick={setAddCollection}
                            display={addCollection}
                            title={"Add Collection"}
                            symbol={"add"}
                          />
                        </div>
                      </div>
                    </div>

                    <div
                      className={`relative flex justify-center items-center w-full ${
                        collectionNumToDisplay > 1 ? "edge-fade" : ""
                      }`}
                    >
                      <Slider
                        itemsToDisplay={data.account.products}
                        numberToDisplay={collectionNumToDisplay}
                        isCenteredSlides={isCenterSlides}
                      />
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </section>
      <BackButton />
    </>
  );
};

export default AccountInfo;

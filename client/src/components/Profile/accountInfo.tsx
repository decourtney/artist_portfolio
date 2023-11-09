import { useState, useRef, useEffect } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { QUERY_ACCOUNT } from "../../utils/queries";
import { ADD_CATEGORY } from "../../utils/mutations";
import { AccountItem } from "../../utils/customClientTypes";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useAnimation,
  useAnimationControls,
} from "framer-motion";
import CreateCategory from "./createCategory";
import Slider from "./slider";
import BackButton from "./backButton";
import CollapsibleButton from "./collapsibleButton"
import DragnDrop from "./dragndrop";

// TODO Remove and just use .env
const baseCDN =
  process.env.BASE_CDN ||
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

  const categoryNumToDisplay = 4;
  const collectionNumToDisplay = 1;

  const { loading, data } = useQuery(QUERY_ACCOUNT, {
    variables: { username: userParam },
  });

  const handleToggle = async () => {
    controls.start("open");
  };

  // if (!loading) console.log("query account:", data);

  // TODO Style text colors
  return (
    <>
      <section className="flex flex-col flex-grow w-full font-medium text-plight">
        {/* Category/Collection Count */}
        <div className="relative grid grid-cols-2 grid-rows-1 gap-0 mt-4 text-center after:content-[''] after:bg-psecondary after:absolute after:top-0 after:left-1/2 after:h-3/4 after:w-[1px]">
          <div className="relative pb-3 after:content-[''] after:bg-psecondary after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[1px] after:w-3/4">
            <span>{data?.account.categoryCount}</span>
            <p>Categories</p>
          </div>
          <div className="relative pb-3 after:content-[''] after:bg-psecondary after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[1px] after:w-3/4">
            <span>{data?.account.productCount}</span>
            <p>Collections</p>
          </div>
        </div>

        {/* Category/Collection Display */}
        <div className="flex flex-col flex-grow mt-2 space-y-5">
          {/* TODO Add skeleton loading image */}
          {loading ? (
            <></>
          ) : (
            <>
              {/* TODO Create popup for visiting/editing category info, display icon */}
              {/* Category Slider */}
              <div className="flex flex-col">
                <div className="flex justify-end items-center mb-1 text-xs">
                  {addCategory ? (
                    <CreateCategory setdisplayInput={setAddCategory} />
                  ) : (
                    <button type="button" onClick={() => setAddCategory(true)}>
                      Add Category
                      <span className="material-symbols-rounded px-1 text-lg align-middle pointer-events-none">
                        add
                      </span>
                    </button>
                  )}
                </div>
                <Slider
                  accountItems={data.account.categories}
                  numberToDisplay={categoryNumToDisplay}
                />
              </div>

              {/* TODO create popup for editing collection info or for deleting */}
              {/* Collections Display */}
              {addCollection ? (
                <div className="flex flex-col flex-grow">
                  <div className="flex justify-end items-center mb-1 text-xs">
                    <button
                      type="button"
                      onClick={() => setAddCollection(false)}
                    >
                      Close
                      <span className="material-symbols-rounded px-1 text-lg align-middle pointer-events-none">
                        remove
                      </span>
                    </button>
                  </div>
                  <div className="flex flex-grow p-2 rounded-2xl bg-plight">
                    <DragnDrop reportSuccess={setAddCollection} />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col flex-grow">
                  {/* TODO Finish make button more modular */}
                  <CollapsibleButton setAddCollection={setAddCollection} />
                  {/* <div className="flex justify-end items-center mb-1 text-xs">
                    <motion.div
                      className="overflow-hidden whitespace-nowrap"
                      animate={controls}
                      variants={{
                        open: { maxWidth: 100 },
                        close: { maxWidth: 0 },
                      }}
                      initial="close"
                    >
                      <p>Add Collection</p>
                    </motion.div>
                    <motion.button
                      type="button"
                      onHoverStart={() => controls.start("open")}
                      onHoverEnd={() => controls.start("close")}
                      onClick={() => setAddCollection(true)}
                    >
                      <span className="material-symbols-rounded px-1 text-lg pointer-events-none">
                        add
                      </span>
                    </motion.button>
                  </div> */}
                  <div className="flex justify-center items-center mb-1 text-xs">
                    <Slider
                      accountItems={data.account.products}
                      numberToDisplay={collectionNumToDisplay}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <BackButton />
    </>
  );
};

export default AccountInfo;

import { useState, useRef, useEffect } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { QUERY_ACCOUNT } from "../../utils/queries";
import { ADD_CATEGORY } from "../../utils/mutations";
import { AccountItem } from "../../utils/customClientTypes";
import { motion } from "framer-motion";
import CreateCategory from "./createCategory";
import Carousel from "./carousel";
import Carousel2 from "./carousel2";
import BackButton from "./backButton";
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
  const [displayInput, setdisplayInput] = useState(false);

  const { loading, data } = useQuery(QUERY_ACCOUNT, {
    variables: { username: userParam },
  });

  // if (!loading) console.log("query account:", data);

  // TODO Style text colors
  return (
    <>
      <section className="flex flex-col flex-grow w-full h-full font-medium text-plight">
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
              {/* Category Carousel */}
              <div className="flex flex-col">
                <div className="flex justify-end items-center mb-1 text-xs">
                  {displayInput ? (
                    <CreateCategory setdisplayInput={setdisplayInput} />
                  ) : (
                    <button
                      type="button"
                      className="flex flex-row items-center"
                      onClick={() => setdisplayInput(true)}
                    >
                      ADD
                      <span className="material-symbols-rounded px-1 text-xl pointer-events-none">
                        add
                      </span>
                    </button>
                  )}
                </div>
                <Carousel2
                  accountItems={data.account.categories}
                  numberToDisplay={3}
                />
              </div>

              {/* Collections Display */}
              {/* TODO Figure out what to display for Collections. Maybe slide scroll and lazy load images from gallery */}
              <div className="flex flex-grow  bg-red-400">
                <Carousel2
                  accountItems={data.account.products}
                  numberToDisplay={5}
                />
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

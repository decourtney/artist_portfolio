import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER_PRODUCTS } from "../../utils/queries";
import { UserData } from "../../utils/customClientTypes";
import { motion } from "framer-motion";
import Carousel from "./carousel";
import BackButton from "./backButton";
import DragnDrop from "./dragndrop";
import { useState } from "react";

interface AccountProps {
  userData: UserData | null;
  setIsEditForm: (setIsEditForm: boolean) => void;
  handleBackButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const AccountInfo = ({
  userData,
  setIsEditForm,
  handleBackButton,
}: AccountProps) => {
  const { username: userParam } = useParams();
  const [categoryInput, setCategoryInput] = useState(false);
  const navigate = useNavigate();

  // console.log(userParam)
  const { loading, data } = useQuery(QUERY_USER_PRODUCTS, {
    variables: { username: userParam },
  });

  const handleAddCategory = () => {
    setCategoryInput(!categoryInput);
  };

  // TODO Style text colors
  return (
    <>
      <section className="flex flex-col flex-grow w-full h-full font-medium text-plight">
        {/* Category/Collection Count */}
        <div className="relative grid grid-cols-2 grid-rows-1 gap-0 mt-4 text-center after:content-[''] after:bg-psecondary after:absolute after:top-0 after:left-1/2 after:h-3/4 after:w-[1px]">
          <div className="relative pb-3 after:content-[''] after:bg-psecondary after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[1px] after:w-3/4">
            <span>{userData?.categoryCount}</span>
            <p>Categories</p>
          </div>
          <div className="relative pb-3 after:content-[''] after:bg-psecondary after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[1px] after:w-3/4">
            <span>{userData?.productCount}</span>
            <p>Collections</p>
          </div>
        </div>

        {/* Category/Collection Display */}
        <div className="flex flex-col flex-grow mt-2">
          {/* TODO Add skeleton loading image */}
          {loading ? (
            <></>
          ) : (
            <>
              {/* Category Carousel */}
              <div className="flex flex-col">
                <div className="flex justify-end items-center mb-1 text-xs">
                  {categoryInput ? (
                    <>
                      <button
                        type="submit"
                        className="flex flex-row items-center"
                        onClick={handleAddCategory}
                      >
                        {/* TODO Create functionality for 'ADD' category button */}
                        <span className="material-symbols-rounded text-xl mx-1">
                          add
                        </span>
                      </button>
                      <input className="h-7 rounded-md text-center text-pdark bg-plight" />
                    </>
                  ) : (
                    <button
                      type="button"
                      className="flex flex-row items-center"
                      onClick={handleAddCategory}
                    >
                      {/* TODO Create functionality for 'ADD' category button */}
                      <span className="material-symbols-rounded text-xl">
                        add
                      </span>
                      ADD
                    </button>
                  )}
                </div>
                <Carousel objs={data.products.categories} />
              </div>

              {/* Collections Display */}
              {/* TODO Figure out what to display for Collections. Maybe slide scroll and lazy load images from gallery */}
              <div className="  bg-red-400"></div>
            </>
          )}
        </div>
      </section>
      <div className="w-full">
        <BackButton />
      </div>
    </>
  );
};

export default AccountInfo;

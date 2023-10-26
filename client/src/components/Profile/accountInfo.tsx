import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER_PRODUCTS } from "../../utils/queries";
import { UserData } from "../../utils/customClientTypes";
import { motion } from "framer-motion";
import ProfileCarousel from "./profileCarousel";
import BackButton from "./backButton";

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
  const navigate = useNavigate();

  // console.log(userParam)
  const { loading, data } = useQuery(QUERY_USER_PRODUCTS, {
    variables: { username: userParam },
  });

  // TODO Style text colors
  // TODO Create functionality for 'ADD' category button
  // TODO Figure out what to display for Collections. Maybe slide scroll and lazy load images from gallery
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
        <div className="flex flex-col flex-grow items-center px-2 py-4">
          {/* Category Carousel */}
          <div className="relative flex h-40">
            {loading ? <></> : <ProfileCarousel />}
            <button className="absolute flex items-center bottom-0 right-0 text-xs">
              <span className="material-symbols-rounded text-xl align-middle">
                add
              </span>
              ADD
            </button>
          </div>
        </div>
      </section>
      <div className="w-full">
        <BackButton />
      </div>
    </>
  );
};

export default AccountInfo;

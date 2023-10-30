import { useState, useRef } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ACCOUNT } from "../../utils/queries";
import { ADD_CATEGORY } from "../../utils/mutations";
import { UserData } from "../../utils/customClientTypes";
import { motion } from "framer-motion";
import Carousel from "./carousel";
import BackButton from "./backButton";
import DragnDrop from "./dragndrop";

interface CreateCatProps {
  setdisplayInput: (setdisplayInput: boolean) => void;
}

const CreateCategory = ({ setdisplayInput }: CreateCatProps) => {
  const { username: userParam } = useParams();
  const [categoryName, setCategoryName] = useState<String | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const [addCategory] = useMutation(ADD_CATEGORY, {
    refetchQueries: [
      { query: QUERY_ACCOUNT, variables: { username: userParam } },
    ],
  });
  
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (categoryName) {
      try {
        const response = await addCategory({
          variables: {
            username: userParam,
            category: categoryName,
          },
        });

        console.log(response);
      } catch (err: any) {
        // TODO Work on proper error display
        console.log(err);
        if (err.name === "ApolloError") {
          const errorMsg = err.message.split(":").pop().trim();
          // setErrorMsg(errorMsg);
        } else {
          // setErrorMsg(err.message);
        }
      }
    }

    if (formRef.current) formRef.current.reset();
    setCategoryName(null);
    setdisplayInput(false);
  };

  return (
    <>
      <form ref={formRef} className="flex flex-row" onSubmit={handleFormSubmit}>
        <input
          className="h-7 rounded-l-md text-center text-pdark bg-plight"
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <button type="submit" className="flex flex-row items-center">
          {/* TODO Create functionality for 'ADD' category button */}
          <span className="material-symbols-rounded px-1 text-xl rounded-r-md bg-green-500">
            add
          </span>
        </button>
      </form>
    </>
  );
};

export default CreateCategory;

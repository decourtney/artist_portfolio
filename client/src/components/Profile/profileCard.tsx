import { useEffect, useState, useRef } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../utils/mutations";
import { UserData } from "../../utils/customClientTypes";
import { motion } from "framer-motion";

const ProfileCard = ({ userData }: { userData: UserData }) => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [isEditForm, setIsEditForm] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [updateUser, { error }] = useMutation(UPDATE_USER);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await updateUser({ variables: formState });

      console.log(response)
    } catch (err) {
      console.log({ err });
    }

    // Clear state, form, and switch from edit mode
    setFormState({ firstName: "", lastName: "", email: "" });
    if (formRef.current) formRef.current.reset();
    setIsEditForm(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <section className="flex flex-col w-full rounded-2xl font-medium text-plight">
      <div className="relative grid grid-cols-2 grid-rows-1 gap-0 mt-4 text-center after:content-[''] after:bg-psecondary after:absolute after:top-0 after:left-1/2 after:h-3/4 after:w-[1px]">
        <div className="relative pb-3 after:content-[''] after:bg-psecondary after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[1px] after:w-3/4">
          <span>{userData.products.length}</span>
          <p>Collections</p>
        </div>
        <div className="relative pb-3 after:content-[''] after:bg-psecondary after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[1px] after:w-3/4">
          <span>{userData.categories.length}</span>
          <p>Categories</p>
        </div>
      </div>

      {isEditForm ? (
        <>
          <form
            id="edit-profile-form"
            ref={formRef}
            className="relative flex flex-col items-center px-2 py-4 text-xs"
            onSubmit={handleFormSubmit}
          >
            <div className="w-full space-y-4 my-4 px-4">
              <div className="flex flex-col w-full">
                <span className="material-symbols-rounded">person</span>
                <div className="flex">
                  <input
                    id="firstName"
                    name="firstName"
                    type="name"
                    className="h-8 p-1 bg-pdark border-b-2 border-psecondary rounded-md w-full"
                    placeholder={userData.firstName || "First"}
                    onChange={handleChange}
                    autoComplete="given-name"
                  />
                  <input
                    id="lastName"
                    name="lastName"
                    type="name"
                    className="h-8 p-1 bg-pdark border-b-2 border-psecondary rounded-md w-full"
                    placeholder={userData.lastName || "Last"}
                    onChange={handleChange}
                    autoComplete="family-name"
                  />
                </div>
              </div>
              <div className="flex flex-col w-full">
                <span className="material-symbols-rounded">email</span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="h-8 p-1 bg-pdark border-b-2 border-psecondary rounded-md"
                  placeholder={userData.email || "Email"}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>
            </div>
            <div className="absolute bottom-[95%]">
              <motion.button
                className="w-fit py-1 px-2 rounded-l-full rounded-r-full text-xs font-black text-plight bg-pdark shadow-[0px_0px_2px_#5B8FB9]"
                type="submit"
                whileHover={{
                  // scale: 1.1,
                  boxShadow: "0px 0px 10px #5B8FB9",
                }}
                whileTap={{ scale: 0.95, boxShadow: "0px -2px 1px #5B8FB9" }}
              >
                SAVE
              </motion.button>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="relative flex flex-col items-center px-2 py-4">
            <div className="w-full space-y-4 my-4 px-4 text-lg font-semibold">
              <div className="relative flex flex-col w-full after:content-[''] after:bg-psecondary after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[1px] after:w-full">
                <span className="material-symbols-rounded">person</span>
                <p className="flex h-8 p-1 rounded-md">
                  {userData.firstName || "Hello. "}{" "}
                  {userData.lastName || "My name is Kevin"}
                </p>
              </div>

              <div className="relative flex flex-col w-full after:content-[''] after:bg-psecondary after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[1px] after:w-full">
                <span className="material-symbols-rounded">email</span>
                <p className="flex h-8 p-1 rounded-md">{userData.email}</p>
              </div>
            </div>
            <div className="absolute bottom-[95%]">
              <motion.button
                className="w-fit py-1 px-2 rounded-l-full rounded-r-full text-xs font-black text-plight bg-pdark shadow-[0px_0px_2px_#5B8FB9]"
                type="submit"
                whileHover={{
                  // scale: 1.1,
                  boxShadow: "0px 0px 10px #5B8FB9",
                }}
                whileTap={{ scale: 0.95, boxShadow: "0px -2px 1px #5B8FB9" }}
                onClick={() => setIsEditForm(true)}
              >
                EDIT
              </motion.button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default ProfileCard;

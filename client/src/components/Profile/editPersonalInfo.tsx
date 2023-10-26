import { useState, useRef } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../utils/mutations";
import { UserData } from "../../utils/customClientTypes";
import { motion } from "framer-motion";

interface EditProfileProps {
  userData: UserData | null;
  setIsEditForm: (setIsEditForm: boolean) => void;
}

const EditProfile = ({ userData, setIsEditForm }: EditProfileProps) => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street1: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const formRef = useRef<HTMLFormElement | null>(null);
  const [updateUser, { error }] = useMutation(UPDATE_USER);

  // Form Submit
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // First verify at least one field has a value
    if (
      Object.values(formState).some(
        (value) => value !== "" || null || undefined
      )
    ) {
      try {
        const response = await updateUser({ variables: formState });
      } catch (err) {
        console.log({ err });
      }
    }

    // Clear state, form, and switch from edit mode
    setFormState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      street1: "",
      city: "",
      state: "",
      postalCode: "",
    });
    if (formRef.current) formRef.current.reset();
    setIsEditForm(false);
  };

  // Form Changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <>
      <section className="flex flex-col flex-grow w-full rounded-2xl font-medium text-plight">
        <form
          id="edit-profile-form"
          ref={formRef}
          className="relative flex flex-col flex-grow justify-between items-center px-2 py-4"
          onSubmit={handleFormSubmit}
        >
          <div className="w-full space-y-4 my-4 px-4 text-lg">
            {/* First and Last Name Input*/}
            <div className="flex flex-col w-full">
              <span className="material-symbols-rounded text-sm">person</span>
              <div className="flex flex-row">
                <input
                  id="firstName"
                  name="firstName"
                  className="w-1/2 p-1 pl-4 text-lg bg-transparent border-b-2 border-psecondary"
                  placeholder={userData?.firstName || "First"}
                  onChange={handleChange}
                  autoComplete="given-name"
                />
                <input
                  id="lastName"
                  name="lastName"
                  className="w-1/2 p-1 pl-4 text-lg bg-transparent border-b-2 border-psecondary"
                  placeholder={userData?.lastName || "Last"}
                  onChange={handleChange}
                  autoComplete="family-name"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="flex flex-col w-full">
              <span className="material-symbols-rounded text-sm">email</span>
              <input
                id="email"
                name="email"
                className="w-full p-1 pl-4 text-lg bg-transparent border-b-2 border-psecondary"
                placeholder={userData?.email || "Email"}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>

            {/* Phone Input */}
            <div className="flex flex-col w-full">
              <span className="material-symbols-rounded text-sm">call</span>
              <input
                id="phone"
                name="phone"
                className="w-full p-1 pl-4 text-lg bg-transparent border-b-2 border-psecondary"
                placeholder={userData?.phone || "Phone Number"}
                onChange={handleChange}
                autoComplete="tel"
              />
            </div>

            {/* TODO Create autocompletion using Google maps */}
            {/* FIXME Browser autofill changes font initially */}
            {/* Address Input */}
            <div className="flex flex-col w-full h-full">
              <span className="material-symbols-rounded text-sm">home</span>
              <input
                id="street1"
                name="street1"
                className="w-full p-1 pl-4 text-lg bg-transparent border-b-2 border-dashed border-psecondary"
                placeholder={userData?.street1 || "Street"}
                onChange={handleChange}
                autoComplete="address-level3"
              />
              <input
                id="city"
                name="city"
                className="w-full p-1 pl-4 text-lg bg-transparent border-b-2 border-dashed border-psecondary"
                placeholder={userData?.city || "City"}
                onChange={handleChange}
                autoComplete="address-level2"
              />
              <input
                id="state"
                name="state"
                className="w-full p-1 pl-4 text-lg bg-transparent border-b-2 border-dashed border-psecondary"
                placeholder={userData?.state || "State"}
                onChange={handleChange}
                autoComplete="address-level1"
              />
              <input
                id="postalCode"
                name="postalCode"
                className="w-full p-1 pl-4 text-lg bg-transparent border-b-2 border-psecondary"
                placeholder={userData?.postalCode || "Postal Code"}
                onChange={handleChange}
                autoComplete="address-level1"
              />
            </div>
          </div>
          <div className="flex justify-center w-full">
            <motion.button
              className=" py-1 px-4 rounded-l-full rounded-r-full text-md text-plight font-bold bg-green-500 shadow-[0px_0px_2px_#5B8FB9]"
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
      </section>
      <div className="w-full">
        <motion.button
          id="back"
          type="button"
          className="rounded-full"
          onClick={() => setIsEditForm(false)}
        >
          <span className="material-symbols-rounded mx-2 text-light text-4xl text-center align-middle">
            chevron_left
          </span>
        </motion.button>
      </div>
    </>
  );
};

export default EditProfile;

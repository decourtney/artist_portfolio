import { useEffect, useState, useRef } from "react";
import { UserData } from "../../utils/customClientTypes";

const ProfileCard = ({ userData }: { userData: UserData }) => {
  const [isEditForm, setIsEditForm] = useState(false);
  const [isEditName, setIsEditName] = useState(true);
  const [isEditEmail, setIsEditEmail] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <section className="w-full rounded-2xl font-medium text-pdark bg-plight z-10">
      <div className="relative grid grid-cols-2 grid-rows-1 gap-0 mt-4 text-center after:content-[''] after:bg-light after:absolute after:top-0 after:left-1/2 after:h-3/4 after:w-[1px]">
        <div className="relative pb-3 after:content-[''] after:bg-light after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[1px] after:w-3/4">
          <span>{userData.products.length}</span>
          <p>Collections</p>
        </div>
        <div className="relative pb-3 after:content-[''] after:bg-light after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[1px] after:w-3/4">
          <span>{userData.categories.length}</span>
          <p>Categories</p>
        </div>
      </div>

      <form ref={formRef} className="flex flex-col items-center px-2 py-4 text-xs space-y-2">
        {/* Name */}
        {/* <div className="w-full"> */}
        {isEditForm ? (
          <div className="flex w-full">
            {/* <div className="flex flex-col"> */}
            {/* <label>First</label> */}
            <input
              className="h-8 p-1 bg-plight border border-psecondary rounded-md w-full"
              placeholder={userData.firstName || "First"}
              onChange={handleChange}
            />
            {/* </div> */}
            {/* <div className="flex flex-col w-full"> */}
            {/* <label>Last</label> */}
            <input
              className="h-8 p-1 bg-plight border border-psecondary rounded-md w-full"
              placeholder={userData.firstName || "Last"}
              onChange={handleChange}
            />
            {/* </div> */}
          </div>
        ) : (
          <div className="flex flex-col w-full">
            {/* <span>Name</span> */}
            <div className="flex h-8 p-1 rounded-md">
              <p>
                {userData.firstName || "Hello. "}{" "}
                {userData.lastName || "My name is Kevin"}
                <span className="material-symbols-rounded text-xs align-top text-pprimary cursor-pointer">
                  edit
                </span>
              </p>
            </div>
          </div>
        )}
        {/* </div> */}

        {/* Email */}
        {/* <div className="flex w-full"> */}
        {isEditForm ? (
          <div className="flex">
            <div className="flex flex-col w-full">
              {/* <label>Email</label> */}
              <input
                className="h-8 p-1 bg-plight border border-psecondary rounded-md"
                placeholder={userData.email || "Email"}
                onChange={handleChange}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-full">
            {/* <span>Email</span> */}
            <div className="flex  h-8 p-1 rounded-md">
              <p>
                {userData.email}
                <span className="material-symbols-rounded text-xs align-top text-pprimary">
                  edit
                </span>
              </p>
            </div>
          </div>
        )}
        {/* </div> */}
        <div>
          {/* Pword */}
          {/* {isEditPassword ? (
            <form ref={formRef} className="flex">
              <div className="flex flex-col w-full">
                <label>New</label>
                <input
                  className="h-8 p-1 bg-plight border border-psecondary rounded-md"
                  placeholder="***"
                  onChange={handleChange}
                />

                <label>Confirm</label>
                <input
                  className="h-8 p-1 border border-psecondary rounded-md"
                  placeholder="***"
                  onChange={handleChange}
                />
              </div>
            </form>
          ) : (
            <>
              <span>Password</span>
              <div className="flex items-center h-8 p-1 text-lg rounded-md">
                <p>
                  {"***"}
                  <span className="material-symbols-rounded text-xs align-top text-pprimary">
                    edit
                  </span>
                </p>
              </div>
            </>
          )} */}
        </div>
        <button className="w-fit py-1 px-2 rounded-l-full rounded-r-full text-pprimary bg-green-600">SAVE</button>
      </form>
    </section>
  );
};

export default ProfileCard;

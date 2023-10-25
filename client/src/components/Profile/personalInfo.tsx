import { UserData } from "../../utils/customClientTypes";
import { motion } from "framer-motion";

interface PersonalProps {
  userData: UserData | null;
  setIsEditForm: (setIsEditForm: boolean) => void;
  handleBackButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const PersonalInfo = ({
  userData,
  setIsEditForm,
  handleBackButton,
}: PersonalProps) => {

  return (
    <>
      <section className="flex flex-col flex-grow w-full font-medium text-plight">
        <div className="relative flex flex-col flex-grow justify-between items-center px-2 py-4">
          <div className="w-full space-y-4 my-4 px-4 text-lg ">
            {/* User Name */}
            <div className="flex flex-col w-full bg-pdark border-b-2 border-psecondary">
              <span className="material-symbols-rounded text-sm">person</span>
              <p className="p-1 pl-4 rounded-md">
                {userData?.firstName || "Hello. "}{" "}
                {userData?.lastName || "My name is Kevin"}
              </p>
            </div>

            {/* User Email */}
            <div className="flex flex-col w-full bg-pdark border-b-2 border-psecondary">
              <span className="material-symbols-rounded text-sm">email</span>
              <p className="p-1 pl-4 rounded-md">{userData?.email}</p>
            </div>

            {/* User Phone */}
            <div className="flex flex-col w-full bg-pdark border-b-2 border-psecondary">
              <span className="material-symbols-rounded text-sm">call</span>
              {userData?.phone ? (
                <p className="p-1 pl-4 rounded-md">{userData.phone}</p>
              ) : (
                <p className="p-1 pl-4 rounded-md opacity-75">Phone Number</p>
              )}
            </div>

            {/* User Address */}
            <div className="flex flex-col w-full bg-pdark border-b-2 border-psecondary">
              <span className="material-symbols-rounded text-sm">home</span>
              {userData?.street1 || userData?.city || userData?.state ? (
                <>
                  <p className="p-1 pl-4 rounded-md">{userData?.street1}</p>
                  {userData?.street2 && (
                    <p className="p-1 pl-4 rounded-md">{userData?.street2}</p>
                  )}
                  <p className="p-1 pl-4 rounded-md">
                    {userData?.city}
                    {", "}
                    {userData?.state} {userData?.postalCode}
                  </p>
                </>
              ) : (
                <>
                  <p className="p-1 pl-4 rounded-md opacity-75">
                    Physical Address
                  </p>
                </>
              )}
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
              onClick={() => setIsEditForm(true)}
            >
              EDIT
            </motion.button>
          </div>
        </div>
      </section>
      <div className="w-full">
        <motion.button
          id="back"
          type="button"
          className="rounded-full"
          onClick={handleBackButton}
        >
          <span className="material-symbols-rounded mx-2 text-light text-4xl text-center align-middle">
            chevron_left
          </span>
        </motion.button>
      </div>
    </>
  );
};

export default PersonalInfo;

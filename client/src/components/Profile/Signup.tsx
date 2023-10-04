import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { ADD_USER } from "../../utils/mutations";

interface SignupProps {
  handleLoginDisplay: () => void;
}

function Signup({ handleLoginDisplay }: SignupProps) {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Create logic to error if password/confirm don't match

    const mutationResponse = await addUser({
      variables: {
        firstName: formState.firstName,
        lastName: formState.lastName,
        email: formState.email,
        password: formState.password,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });

    //Create logic to display message if password/confirm don't match
  };

  return (
    <section className="flex flex-col w-80 mt-20 py-3 text-center text-pdark rounded-2xl bg-plight z-10">
      <h2 className="text-2xl font-semibold">Signup</h2>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col justify-center items-center w-full mt-4"
      >
        <div className="flex-col space-y-3 mx-10">
          <input
            className="h-8 rounded-md px-2 w-full"
            placeholder="First"
            name="firstName"
            type="firstName"
            id="firstName"
            onChange={handleChange}
          />
          <input
            className="h-8 rounded-md px-2 w-full"
            placeholder="Last"
            name="lastName"
            type="lastName"
            id="lastName"
            onChange={handleChange}
          />
          <input
            className="h-8 rounded-md px-2 w-full"
            placeholder="Email"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
          <input
            className="h-8 rounded-md px-2 w-full"
            placeholder="Password"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
          <input
            className="h-8 rounded-md px-2 w-full"
            placeholder="Confirm Password"
            name="confirm"
            type="confirm"
            id="cnf"
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-center items-center w-2/3 h-8 mt-3 rounded-full bg-psecondary">
          <button
            className="w-full font-bold text-pprimary pointer-events-auto"
            type="submit"
          >
            Signup
          </button>
        </div>
      </form>
      <div className="flex text-left mt-5 mx-3 text-xs pointer-events-none">
        <p>
          ← Back to
          <span
            className="font-bold text-lg text-pprimary pointer-events-auto cursor-pointer"
            onClick={handleLoginDisplay}
          >
            Login
          </span>
        </p>
      </div>
    </section>
  );
}

export default Signup;

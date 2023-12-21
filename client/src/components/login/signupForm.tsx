import React, { useState, useRef, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import { GraphQLError } from "graphql";
import Auth from "../../utils/auth";

interface SignupProps {
  handleLoginDisplay: () => void;
}

function Signup({ handleLoginDisplay }: SignupProps) {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [addUser, { error }] = useMutation(ADD_USER);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [errorMsg, setErrorMsg] = useState<String | null>(null);
  const [isConfirmMatch, setIsConfirmMatch] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const minChars = 8;
  const numOfCharacters = useRef(minChars);

  useEffect(() => {
    if (errorMsg) {
      setTimeout(() => {
        setErrorMsg(null);
      }, 5000);
    }
  }, [errorMsg]);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formState.password !== formState.confirmPassword) {
      setErrorMsg("Passwords don't match");
      return;
    }

    try {
      const userData = await addUser({
        variables: {
          firstName: formState.firstName,
          lastName: formState.lastName,
          email: formState.email,
          password: formState.password,
        },
      });

      Auth.login(
        userData.data.addUser.token,
        userData.data.addUser.user.username
      );
    } catch (err: any) {
      // TODO Work on proper error display
      console.log(err);
      if (err.name === "ApolloError") {
        setErrorMsg(err.message.split(":").pop().trim());
      } else {
        setErrorMsg(err.message);
      }
    }

    // Reset field values and password match state
    if (formRef.current) formRef.current.reset();
    setIsConfirmMatch(false);
  };

  // Handle change to the form fields
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });

    // monitor confirm and password for changes to update visual indicators
    if (name === "confirmPassword") {
      setIsConfirmMatch(value.length >= 8 && formState.password === value);
    }

    if (name === "password") {
      if (value.length >= 8) setIsPasswordMatch(true);
      else setIsPasswordMatch(false);

      numOfCharacters.current = minChars - value.length;
    }
  };

  return (
    <section className="flex flex-col w-80 mt-20 py-3 text-center text-pdark rounded-2xl bg-plight z-10">
      <h2 className="text-2xl font-semibold">Signup</h2>
      <div className="mx-10">
        <form
          id="signup-form"
          ref={formRef}
          className={`flex flex-col justify-center items-center w-full space-y-3`}
          onSubmit={handleFormSubmit}
        >
          {errorMsg ? (
            <div className="mt-1">
              <p className="font-medium text-xs text-red-500">{errorMsg}</p>
            </div>
          ) : (
            <div className="mt-1 invisible font-medium text-xs text-red-500">
              error
            </div>
          )}

          <div className="flex flex-row space-x-1">
            <input
              className="h-8 text-base rounded-md px-2 w-full"
              placeholder="First"
              name="firstName"
              type="text"
              id="firstName"
              onChange={handleChange}
              required
            />
            <input
              className="h-8 text-base rounded-md px-2 w-full"
              placeholder="Last"
              name="lastName"
              type="text"
              id="lastName"
              onChange={handleChange}
              required
            />
          </div>

          <input
            className="h-8 rounded-md px-2 w-full"
            placeholder="Email"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
            required
          />

          <input
            className="h-8 rounded-md px-2 w-full"
            placeholder="Password"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
            required
          />
          <span className={`relative w-full text-xs text-primary`}>
            At least {isPasswordMatch ? "✔" : `${numOfCharacters.current}`}{" "}
            characters
          </span>
          <span
            className={`relative w-full ${
              isConfirmMatch ? "checkmark" : "xmark"
            }`}
          >
            <input
              className="h-8 rounded-md px-2 w-full"
              placeholder="Confirm"
              name="confirmPassword"
              type="password"
              id="cnf"
              onChange={handleChange}
              required
            />
          </span>
          <div className="flex justify-center items-center w-2/3 h-8 mt-3 rounded-full bg-psecondary">
            <button
              className="w-full font-bold text-pprimary pointer-events-auto"
              type="submit"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
      <div className="flex text-left mt-5 mx-3 text-xs pointer-events-none">
        <p>
          ← Back to{" "}
          <span
            className="font-bold text-base text-pprimary pointer-events-auto cursor-pointer"
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

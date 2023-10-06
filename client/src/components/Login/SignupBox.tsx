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
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [addUser, { error }] = useMutation(ADD_USER);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [errorMsg, setErrorMsg] = useState<String | null>(null);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);

  useEffect(() => {
    if (errorMsg) {
      setTimeout(() => {
        setErrorMsg(null);
      }, 5000);
    }
  }, [errorMsg]);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (formState.password !== formState.confirmPassword)
        setErrorMsg("Passwords don't match");
      else {
        const mutationResponse = await addUser({
          variables: {
            username: formState.username,
            email: formState.email,
            password: formState.password,
          },
        });
      Auth.login(
        mutationResponse.data.login.token,
        mutationResponse.data.login.user.username
      );
      }
    } catch (err: any) {
      if (err.name === "ApolloError") {
        console.log({err})
        const errorMsg = err.message.split(":").pop().trim();
        setErrorMsg(errorMsg);
      } else {
        setErrorMsg(err.message);
      }
    }

    if (formRef.current) formRef.current.reset();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });

    //Create logic to display message if password/confirm don't match
    if (value.length < 8) {
      setIsPasswordMatch(false);
    } else {
      if (name === "confirmPassword")
        setIsPasswordMatch(formState.password === value);
      if (name === "password")
        setIsPasswordMatch(formState.confirmPassword === value);
    }
  };

  return (
    <section className="flex flex-col w-80 mt-20 py-3 text-center text-pdark rounded-2xl bg-plight z-10">
      <h2 className="text-2xl font-semibold">Signup</h2>
      <div className="mx-10">
        <form
          id="signup_form"
          ref={formRef}
          onSubmit={handleFormSubmit}
          className={`flex flex-col justify-center items-center w-full space-y-3`}
        >
          {errorMsg ? (
            <div className="mt-1">
              <p className="font-medium text-xs text-red-500">{errorMsg}</p>
            </div>
          ) : (
            // Space placeholder for error text
            <div className="mt-1 invisible font-medium text-xs text-red-500">
              error
            </div>
          )}
          <input
            className="h-8 text-base rounded-md px-2 w-full"
            placeholder="Username"
            name="username"
            type="username"
            id="lastName"
            onChange={handleChange}
            required
          />
          <input
            className="h-8 rounded-md px-2 w-full"
            placeholder="Email"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
            required
          />
          <span
            className={`test relative w-full ${
              isPasswordMatch ? "checkmark" : "xmark"
            }`}
          >
            <input
              className="h-8 rounded-md px-2 w-full"
              placeholder="Password"
              name="password"
              type="password"
              id="pwd"
              onChange={handleChange}
              required
            />
          </span>
          <span
            className={`test relative w-full ${
              isPasswordMatch ? "checkmark" : "xmark"
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
              disabled={!isPasswordMatch}
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
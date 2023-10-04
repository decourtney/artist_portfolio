import React, { FormEvent, FormEventHandler, useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

interface LoginProps {
  handleLoginDisplay: () => void;
}

function Login({ handleLoginDisplay }: LoginProps) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <section className="flex flex-col w-80 mt-20 py-3 text-center text-pdark rounded-2xl bg-plight z-10">
      <h2 className="text-2xl font-semibold">Login</h2>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col justify-center items-center w-full"
      >
        {error ? (
          <div className="my-2">
            <p className="font-medium text-xs text-red-500">
              The provided credentials are incorrect
            </p>
          </div>
        ) : (
          // Space placeholder for error text
          <div className="my-2 invisible font-medium text-xs text-red-500">
            error
          </div>
        )}
        <div className="flex-col space-y-3 mx-10">
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
        </div>
        <div className="flex justify-center items-center w-2/3 h-8 mt-3 rounded-full bg-psecondary">
          <button
            className="w-full font-bold text-pprimary pointer-events-auto"
            type="submit"
          >
            LOGIN
          </button>
        </div>
      </form>

      <div
        className="flex flex-col justify-center items-center mt-5 text-xs "
        // onClick={() => handleLoginDisplay}
      >
        <p>Don't have an account?</p>
        <span
          className="w-fit font-bold text-lg text-pprimary pointer-events-auto cursor-pointer z-10"
          onClick={() => handleLoginDisplay}
        >
          Signup
        </span>
      </div>
    </section>
  );
}

export default Login;

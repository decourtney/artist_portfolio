import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

interface LoginProps {
  handleLoginDisplay: () => void;
}

function Login({ handleLoginDisplay }: LoginProps) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [loginUserMutation] = useMutation(LOGIN_USER);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [errorMsg, setErrorMsg] = useState<String | null>(null);

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
      const mutationResponse = await loginUserMutation({
        variables: { ...formState },
      });

      Auth.login(
        mutationResponse.data.login.token,
        mutationResponse.data.login.user.username
      );
    } catch (err: any) {
      console.log(err)
      if (err.name === "ApolloError") {
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
  };

  return (
    <section className="flex flex-col w-80 mt-20 py-3 text-center text-pdark rounded-2xl bg-plight z-10">
      <h2 className="text-2xl font-semibold">Login</h2>
      <div className="mx-10">
        <form
          ref={formRef}
          onSubmit={handleFormSubmit}
          className="flex flex-col justify-center items-center w-full space-y-3"
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
          {/* <div className="flex-col space-y-3 mx-10"> */}
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
          {/* </div> */}
          <div className="flex justify-center items-center w-2/3 h-8 mt-3 rounded-full bg-psecondary">
            <button
              className="w-full font-bold text-pprimary pointer-events-auto"
              type="submit"
            >
              LOGIN
            </button>
          </div>
        </form>
      </div>
      <div
        className="flex flex-col justify-center items-center mt-5 text-xs pointer-events-none"
        // onClick={() => handleLoginDisplay}
      >
        <p>Don't have an account?</p>
        <span
          className="w-fit font-bold text-lg text-pprimary pointer-events-auto cursor-pointer"
          onClick={handleLoginDisplay}
        >
          Signup
        </span>
      </div>
    </section>
  );
}

export default Login;

import { useState } from "react";
import LoginBox from "../components/login/loginForm";
import SignupBox from "../components/login/signupForm";

const Login = () => {
  const [isShowLogin, setIsShowLogin] = useState(true);

  const handleLoginDisplay = () => {
    setIsShowLogin(!isShowLogin);
  };

  return (
    <section className="flex flex-col flex-grow bg-pdark">
      <div
        id="profile_card"
        className="profile_hero_image relative flex flex-col justify-center items-center"
      >
        {isShowLogin ? (
          <LoginBox handleLoginDisplay={handleLoginDisplay} />
        ) : (
          <SignupBox handleLoginDisplay={handleLoginDisplay} />
        )}
      </div>
    </section>
  );
};

export default Login;

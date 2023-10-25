// import the hooks
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//import the required components
import LoginForm, {
  LoginComponent,
} from "../components/login_components/login";
import SignUpComponent, {
  SignUpForm,
} from "../components/login_components/signup";

const LoginPage: React.FC = () => {
  const [mode, setMode] = useState("login");

  const navigate = useNavigate();

  // function for switching btw login and sign up form
  const handleMode = (mode: string) => {
    setMode(mode);
  };

  useEffect(() => {
    isLoggedIn();
  });

  // function for checking the user is logged in or out
  const isLoggedIn = () => {
    const token = localStorage.getItem("token"); //collecting the token from the local storage
    if (token) {
      navigate("/");
    }
  };
  return (
    <>
      <div className="w-screen h-screen ">
        <div className=" flex h-full w-full">
          <div
            className={` ${
              mode === "login" ? "w-full lg:w-70%" : "lg:w-[30%]"
            }`}
          >
            {mode === "login" ? (
              <LoginForm handleMode={handleMode} />
            ) : (
              <LoginComponent handleMode={handleMode} />
            )}
          </div>
          <div
            className={` ${
              mode === "signUp" ? "w-full lg:w-70%" : "lg:w-[30%]"
            }`}
          >
            {mode === "signUp" ? (
              <SignUpForm handleMode={handleMode} />
            ) : (
              <SignUpComponent handleMode={handleMode} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

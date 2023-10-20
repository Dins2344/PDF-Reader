import { useState } from "react";
import LoginForm, {
  LoginComponent,
} from "../components/login_components/login";
import SignUpComponent, {
  SignUpForm,
} from "../components/login_components/signup";

const LoginPage: React.FC = () => {
  const [mode, setMode] = useState("login");
  const handleMode = (mode: string) => {
    setMode(mode);
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

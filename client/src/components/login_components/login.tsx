import { useState } from "react";
import { userLogin } from "../../api/login";
import { useNavigate } from "react-router-dom";
interface ChildProps {
  handleMode: (mode: string) => void;
}
const LoginForm: React.FC<ChildProps> = (props: ChildProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async () => {
    const data = { email, password };
    if (!data.email.match(/^[\w\.-]+@[\w\.-]+\.\w+/)) {
      setError("email is not valid");
    } else {
      const res = await userLogin(data);
      console.log(res);
      if (!res.ok) {
        setError(res.message);
      } else {
        setError("");
        localStorage.setItem('token', res.response)
        navigate('/')
      }
    }
  };

  return (
    <>
      <div className=" flex flex-col w-full h-full items-center justify-center px-10">
        <h4 className=" text-3xl font-semibold lg:text-5xl lg:font-bold mb-10 lg:mb-24 text-center">
          Login to Your Account
        </h4>
        {/* {error && <p className="text-red-500 mb-1">{error}</p>} */}
        <p className={`text-red-500 mb-1 ${!error && "hidden"}`}>{error}</p>
        <input
          placeholder="Email"
          className=" rounded-lg bg-green-100 w-full lg:w-[60%] h-10 px-2 mb-6"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <input
          placeholder="Password"
          className=" rounded-lg bg-green-100 w-full lg:w-[60%] h-10 px-2"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <button
          onClick={() => {
            handleSubmit();
          }}
          className=" w-[70%] lg:w-[30%] h-10 lg:h-14 bg-[#27b397] rounded-full mt-6 hover:bg-[#38ba8c] transition duration-300 ease-in-out text-xl lg:text-2xl font-semibold text-white"
        >
          Login
        </button>

        <p className="lg:hidden mt-3">
          Don't have an account..?{" "}
          <span
            className="text-blue-500 underline cursor-pointer"
            onClick={() => props.handleMode("signUp")}
          >
            click here
          </span>
        </p>
      </div>
    </>
  );
};

export default LoginForm;

export const LoginComponent: React.FC<ChildProps> = (props: ChildProps) => {
  return (
    <div className=" hidden lg:flex loginPageSmall w-full h-full  flex-col justify-center items-center">
      <h3 className="text-4xl font-bold text-white mb-4 animate-pulse text-center">
        Already Registered?
      </h3>
      <h2 className="text-2xl font-medium text-white text-center">
        Login with your account
      </h2>
      <button
        onClick={() => {
          props.handleMode("login");
        }}
        className="w-24 h-10 bg-[#27b397] rounded-full mt-6 hover:bg-[#38ba8c] transition duration-300 ease-in-out text-2xl font-semibold text-white"
      >
        Login
      </button>
    </div>
  );
};

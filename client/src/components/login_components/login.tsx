import { useState } from "react";
import { userLogin } from "../../api/login";

const LoginComponents: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
      }
    }
  };

  return (
    <>
      <div className=" flex flex-col w-full h-full items-center justify-center">
        <h4 className="text-5xl font-bold mb-24">Login to Your Account</h4>
        {error && <p className="text-red-500 mb-1">{error}</p>}
        <input
          placeholder="Email"
          className=" rounded-lg bg-green-100 w-[60%] h-10 px-2 mb-6"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <input
          placeholder="Password"
          className=" rounded-lg bg-green-100 w-[60%] h-10 px-2"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <button
          onClick={() => {
            handleSubmit();
          }}
          className="w-[30%] h-14 bg-[#27b397] rounded-full mt-6 hover:bg-[#38ba8c] transition duration-300 ease-in-out text-2xl font-semibold text-white"
        >
          Login
        </button>
      </div>
    </>
  );
};

export default LoginComponents;

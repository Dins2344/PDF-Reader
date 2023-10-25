import { useNavigate } from "react-router-dom";
import SplitPDF from "../components/body_components/splitPDF";
import { useEffect, useState } from "react";

const HomePage: React.FC = () => {
  const [login,setLogin] = useState(false)
   const navigate = useNavigate();
   useEffect(() => {
     isLoggedIn();
   }, []);
   const isLoggedIn = () => {
     const token = localStorage.getItem("token");
     if (!token) {
      setLogin(false)
     } else {
       setLogin(true)
     }
   };
  return (
    <>
      <div className="pt-16 md:pt-20 w-full min-h-screen">
        {login ? (
          <SplitPDF />
        ) : (
          <h3 className="text-center mt-20 md:text-3xl text-xl px-10">
              You seem to be logged out. Click <span onClick={() => {
                navigate('/login')
            }} className="underline text-blue-500 cursor-pointer">here</span> to login
          </h3>
        )}
      </div>
    </>
  );
};

export default HomePage;

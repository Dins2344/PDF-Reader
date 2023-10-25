
import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";



function Spinner() {
    const[isLoading,setIsLoading] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        return (() => {
            setIsLoading(false)
        })
    },[])
  return (
    <div className="w-full min-h-screen -mt-16 md:-mt-20 flex items-center justify-center bg-gray-300 absolute z-50 bg-opacity-70">
      <ClipLoader size={60} color={"#27b397"} loading={isLoading} />
    </div>
  );
}

export default Spinner;
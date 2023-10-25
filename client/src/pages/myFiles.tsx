// import the hooks
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import the myFiles component
import MyFilesComponent from "../components/body_components/myFiles";

const MyFilesPage: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    isLoggedIn()
  }, [])
  
  //function for checking the user is logged in or out
  const isLoggedIn = () => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
}
    return (
      <>
            <div className="pt-16 md:pt-20 w-full min-h-screen">
                <MyFilesComponent />
            </div>
      </>
    );
}

export default MyFilesPage;
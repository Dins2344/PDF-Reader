
import { useEffect } from "react";
import MyFilesComponent from "../components/body_components/myFiles";
import { useNavigate } from "react-router-dom";

const MyFilesPage: React.FC = () => {
  const navigate = useNavigate()
  useEffect(() => {
    isLoggedIn()
  },[])
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
//import the hooks
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

//import the menubar icon and cross icon
import { Menu, X } from "lucide-react";

//import the logo from the public folder
import logo from "/logos/PDF Reader1.png";

const NavBar: React.FC = () => {
  return (
    <header className="w-full h-auto absolute top-0 flex flex-wrap justify-between items-center bg-white py-2 px-5 md:px-10 border-b-2 z-50">
      <Logo />
      <NavMenu />
    </header>
  );
};

export default NavBar;

const Logo = () => {
  return (
    <div className="">
      <img src={logo} className=" w-32 md:w-48 md:h-[65px]"></img>
    </div>
  );
};

const NavLinks: React.FC = () => {
  const [login, setLogin] = useState(false);
  useEffect(() => {
    isLoggedIn();
  });

  // function for checking the user is logged in or out
  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  //function for log out the user
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    // conditionally displaying nav menus 
    <>
      {login ? (
        <>
          <NavLink className="ms-4" to={"/"}>
            Home
          </NavLink>
          <NavLink className="ms-4" to={"/my-files"}>
            My files
          </NavLink>
          <NavLink className="ms-4" onClick={handleLogout} to={""}>
            Log out
          </NavLink>
        </>
      ) : (
        <NavLink className="ms-4" to={"/login"}>
          Log in
        </NavLink>
      )}
    </>
  );
};

const NavMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  //function for handling the open and closing of the mobile navbar
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="w-1/3 flex justify-end">
        <div className="hidden md:flex justify-end">
          <NavLinks />
        </div>
        <div className="md:hidden ">
          <button onClick={handleOpen}>{isOpen ? <X /> : <Menu />}</button>
        </div>
      </nav>

      {isOpen && (
        <div className="flex basis-full flex-col items-center ">
          <NavLinks />
        </div>
      )}
    </>
  );
};

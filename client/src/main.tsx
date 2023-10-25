//import browser router
import { createBrowserRouter } from "react-router-dom";

// import all the pages
import App from "./App.tsx";
import LoginPage from "./pages/login.tsx";
import NavBar from "./components/common_components/navBar.tsx";
import HomePage from "./pages/home.tsx";
import MyFilesPage from "./pages/myFiles.tsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <>
        <h4>error</h4>
      </>
    ),
    children: [
      {
        path: "/",
        element: (
          <>
            <NavBar />
            <HomePage />
          </>
        ),
      },
      {
        path: "/login",
        element: (
          <>
            <NavBar />
            <LoginPage />
          </>
        ),
      },
      {
        path: "/my-files",
        element: (
          <>
            <NavBar />
            <MyFilesPage />
          </>
        ),
      },
    ],
  },
]);

export default appRouter;

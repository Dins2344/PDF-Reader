import App from "./App.tsx";
import LoginPage from "./pages/login.tsx";


import { createBrowserRouter } from "react-router-dom";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <App />
    ),
    errorElement: (
      <>
        <h4>error</h4>
      </>
    ),
    children: [
      {
        path: '/login',
        element: (
          <LoginPage />
        )
      }
    ]
  },
]);

export default appRouter;

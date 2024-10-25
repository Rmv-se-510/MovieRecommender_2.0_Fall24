import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./Login/LoginPage";
import RegisterPage from "./Register/RegisterPage";
export default function AppRouter(props) {
  const router = createBrowserRouter([
    {
      "path": "/",
      element:
        !props.loggedIn ?
          (<div className="reg-login">
            <RegisterPage />
            <LoginPage setLoggedIn={props.setLoggedIn} />
          </div>) : (<div />)
    }
  ])
  return <RouterProvider router={router} />
}

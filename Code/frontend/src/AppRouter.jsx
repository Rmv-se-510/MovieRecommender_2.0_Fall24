import React from "react";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import LoginPage from "./Login/LoginPage";
import RegisterPage from "./Register/RegisterPage";
import HomePage from "./Home/Home";
import AccountPage from "./Account/AccountPage";

export default function AppRouter(props) {
  const router = createBrowserRouter([
    {
      "path": "/",
      element:
        !props.loggedIn ?
          (<div className="reg-login">
            <RegisterPage />
            <LoginPage setLoggedIn={props.setLoggedIn} />
          </div>) : (
            <Navigate to="/homepage" />)
    },
    {
      "path": "/homepage",
      element:
        props.loggedIn ?
          (<div className="homepage">
            <HomePage />
          </div>) : (<Navigate to="/" />)
    },
    {
      "path": "/account",
      element:
        props.loggedIn ?
          (<div className="account">
            <AccountPage />
          </div>) : (<Navigate to="/" />)
    }
  ])
  return <RouterProvider router={router} />
}

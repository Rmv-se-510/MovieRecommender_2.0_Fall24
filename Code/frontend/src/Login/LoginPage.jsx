import { Button, Checkbox, FormControl, FormHelperText, InputLabel, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import './LoginPage.css';
import hashPassword from "../utils/hash";
import { login_api_call } from "../utils/api";
import { generateAlert } from "../Register/RegisterPage";
// import { useNavigate } from "react-router-dom";

export default function LoginPage(props) {
  const [userData, setUserData] = useState({ email: { value: "", error: undefined }, password: { value: "", error: undefined }, rememberMe: false });
  const [alert, setAlert] = useState({ visible: false, success: "", error: "" })
  // const navigate = useNavigate();

  const loginUser = async () => {
    const hashedPassword = await hashPassword(userData.password.value, props.isTest);
    const payload = { email: userData.email.value, password: hashedPassword }
    let resp = await login_api_call(payload)
    if (resp?.error) {
      setAlert({ ...alert, visible: true, error: resp.error })
    } else {
      if (userData.rememberMe) {
        //TODO persist state?
      }
      // setAlert({ ...alert, visible: true, success: resp.message })
      props.setLoggedIn(true)
    }
  }

  return (
    <section className="login-section" data-testid="login-section">
      <main style={{ paddingTop: '100px' }}></main>
      <Typography color="primary" variant="h6">Already binging with us? Login below!</Typography>
      <form className="login-form">
        <InputLabel htmlFor="login-email">Email</InputLabel>
        <TextField data-testid="login-email" aria-describedby="login-email-helper" type="text" required={true} onChange={(e) => {
          // let data = emailValidator(e.target.value)
          setUserData({ ...userData, email: { ...userData.email, value: e.target.value } });
        }} value={userData.email.value} error={userData.email.error != undefined} />
        {userData.email.error && <FormHelperText error={true}>{userData.email.error}</FormHelperText>}
        <InputLabel htmlFor="login-pass">Password</InputLabel>
        <TextField data-testid="login-pass" aria-describedby="login-pass-helper" type="password" required={true} onChange={(e) => {
          // let data = passwordValidator(e.target.value, true)
          setUserData({ ...userData, password: { ...userData.password, value: e.target.value } });
        }} value={userData.password.value} error={userData.password.error != undefined} />
        {userData.password.error && <FormHelperText error={true}>{userData.password.error}</FormHelperText>}
        <FormControl className="remember-section">
          <Checkbox data-testid="rememberme" size="small" onClick={() => {
            setUserData({ ...userData, rememberMe: !userData.rememberMe })
          }} checked={userData.rememberMe} disableRipple />
          <Typography className="remember-checkbox-text">Keep me signed in</Typography>
        </FormControl>
        <Button data-testid="login" className="submit" variant="contained" onClick={loginUser} disableRipple={true}>Login</Button>
        {alert.visible && generateAlert("login-alert", alert)}
      </form>
    </section>
  )
}

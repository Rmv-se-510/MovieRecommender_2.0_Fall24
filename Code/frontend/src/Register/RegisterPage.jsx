import React, { useState } from "react";
import { Alert, Button, FormHelperText, InputLabel, TextField, Typography } from "@mui/material";
import "./RegisterPage.css";
import { userNameValidator, emailValidator, passwordValidator, confirmPasswordValidator } from "../utils/validators";
import hashPassword from "../utils/hash";
import { register_api_call } from "../utils/api";
import { CheckCircleOutline, ErrorOutline } from "@mui/icons-material";

export const generateAlert = (id, alert) => {
  if (alert?.success) {
    return <Alert severity="success" id={id} variant="outlined" icon={<CheckCircleOutline fontSize="small" />}> {alert.success}</Alert>
  } else {
    return <Alert severity="error" variant="outlined" id={id} icon={<ErrorOutline fontSize="small" />}> {alert.error}</Alert>
  }
}

export default function RegisterPage() {
  const [userData, setUserData] = useState({
    username: { value: "", error: undefined }, email: { value: "", error: undefined }, password: { value: "", error: undefined }, confirmPassword: { value: "", error: undefined }
  })

  const [alert, setAlert] = useState({ visible: false, success: "", error: "" })

  const isValid = (obj) => {
    return obj.value !== "" && obj.error === undefined
  }

  const registerUser = async () => {
    let username = userNameValidator(userData.username.value)
    let email = emailValidator(userData.email.value)
    let password = passwordValidator(userData.password.value, false)
    let confirmPassword = confirmPasswordValidator(userData.confirmPassword.value, userData.password.value)
    setUserData({ username, email, password, confirmPassword })
    let noErrors = isValid(username) && isValid(email) && isValid(password) && isValid(confirmPassword)
    if (noErrors) {
      const passwordHash = await hashPassword(password.value)
      const payload = { username: username.value, email: email.value, password: passwordHash }
      let resp = await register_api_call(payload)
      if (resp?.error) {
        setAlert({ ...alert, error: resp.error, visible: true })
      } else {
        setAlert({ ...alert, success: resp.message, visible: true })
        // console.log("Registered user successfully")
      }
      // setTimeout(() => setAlert({ ...alert, visible: false }), 2000)
    }
  }


  return (
    <section className="register-section">
      <Typography color="primary" variant="h6"> New User? Sign up below and start binging </Typography>
      <form className="register-form">
        <InputLabel htmlFor="username">Username</InputLabel>
        <TextField id="username" aria-describedby="username-helper" type="text" required={true} error={userData.username.error != undefined} onChange={(e) => {
          let data = userNameValidator(e.target.value)
          setUserData({ ...userData, username: data });
        }} />
        {userData.username.error && <FormHelperText error={true}>{userData.username.error}</FormHelperText>}
        <InputLabel htmlFor="email">Email</InputLabel>
        <TextField id="email" aria-describedby="email-helper" type="email" required={true} onChange={(e) => {
          let data = emailValidator(e.target.value)
          setUserData({ ...userData, email: data });
        }} value={userData.email.value} error={userData.email.error != undefined} />
        {userData.email.error && <FormHelperText error={true}>{userData.email.error}</FormHelperText>}
        <InputLabel htmlFor="pass">Password</InputLabel>
        <TextField id="pass" aria-describedby="pass-helper" type="password" required={true} onChange={(e) => {
          let data = passwordValidator(e.target.value, false)
          setUserData({ ...userData, password: data });
        }} value={userData.password.value} error={userData.password.error != undefined} />
        {userData.password.error && <FormHelperText error={true}>{userData.password.error}</FormHelperText>}
        <InputLabel htmlFor="confirm-pass">Confirm Password</InputLabel>
        <TextField id="confirm-pass" aria-describedby="confirm-pass-helper" type="password" required={true} onChange={(e) => {
          let data = confirmPasswordValidator(e.target.value, userData.password.value)
          setUserData({ ...userData, confirmPassword: data });
        }} value={userData.confirmPassword.value} error={userData.confirmPassword.error != undefined} />
        {userData.confirmPassword.error && <FormHelperText error={true}>{userData.confirmPassword.error}</FormHelperText>}
        <Button className="submit" variant="contained" onClick={registerUser} disableRipple={true}> Register</Button>
        {alert.visible && generateAlert("register-alert", alert)}
      </form>
    </section>
  )
}

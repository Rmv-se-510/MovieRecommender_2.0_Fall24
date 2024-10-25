export const userNameValidator = (value) => {
  let err = value == "" ? `Username cannot be empty. Fill in a username to proceed` : undefined;
  return { value: value, error: err }
}

export const emailValidator = (value) => {
  const emailPat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  const isValid = emailPat.test(value);
  let err = !isValid ? `${value} is not a valid email id. Please use a valid email Id to proceed.` : undefined;
  if (value == "") {
    err = "Please register using an email Id."
  }
  return { value: value, error: err }
}


export const passwordValidator = (value, onlyCheckEmpty) => {
  const passPat = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
  const isValid = !onlyCheckEmpty ? passPat.test(value) : true;
  let err = !isValid ? `Password should be atleast 8 characters long and must contain atleast one special character, number, lower case and upper case character.` : undefined;
  if (value == "") {
    if(onlyCheckEmpty) {
      err = "Please fill in your password to login."
    } else {
      err = "Please use a strong password with atleast 8 characters long and must contain atleast one special character, number, lower case and upper case character to proceed."
    }
  }
  return { value: value, error: err }
}

export const confirmPasswordValidator = (value, expected) => {
  let err = expected != value ? `Passwords do not match` : undefined;
  return { value: value, error: err }
}

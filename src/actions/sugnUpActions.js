import { SIGNUP } from '../constants'

const signupRequest = function signupRequest ({ email, password , phone, first_name, last_name, userType}) {
  return {
    type: SIGNUP.SIGNUP_REQUESTING,
    email,
    password,
    phone,
    first_name,
    last_name,
    userType
  }
}

export default signupRequest
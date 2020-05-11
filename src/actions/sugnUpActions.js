import { SIGNUP } from '../constants'

const signupRequest = function signupRequest ({ email, password , phone, first_name, last_name}) {
  return {
    type: SIGNUP.SIGNUP_REQUESTING,
    email,
    password,
    phone,
    first_name,
    last_name,
  }
}

export default signupRequest
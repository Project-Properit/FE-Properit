import { SIGNUP } from '../constants'

const signupRequest = function signupRequest (all) {
  const { email, password , phone, first_name, last_name, user_type, payment_details} = all
  return {
    type: SIGNUP.SIGNUP_REQUESTING,
    email,
    password,
    phone,
    first_name,
    last_name,
    user_type,
    payment_details
  }
}

export default signupRequest
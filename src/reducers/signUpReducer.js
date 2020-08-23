import {SIGNUP} from "../constants";

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
}

const  signupReducer = (state = initialState, action) =>{
  switch (action.type) {
    case SIGNUP.SIGNUP_REQUESTING:
      return {
        requesting: true,
        successful: false,
        messages: [{ body: 'Signing up...', time: new Date() }],
        errors: [],
      }
      case SIGNUP.SIGNUP_SUCCESS:
      return {
        errors: [],
        messages: [{
          body: `Successfully created account for user`,
          time: new Date(),
        }],
        requesting: false,
        successful: true,
      }

    case SIGNUP.SIGNUP_ERROR:
      return {
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
        messages: [],
        requesting: false,
        successful: false,
      }

    default:
      return state
  }
}

export default signupReducer
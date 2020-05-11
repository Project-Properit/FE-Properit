import {
  LOGIN
} from '../constants'


const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
}

const loginReducer = (state = initialState, action)=> {
  switch (action.type) {
    // Set the requesting flag and append a message to be shown
    case LOGIN.LOGIN_REQUESTING:
      return {
        requesting: true,
        successful: false,
        messages: [{ body: 'Logging in...', time: new Date() }],
        errors: [],
      }

    // Successful?  Reset the login state.
    case LOGIN.LOGIN_SUCCESS:
      return {
        errors: [],
        messages: [],
        requesting: false,
        successful: true,
      }

    // Append the error returned from our api
    // set the success and requesting flags to false
    case LOGIN.LOGIN_ERROR:
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

export default loginReducer
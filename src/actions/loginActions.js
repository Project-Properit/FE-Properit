import { LOGIN } from '../constants'

const loginRequest = function loginRequest(email, password) {
	return {
		type: LOGIN.LOGIN_REQUESTING,
		email,
		password
	}
}

export default loginRequest
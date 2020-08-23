import {
  LOGIN,
} from '../constants'

const logoutAction = () => ({
    type: LOGIN.LOGOUT,
});
const logoutActionNoRedirectToLogin = () => ({
    type: LOGIN.LOGOUT_NO_REDIRECT,
});

// Since it's the only one here
export { logoutAction, logoutActionNoRedirectToLogin}
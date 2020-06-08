import {USER} from '../constants'
import {createFormAction} from "redux-form-saga";

const setUser = userObject => ({
    type: USER.LOAD_SUCCESS,
    userObject
});

const loadUser = (userId) => ({
    type: USER.LOAD,
    userId
});

const clearUsers = () => ({
    type: USER.CLEAR
})

const setError = error => ({
    type: USER.LOAD_FAIL,
    error,
});


export {
    setUser,
    loadUser,
    setError,
    clearUsers
};

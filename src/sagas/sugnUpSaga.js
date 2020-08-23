import {call, put, takeLatest} from 'redux-saga/effects'
import {SIGNUP} from '../constants'
import {handleApiErrors} from '../lib/api-errors'
import {push} from "react-router-redux";

const signupUrl = `${window._env_.REACT_APP_API_URL}/register`

function signupApi(email, password, phone, first_name, last_name, is_owner, is_tenant, payment_details) {

    return fetch(signupUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password, phone, first_name, last_name, is_owner, is_tenant, payment_details}),
    })
        .then(handleApiErrors) // we'll make this in a second
        .then(response => response.json())
        .then(json => json)
        .catch((error) => {
            throw error
        })
}

function* signupFlow(action) {
    try {
        const {email, password, phone, first_name, last_name, user_type, payment_details} = action
        const is_owner = user_type === 'owner'
        const is_tenant = user_type === 'tenant'
        const response = yield call(signupApi, email, password, phone, first_name, last_name, is_owner, is_tenant, payment_details)
        yield put({type: SIGNUP.SIGNUP_SUCCESS, response})
        yield put(push('/login'));
    } catch (error) {
        yield put({type: SIGNUP.SIGNUP_ERROR, error})
    }
}

function* signupWatcher() {
    yield takeLatest(SIGNUP.SIGNUP_REQUESTING, signupFlow)
}

export default signupWatcher
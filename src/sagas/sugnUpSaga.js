import {call, put, takeLatest} from 'redux-saga/effects'
import {SIGNUP} from '../constants'
import {handleApiErrors} from '../lib/api-errors'
import {push} from "react-router-redux";

// The url derived from our .env file
const signupUrl = `${window._env_.REACT_APP_API_URL}/register`

function signupApi(email, password, phone, first_name, last_name, is_owner, is_tenant) {
    // call to the "fetch".  this is a "native" function for browsers
    // that's conveniently polyfilled in create-react-app if not available
    return fetch(signupUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password, phone, first_name, last_name, is_owner, is_tenant}),
    })
        .then(handleApiErrors) // we'll make this in a second
        .then(response => response.json())
        .then(json => json)
        .catch((error) => {
            throw error
        })
}

// This will be run when the SIGNUP_REQUESTING
// Action is found by the watcher
function* signupFlow(action) {
    try {
        const {email, password, phone, first_name, last_name, userType} = action
        const is_owner = userType.value === 'owner'
        const is_tenant = userType.value === 'tenant'
        // pulls "calls" to our signupApi with our email and password
        // from our dispatched signup action, and will PAUSE
        // here until the API async function, is complete!
        const response = yield call(signupApi, email, password, phone, first_name, last_name, is_owner, is_tenant)

        // when the above api call has completed it will "put",
        // or dispatch, an action of type SIGNUP_SUCCESS with
        // the successful response.
        yield put({type: SIGNUP.SIGNUP_SUCCESS, response})
        yield put(push('/login'));
    } catch (error) {
        // if the api call fails, it will "put" the SIGNUP_ERROR
        // into the dispatch along with the error.
        yield put({type: SIGNUP.SIGNUP_ERROR, error})
    }
}

// Watches for the SIGNUP_REQUESTING action type
// When it gets it, it will call signupFlow()
// WITH the action we dispatched
function* signupWatcher() {
    // takeLatest() takes the LATEST call of that action and runs it
    // if we we're to use takeEvery, it would take every single
    // one of the actions and kick off a new task to handle it
    // CONCURRENTLY!!!
    yield takeLatest(SIGNUP.SIGNUP_REQUESTING, signupFlow)
}

export default signupWatcher
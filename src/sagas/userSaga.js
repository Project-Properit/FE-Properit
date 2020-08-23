import {actionChannel, call, put, take} from 'redux-saga/effects';

import {setError, setUser} from '../actions/userActions';
import {USER} from '../constants';
import {fetchUser} from '../api';
import {handleApiErrors} from "../lib/api-errors";
import {takeLatest} from "@redux-saga/core/effects";
import signupWatcher from "./sugnUpSaga";

export function* handleUserLoad(action) {
    try {
        const userObject = yield call(fetchUser, action.userId);
        yield put(setUser(userObject));
    } catch (error) {
        yield put(setError(error.toString()));
    }
}

export default function* watchUserLoad(){
    const subChannel = yield actionChannel(USER.LOAD);
    while (true) {
        // Blocking - takes actions from queue.
        const action = yield take(subChannel);
        yield call(handleUserLoad, action)
    }
}

const updateUrl = `${window._env_.REACT_APP_API_URL}/users`

export function* updateApi(userId, email, phone, first_name, last_name, payment_details) {
    return fetch(updateUrl+`/${userId}`, {
        method: 'PUT',
        headers: {
            'x-access-tokens': localStorage.getItem('token') || '',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, phone, first_name, last_name, payment_details}),
    })
        .then(handleApiErrors) // we'll make this in a second
        .then(response => response.json())
        .then(json => json)
        .catch((error) => {
            throw error
        })
}

export function* updateFlow(action) {
    try {
        const {userId,email, phone, first_name, last_name, payment_details} = action
        const response = yield call(updateApi, userId, email, phone, first_name, last_name, payment_details)
        yield put({type: USER.UPDATE_SUCCESS, response, first_name, last_name})
    } catch (error) {
        yield put({type: USER.UPDATE_ERROR, error})
    }
}

export function* updateWatcher() {
    yield takeLatest(USER.UPDATE_REQUESTING, updateFlow)
}

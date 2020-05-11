import {call, put, takeEvery} from 'redux-saga/effects';
import {unsetClient} from "../actions/clientActions";
import {push} from "react-router-redux";
import {
  LOGIN
} from '../constants'

function* logout (action) {
  // dispatches the CLIENT_UNSET action
  yield put(unsetClient())

  // remove our token
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  // redirect to the /login screen
  yield put(push('/login'));

}

export default function* watchLogout() {
    yield takeEvery(LOGIN.LOGOUT, logout);
}

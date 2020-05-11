import { all } from 'redux-saga/effects';

import imagesSaga from './imagesSaga';
import propertiesSaga from "./propertiesSaga";
import documentsSaga from "./documentsSaga";
import signupWatcher from "./sugnUpSaga";
import loginWatcher from "./loginSaga";
import watchLogout from "./logoutSaga";

export default function* rootSaga() {
    yield all([imagesSaga(), propertiesSaga(), documentsSaga(), signupWatcher(), loginWatcher(),watchLogout()]);
}

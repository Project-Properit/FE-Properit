import {all} from 'redux-saga/effects';

import propertiesSaga from "./propertiesSaga";
import documentsSaga from "./documentsSaga";
import signupWatcher from "./sugnUpSaga";
import loginWatcher from "./loginSaga";
import watchLogout from "./logoutSaga";
import {watchPropertyLoad} from "./propertySaga";
import {PropertyUpdateWatcherSaga} from "./propertySaga";
import formActionSaga from 'redux-form-saga';


export default function* rootSaga() {
    yield all([
        propertiesSaga(), documentsSaga(),
        signupWatcher(), loginWatcher(), watchLogout(),
        watchPropertyLoad(),formActionSaga(), PropertyUpdateWatcherSaga()]);
}

import {all} from 'redux-saga/effects';

import propertiesSaga from "./propertiesSaga";
import userSaga from "./userSaga";
import documentsSaga from "./documentsSaga";
import groupsPaymentsSaga, {groupPaymentsCreateWatcherSaga} from "./groupsPaymentsSaga";
import signupWatcher from "./sugnUpSaga";
import loginWatcher from "./loginSaga";
import watchLogout from "./logoutSaga";
import {watchPropertyLoad} from "./propertySaga";
import {PropertyUpdateWatcherSaga} from "./propertySaga";
import formActionSaga from 'redux-form-saga';
import {groupPaymentsDeleteWatcherSaga} from "./groupPaymentsSaga";


export default function* rootSaga() {
    yield all([
        userSaga(),
        propertiesSaga(), documentsSaga(),groupsPaymentsSaga(),groupPaymentsCreateWatcherSaga(),groupPaymentsDeleteWatcherSaga(),
        signupWatcher(), loginWatcher(), watchLogout(),
        watchPropertyLoad(),formActionSaga(), PropertyUpdateWatcherSaga()]);
}

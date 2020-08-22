import {all} from 'redux-saga/effects';

import propertiesSaga from "./propertiesSaga";
import userSaga, {updateWatcher} from "./userSaga";
import documentsSaga from "./documentsSaga";
import groupsPaymentsSaga, {groupPaymentsCreateWatcher} from "./groupsPaymentsSaga";
import signupWatcher from "./sugnUpSaga";
import loginWatcher from "./loginSaga";
import watchLogout from "./logoutSaga";
import {PropertyUpdateWatcherSaga, watchPropertyLoad} from "./propertySaga";
import formActionSaga from 'redux-form-saga';
import {groupPaymentsDeleteWatcherSaga, watchGroupPaymentsLoad} from "./groupPaymentsSaga";
import {watchPaymentLoad} from "./paymentSaga";
import watchPaymentsLoad, {payPaymentWatcher} from "./myPaymentsSaga";
import watchPropertyChoose from "./propertyChooseSaga";
import watchPropertyClean from "./propertyCleanSaga";
import { renterLoadWatcher } from "./renterSaga";


export default function* rootSaga() {
    yield all([
        userSaga(),
        propertiesSaga(), documentsSaga(),groupsPaymentsSaga(),groupPaymentsCreateWatcher(),groupPaymentsDeleteWatcherSaga(),
        signupWatcher(), loginWatcher(), watchLogout(), payPaymentWatcher(), watchGroupPaymentsLoad(),updateWatcher(),
        watchPropertyLoad(),formActionSaga(), PropertyUpdateWatcherSaga(),
        watchPaymentLoad(),watchPaymentsLoad(), watchPropertyChoose(), watchPropertyClean(),renterLoadWatcher()]);
}

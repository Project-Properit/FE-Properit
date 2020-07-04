import {actionChannel, call, put, take, takeEvery} from 'redux-saga/effects';

import {setError, setGroupPayments} from '../actions/groupPaymentsActions';
import {GROUPPAYMENTS} from '../constants';
import {fetchGroupPayments, deleteGroupPayments} from '../api';
import {loadGroupsPayments} from "../actions/groupsPaymentsActions";
import {handleGroupsPaymentsLoad} from "./groupsPaymentsSaga";

export function* handleGroupPaymentsLoad(action) {
    try {
        console.log(action)
        const myGroupPayments = yield call(fetchGroupPayments, action.propertyId, action.groupPaymentsId);
        yield put(setGroupPayments(myGroupPayments));
    } catch (error) {
        yield put(setError(error.toString()));
    }
}

export function* handleGroupPaymentsRemove(action) {
    try {
        console.log(action)
        yield call(deleteGroupPayments, action.assetId, action.groupPaymentsId);
        yield call(handleGroupsPaymentsLoad, action)
        // yield put(setProperty(myProperty));
    } catch (error) {
        yield put(setError(error.toString()));
    }
}

export function* watchGroupPaymentsLoad() {
    const subChannel = yield actionChannel(GROUPPAYMENTS.LOAD);
    while (true) {
        // Blocking - takes actions from queue.
        const action = yield take(subChannel);
        yield call(handleGroupPaymentsLoad, action)
    }
}
export function* groupPaymentsDeleteWatcherSaga() {
    yield takeEvery(GROUPPAYMENTS.REMOVE, handleGroupPaymentsRemove);
}
import {actionChannel, call, put, take, takeEvery} from 'redux-saga/effects';

import {setError, setGroupPayments} from '../actions/groupPaymentsActions';
import {GROUPPAYMENTS, PROPERTY} from '../constants';
import {fetchGroupPayments, removeProperty} from '../api';

export function* handleGroupPaymentsLoad(action) {
    try {
        const myGroupPayments = yield call(fetchGroupPayments, action.propertyId, action.groupPaymentsId);
        yield put(setGroupPayments(myGroupPayments));
    } catch (error) {
        yield put(setError(error.toString()));
    }
}

export function* handleGroupPaymentsRemove(action) {
    try {
        const success = yield call(removeProperty, action.propertyId);
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
    yield takeEvery(PROPERTY.REMOVE, handleGroupPaymentsRemove);
}
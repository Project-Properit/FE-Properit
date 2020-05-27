import {call, put, takeEvery} from 'redux-saga/effects';

import {setError, setGroupsPayments} from '../actions/groupsPaymentsActions';
import {GROUPSPAYMENTS} from '../constants';
import {fetchGroupsPayments} from '../api';
import {actionChannel, take} from "@redux-saga/core/effects";

export function* handleGroupsPaymentsLoad(action) {
    try {
        const myGroupsPayments = yield call(fetchGroupsPayments, action.assetId);
        yield put(setGroupsPayments(myGroupsPayments));
    } catch (error) {
        yield put(setError(error.toString()));
    }
}

export default function* watchGroupsPaymentsLoad() {
    //Creating Channel like a queue for `PROPERTIES.LOAD` requests.
    const subChannel = yield actionChannel(GROUPSPAYMENTS.LOAD);
    while (true){
        // Blocking - takes actions from queue.
        const action = yield take(subChannel);
        yield call(handleGroupsPaymentsLoad, action)
    }
    // yield takeEvery(PROPERTIES.LOAD, handlePropertiesLoad);
}

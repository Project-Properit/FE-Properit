import {call, put, takeLatest} from 'redux-saga/effects';

import {setError, setGroupsPayments} from '../actions/groupsPaymentsActions';
import {GROUPSPAYMENTS} from '../constants';
import {createGroupPaymentsApi, fetchGroupsPayments} from '../api';
import {actionChannel, take} from "@redux-saga/core/effects";


export function* handleGroupsPaymentsLoad(action) {
    try {
        const myGroupsPayments = yield call(fetchGroupsPayments, action.assetId, action.userId);
        yield put(setGroupsPayments(myGroupsPayments));
    } catch (error) {
        yield put(setError(error.toString()));
    }
}

export default function* watchGroupsPaymentsLoad() {
    //Creating Channel like a queue for `PROPERTIES.LOAD` requests.
    const subChannel = yield actionChannel(GROUPSPAYMENTS.LOAD);
    while (true) {
        // Blocking - takes actions from queue.
        const action = yield take(subChannel);
        yield call(handleGroupsPaymentsLoad, action)
    }
    // yield takeEvery(PROPERTIES.LOAD, handlePropertiesLoad);
}

function* handleGroupPaymentsCreate(action) {
    try {
        const {assetId, title, description, is_public, amount, payments} = action
        const response = yield call(createGroupPaymentsApi, assetId, title, description, is_public, amount, payments)
        yield put({type: GROUPSPAYMENTS.CREATE_SUCCESS, response})
    } catch (error) {
        yield put({type: GROUPSPAYMENTS.CREATE_ERROR, error})
    }
}

export function* groupPaymentsCreateWatcher() {
    yield takeLatest(GROUPSPAYMENTS.CREATE, handleGroupPaymentsCreate); // see details what is REQUEST param below
}

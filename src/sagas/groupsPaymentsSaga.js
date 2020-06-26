import {call, put, takeEvery} from 'redux-saga/effects';

import {createGroupPaymentsFormAction, setError, setGroupsPayments} from '../actions/groupsPaymentsActions';
import {GROUPSPAYMENTS} from '../constants';
import {createGroupPaymentsApi, fetchGroupsPayments} from '../api';
import {actionChannel, take} from "@redux-saga/core/effects";
import {SubmissionError} from "redux-form";

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
    while (true){
        // Blocking - takes actions from queue.
        const action = yield take(subChannel);
        yield call(handleGroupsPaymentsLoad, action)
    }
    // yield takeEvery(PROPERTIES.LOAD, handlePropertiesLoad);
}

export function* handleGroupPaymentsCreate(action) {
    console.log(action.payload)
    let x = Object.assign({}, action.payload);
    const assetId = x.assetId;
    delete x.assetId;

    try {
        yield call(createGroupPaymentsApi, assetId, x); // calling our api method
        // it should return promise
        // promise should be resolved if login successfull
        // or rejected if login credentials is wrong

        // so if apiClient promise resolved, then we can notify our form about successful response
        yield put(createGroupPaymentsFormAction.success());
        // do something else here ...
    } catch (error) {
        // if apiClient promise rejected, then we will be here
        // we need mark form as failed and pass errors to it
        const formError = new SubmissionError({
            login: 'User with this login is not found', // specific field error
            _error: 'Login failed, please check your credentials and try again', // global form error
        });

        yield put(createGroupPaymentsFormAction.failure(formError));
    }
}
export function* groupPaymentsCreateWatcherSaga() {
    yield takeEvery(createGroupPaymentsFormAction.REQUEST, handleGroupPaymentsCreate); // see details what is REQUEST param below
}

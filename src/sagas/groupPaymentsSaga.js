import {actionChannel, call, put, take, takeEvery} from 'redux-saga/effects';

import {createGroupPropertyFormAction, setError, setGroupPayments} from '../actions/groupPaymentsActions';
import {GROUPPAYMENTS} from '../constants';
import {createGroupPaymentsApi, fetchGroupPayments, removeProperty} from '../api';
import {SubmissionError} from "redux-form";

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
        console.log(action)
        const success = yield call(removeProperty, action.propertyId);
        // yield put(setProperty(myProperty));
    } catch (error) {
        yield put(setError(error.toString()));
    }
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
        yield put(createGroupPropertyFormAction.success());
        // do something else here ...
    } catch (error) {
        // if apiClient promise rejected, then we will be here
        // we need mark form as failed and pass errors to it
        const formError = new SubmissionError({
            login: 'User with this login is not found', // specific field error
            _error: 'Login failed, please check your credentials and try again', // global form error
        });

        yield put(createGroupPropertyFormAction.failure(formError));
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

export function* watchGroupPaymentsCreate() {
    yield takeEvery(createGroupPropertyFormAction.REQUEST, handleGroupPaymentsCreate); // see details what is REQUEST param below
}
import {actionChannel, call, put, take, takeEvery} from 'redux-saga/effects';

import {setError, setProperty, updatePropertyFormAction} from '../actions/propertyActions';
import {PROPERTY} from '../constants';
import {fetchProperty, updatePropApi, removeProperty} from '../api';
import {SubmissionError} from "redux-form";

export function* handlePropertyLoad(action) {
    try {
        const myProperty = yield call(fetchProperty, action.propertyId);
        yield put(setProperty(myProperty));
    } catch (error) {
        yield put(setError(error.toString()));
    }
}
export function* handlePropertyRemove(action) {
    try {
        console.log(action)
        const success = yield call(removeProperty, action.propertyId);
        // yield put(setProperty(myProperty));
    } catch (error) {
        yield put(setError(error.toString()));
    }
}

function* handlePropertyUpdate(action) {

  console.log(action.payload)
    let x = Object.assign({}, action.payload);
    const assetId = x.assetId;
    delete x.assetId;

  try {
    yield call(updatePropApi, assetId,x); // calling our api method
    // it should return promise
    // promise should be resolved if login successfull
    // or rejected if login credentials is wrong

    // so if apiClient promise resolved, then we can notify our form about successful response
    yield put(updatePropertyFormAction.success());
    // do something else here ...
  } catch (error) {
    // if apiClient promise rejected, then we will be here
    // we need mark form as failed and pass errors to it
    const formError = new SubmissionError({
      login: 'User with this login is not found', // specific field error
      _error: 'Login failed, please check your credentials and try again', // global form error
    });

    yield put(updatePropertyFormAction.failure(formError));
  }
}


export function* watchPropertyLoad() {
    //Creating Channel like a queue for `PROPERTIES.LOAD` requests.
    const subChannel = yield actionChannel(PROPERTY.LOAD);
    while (true) {
        // Blocking - takes actions from queue.
        const action = yield take(subChannel);
        yield call(handlePropertyLoad, action)
    }
    // yield takeEvery(PROPERTIES.LOAD, handlePropertiesLoad);
}
export function* PropertyUpdateWatcherSaga() {
  yield takeEvery(updatePropertyFormAction.REQUEST, handlePropertyUpdate); // see details what is REQUEST param below
  yield takeEvery(PROPERTY.REMOVE, handlePropertyRemove); // see details what is REQUEST param below
}
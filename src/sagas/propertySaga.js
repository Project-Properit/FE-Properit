import {actionChannel, call, put, take, takeEvery, select} from 'redux-saga/effects';

import {setError, setProperty, updatePropertyFormAction, createPropertyFormAction} from '../actions/propertyActions';
import {PROPERTY} from '../constants';
import {fetchProperty, updatePropApi, createPropApi, removeProperty} from '../api';
import {SubmissionError} from "redux-form";
import { loadProperties } from "../actions/propertiesActions";

export function* handlePropertyLoad(action) {
    try {
        const myProperty = yield call(fetchProperty, action.propertyId);
        const pendingTenants = myProperty[0].pending_tenants
        pendingTenants.forEach(function(tenant){
            tenant.pending=true
        })
        const tenants = myProperty[0].tenant_list
        tenants.forEach(function(tenant){
            tenant.pending=false
        })
        myProperty[0].tenant_list = tenants
        myProperty[0].pending_tenants = pendingTenants
        yield put(setProperty(myProperty));
    } catch (error) {
        yield put(setError(error.toString()));
    }
}
export function* handlePropertyRemove(action) {
    try {
        yield call(removeProperty, action.propertyId);
        const getOwnerId = (state) => state.clientReducer.userId

        const ownerId = yield select(getOwnerId)
        yield put (loadProperties(ownerId))
    } catch (error) {
        yield put(setError(error.toString()));
    }
}

function* handlePropertyUpdate(action) {

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
function* handlePropertyCreate(action) {

  try {
    yield call(createPropApi,action.propertyObject); // calling our api method
    // it should return promise
    // promise should be resolved if login successfull
    // or rejected if login credentials is wrong

    // so if apiClient promise resolved, then we can notify our form about successful response
    yield put(createPropertyFormAction.success());
    window.location="properties"
    // do something else here ...
  } catch (error) {
    // if apiClient promise rejected, then we will be here
    // we need mark form as failed and pass errors to it
    const formError = new SubmissionError({
      login: 'User with this login is not found', // specific field error
      _error: 'Login failed, please check your credentials and try again', // global form error
    });

    yield put(createPropertyFormAction.failure(formError));
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
  yield takeEvery(PROPERTY.ADD, handlePropertyCreate); // see details what is REQUEST param below
  yield takeEvery(PROPERTY.REMOVE, handlePropertyRemove); // see details what is REQUEST param below
}
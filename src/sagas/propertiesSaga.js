import {call, put, takeEvery} from 'redux-saga/effects';

import {setError, setProperties} from '../actions/propertyActions';
import {PROPERTIES} from '../constants';
import {fetchProperties} from '../api';
import {actionChannel, take} from "@redux-saga/core/effects";

export function* handlePropertiesLoad(action) {
    try {
        const myProperties = yield call(fetchProperties, action.userId);
        yield put(setProperties(myProperties));
    } catch (error) {
        yield put(setError(error.toString()));
    }
}

export default function* watchPropertiesLoad() {
    //Creating Channel like a queue for `PROPERTIES.LOAD` requests.
    const subChannel = yield actionChannel(PROPERTIES.LOAD);
    while (true){
        // Blocking - takes actions from queue.
        const action = yield take(subChannel);
        yield call(handlePropertiesLoad, action)
    }
    // yield takeEvery(PROPERTIES.LOAD, handlePropertiesLoad);
}

import {call, put, takeEvery} from 'redux-saga/effects';

import {setError, setProperties} from '../actions/propertyActions';
import {PROPERTIES} from '../constants';
import {fetchProperties} from '../api';

export function* handlePropertiesLoad(action) {
    try {
        const myProperties = yield call(fetchProperties, action.userId);
        yield put(setProperties(myProperties));
    } catch (error) {
        yield put(setError(error.toString()));
    }
}

export default function* watchPropertiesLoad() {
    yield takeEvery(PROPERTIES.LOAD, handlePropertiesLoad);
}

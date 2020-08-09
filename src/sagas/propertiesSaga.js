import {call, put} from 'redux-saga/effects';

import {setError, setProperties} from '../actions/propertiesActions';
import {PROPERTIES} from '../constants';
import {fetchProperties} from '../api';
import {actionChannel, take} from "@redux-saga/core/effects";
import { push } from "react-router-redux";

export function* handlePropertiesLoad(action) {
    try {
        const myProperties = yield call(fetchProperties, action.userId);
        localStorage.removeItem('chosenAssetId')
        yield put(setProperties(myProperties));
    } catch (error) {
        yield put(setError(error.toString()));
    }
}

export default function* watchPropertiesLoad() {
    const subChannel = yield actionChannel(PROPERTIES.LOAD);
    while (true){
        const action = yield take(subChannel);
        yield call(handlePropertiesLoad, action)
    }
}

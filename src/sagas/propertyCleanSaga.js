import { call } from 'redux-saga/effects';
import { PROPERTIES } from '../constants';
import { actionChannel, take } from "@redux-saga/core/effects";

export function* handlePropertiesClean(action) {
        localStorage.setItem('chosenAssetId', null)
}

export default function* watchPropertyClean() {
    const subChannel = yield actionChannel(PROPERTIES.CLEAN);
    while (true){
        const action = yield take(subChannel);
        yield call(handlePropertiesClean, action)
    }
}

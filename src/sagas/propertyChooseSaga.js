import { call } from 'redux-saga/effects';
import { PROPERTIES } from '../constants';
import { actionChannel, take } from "@redux-saga/core/effects";

export function* handlePropertiesChoose(action) {
    console.log('handlePropertiesChoose')
        localStorage.setItem('chosenAssetId', action.assetId)
}

export default function* watchPropertyChoose() {
    const subChannel = yield actionChannel(PROPERTIES.CHOOSE_ASSET);
    while (true){
        const action = yield take(subChannel);
        yield call(handlePropertiesChoose, action)
    }
}

import {call, put, takeEvery} from 'redux-saga/effects';

import {setError, setImages} from '../actions';
import {IMAGES} from '../constants';
import {fetchImages} from '../api';

export function* handleImagesLoad() {
    try {
        const images = yield call(fetchImages);
        yield put(setImages(images));
    } catch (error) {
        yield put(setError(error.toString()));
    }
}

export default function* watchImagesLoad() {
    yield takeEvery(IMAGES.LOAD, handleImagesLoad);
}

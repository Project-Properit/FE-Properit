import { all } from 'redux-saga/effects';

import imagesSaga from './imagesSaga';
import propertiesSaga from "./propertiesSaga";

export default function* rootSaga() {
    yield all([imagesSaga(), propertiesSaga()]);
}

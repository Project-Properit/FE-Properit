import { all } from 'redux-saga/effects';

import imagesSaga from './imagesSaga';
import propertiesSaga from "./propertiesSaga";
import documentsSaga from "./documentsSaga";

export default function* rootSaga() {
    yield all([imagesSaga(), propertiesSaga(), documentsSaga()]);
}

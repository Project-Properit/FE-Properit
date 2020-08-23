import {actionChannel, call, put, take} from 'redux-saga/effects';

import {setDocuments, setError} from '../actions/documentActions';
import {DOCUMENTS} from '../constants';
import {fetchDocuments} from '../api';

export function* handleDocumentsLoad(action) {
    try {
        const myDocs = yield call(fetchDocuments, action.userId);
        yield put(setDocuments(myDocs));
    } catch (error) {
        yield put(setError(error.toString()));
    }
}

export default function* watchPropertiesLoad() {
    const subChannel = yield actionChannel(DOCUMENTS.LOAD);
    while (true) {
        const action = yield take(subChannel);
        yield call(handleDocumentsLoad, action)
    }
}

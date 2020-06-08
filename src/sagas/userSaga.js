import {actionChannel, call, put, take} from 'redux-saga/effects';

import {setUser, setError} from '../actions/userActions';
import {USER} from '../constants';
import {fetchUser} from '../api';

export function* handleUserLoad(action) {
    try {
        const userObject = yield call(fetchUser, action.userId);
        yield put(setUser(userObject));
    } catch (error) {
        yield put(setError(error.toString()));
    }
}

export default function* watchUserLoad(){
    const subChannel = yield actionChannel(USER.LOAD);
    while (true) {
        // Blocking - takes actions from queue.
        const action = yield take(subChannel);
        yield call(handleUserLoad, action)
    }
}

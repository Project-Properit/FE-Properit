import { call, put } from 'redux-saga/effects';

import { setError, setPayments } from '../actions/MyPaymentsActions';
import { MY_PAYMENTS } from '../constants';
import { fetchPayments } from '../api';
import { actionChannel, take } from "@redux-saga/core/effects";

export function* handlePaymentsLoad(action) {
	try {
		console.log('fetchPayments')
		const myPayments = yield call(fetchPayments, action.assetId, action.userId);
		yield put(setPayments(myPayments));
	} catch (error) {
		yield put(setError(error.toString()));
	}
}

export default function* watchPaymentsLoad() {
	//Creating Channel like a queue for `PAYMENTS.LOAD` requests.
	const subChannel = yield actionChannel(MY_PAYMENTS.LOAD);
	while (true) {
		// Blocking - takes actions from queue.
		const action = yield take(subChannel);
		yield call(handlePaymentsLoad, action)
	}
}

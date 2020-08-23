import {call, put} from 'redux-saga/effects';

import {setError, setPayments} from '../actions/MyPaymentsActions';
import {GROUPSPAYMENTS, MY_PAYMENTS} from '../constants';
import {fetchPayments, payApi} from '../api';
import {actionChannel, take, takeLatest} from "@redux-saga/core/effects";

export function* handlePaymentsLoad(action) {
	try {
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
function* handlePayPayment(action) {
	try {
		const {is_periodic,paymentId} = action
		yield call(payApi, paymentId, is_periodic)
		yield call(handlePaymentsLoad, action)
	} catch (error) {
		yield put({type: GROUPSPAYMENTS.CREATE_ERROR, error})
	}
}

export function* payPaymentWatcher() {
	yield takeLatest(MY_PAYMENTS.PAY, handlePayPayment); // see details what is REQUEST param below
}

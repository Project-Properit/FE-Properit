import {actionChannel, call, put, take, takeEvery} from 'redux-saga/effects';
import {removePayment, setError, setPayment} from "../actions/paymentActions";
import {PAYMENT} from "../constants";
import {fetchPayment} from "../api";

export function* handlePaymentLoad(action) {
    try {
        const payment = yield call(fetchPayment, action.paymentId);
        yield put(setPayment(payment[0]));
    } catch (error) {
        yield put(setError(error.toString()));
    }
}

export function* handlePaymentRemove(action) {
    try {
        const success = yield call(removePayment, action.propertyId);
        // yield put(setProperty(myProperty));
    } catch (error) {
        yield put(setError(error.toString()));
    }
}

export function* watchPaymentLoad() {
    const subChannel = yield actionChannel(PAYMENT.LOAD);
    while (true) {
        // Blocking - takes actions from queue.
        const action = yield take(subChannel);
        yield call(handlePaymentLoad, action)
    }
}

export function* paymentDeleteWatcherSaga() {
    yield takeEvery(PAYMENT.REMOVE, handlePaymentRemove);
}
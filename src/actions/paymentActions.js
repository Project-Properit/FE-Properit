import { PAYMENT} from '../constants';

const loadPayment = (paymentId) => ({
    type: PAYMENT.LOAD,
    paymentId,
});
const removePayment = (paymentId) => ({
    type: PAYMENT.REMOVE,
    paymentId
});
const clearPayment = () => ({
    type: PAYMENT.CLEAR,
});

const setPayment = (payment) => ({
    type: PAYMENT.LOAD_SUCCESS,
    payment
});

const setError = error => ({
    type: PAYMENT.LOAD_FAIL,
    error,
});

export {
    loadPayment,
    setPayment,
    setError,
    clearPayment,
    removePayment
};

import {MY_PAYMENTS} from '../constants';

const loadPayments = (assetId, userId) => ({
    type: MY_PAYMENTS.LOAD,
    assetId,
    userId
});

const setPayments = myPayments => ({
    type: MY_PAYMENTS.LOAD_SUCCESS,
    myPayments,
});

const setError = error => ({
    type: MY_PAYMENTS.LOAD_FAIL,
    error,
});

const pay = function pay(all) {
    const {paymentId, assetId, userId, is_periodic} = all
    return {
        type: MY_PAYMENTS.PAY,
        paymentId,
        assetId,
        userId,
        is_periodic
    }
}


export {
    loadPayments,
    setPayments,
    setError,
    pay
};

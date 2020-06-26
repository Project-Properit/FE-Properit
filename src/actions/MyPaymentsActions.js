import { MY_PAYMENTS } from '../constants';

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

export {
    loadPayments,
    setPayments,
    setError,
};

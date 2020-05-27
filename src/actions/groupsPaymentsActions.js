import { GROUPSPAYMENTS } from '../constants';

const loadGroupsPayments = (assetId) => ({
    type: GROUPSPAYMENTS.LOAD,
    assetId
});

const setGroupsPayments = myGroupsPayments => ({
    type: GROUPSPAYMENTS.LOAD_SUCCESS,
    myGroupsPayments,
});

const setError = error => ({
    type: GROUPSPAYMENTS.LOAD_FAIL,
    error,
});

export {
    loadGroupsPayments,
    setGroupsPayments,
    setError,
};

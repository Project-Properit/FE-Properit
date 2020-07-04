import {GROUPSPAYMENTS} from '../constants';

const loadGroupsPayments = (assetId, userId) => ({
    type: GROUPSPAYMENTS.LOAD,
    assetId,
    userId
});

const setGroupsPayments = myGroupsPayments => ({
    type: GROUPSPAYMENTS.LOAD_SUCCESS,
    myGroupsPayments,
});

const setError = error => ({
    type: GROUPSPAYMENTS.LOAD_FAIL,
    error,
});

const createGroupPayments = function createGroupPayments(all) {
    const {userId, assetId, title, description, is_public, amount, payments, months} = all
    return {
        type: GROUPSPAYMENTS.CREATE,
        userId, assetId, title, description, is_public, amount, payments, months
    }
}


export {
    loadGroupsPayments,
    setGroupsPayments,
    setError,
    createGroupPayments
};

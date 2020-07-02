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
    console.log(all)
    const {assetId, title, description, is_public, amount, payments} = all
    return {
        type: GROUPSPAYMENTS.CREATE,
        assetId, title, description, is_public, amount, payments
    }
}


export {
    loadGroupsPayments,
    setGroupsPayments,
    setError,
    createGroupPayments
};

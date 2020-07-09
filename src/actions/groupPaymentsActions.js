import { GROUPPAYMENTS} from '../constants';

const loadGroupPayments = (propertyId, groupPaymentsId) => ({
    type: GROUPPAYMENTS.LOAD,
    propertyId,
    groupPaymentsId
});
const deleteGroupPayments = (userId, assetId, groupPaymentsId) => ({
    type: GROUPPAYMENTS.REMOVE,
    userId,
    assetId,
    groupPaymentsId
});

const clearGroupPayments = () => ({
    type: GROUPPAYMENTS.CLEAR,
});

const setGroupPayments = (myGroupPayments) => ({
    type: GROUPPAYMENTS.LOAD_SUCCESS,
    myGroupPayments
});

const setError = error => ({
    type: GROUPPAYMENTS.LOAD_FAIL,
    error,
});

export {
    loadGroupPayments,
    setGroupPayments,
    setError,
    clearGroupPayments,
    deleteGroupPayments
};

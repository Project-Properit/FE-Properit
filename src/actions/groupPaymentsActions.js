import { GROUPPAYMENTS} from '../constants';
import { createFormAction } from 'redux-form-saga';

const loadGroupPayments = (propertyId, groupPaymentsId) => ({
    type: GROUPPAYMENTS.LOAD,
    propertyId,
    groupPaymentsId
});
const removeGroupPayments = (propertyId, groupPaymentsId) => ({
    type: GROUPPAYMENTS.REMOVE,
    propertyId,
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
    removeGroupPayments
};

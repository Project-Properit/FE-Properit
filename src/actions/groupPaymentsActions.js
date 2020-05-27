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

const setGroupPayments = (propertyId, groupPaymentsId) => ({
    type: GROUPPAYMENTS.LOAD_SUCCESS,
    propertyId,
    groupPaymentsId
});

const setError = error => ({
    type: GROUPPAYMENTS.LOAD_FAIL,
    error,
});

const updateGroupPropertyFormAction = createFormAction('UpdateGroupPayments');
const createGroupPropertyFormAction = createFormAction('CreateGroupPayments');
export {
    loadGroupPayments,
    setGroupPayments,
    setError,
    clearGroupPayments,
    removeGroupPayments,
    updateGroupPropertyFormAction,
    createGroupPropertyFormAction
};

import { GROUPSPAYMENTS } from '../constants';
import {createFormAction} from "redux-form-saga";

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

const createGroupPaymentsFormAction = createFormAction('CreateGroupPayments');

export {
    loadGroupsPayments,
    setGroupsPayments,
    setError,
    createGroupPaymentsFormAction
};

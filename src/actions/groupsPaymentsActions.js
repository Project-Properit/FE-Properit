import { GROUPSPAYMENTS } from '../constants';
import {createFormAction} from "redux-form-saga";

const loadGroupsPayments = (assetId,userId) => ({
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

const createGroupPaymentsFormAction = createFormAction('CreateGroupPayments');

export {
    loadGroupsPayments,
    setGroupsPayments,
    setError,
    createGroupPaymentsFormAction
};

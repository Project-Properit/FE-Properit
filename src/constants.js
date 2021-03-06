const RENTER = {
    LOAD_DETAILS: 'LOAD_DETAILS',
    SET_DETAILS: 'SET_DETAILS',
    CLEAR_DETAILS: 'CLEAR_DETAILS',
    NOT_FOUND: 'NOT_FOUND',
    EXISTS: 'EXISTS',
    INVITE_RENTER: 'INVITE_RENTER',
    LOAD_INVITES: 'LOAD_INVITES',
    SET_INVITES: 'SET_INVITES',
    APPROVE_INVITE: 'APPROVE_INVITE',
    EXISTS_IN_OTHER_PROPERTY: 'EXISTS_IN_OTHER_PROPERTY',
    INVITE_SUCCESS: 'INVITE_SUCCESS',
};
const GROUPPAYMENTS = {
    LOAD: 'GROUPPAYMENTS_LOAD',
    LOAD_SUCCESS: 'GROUPPAYMENTS_LOAD_SUCCESS',
    LOAD_FAIL: 'GROUPPAYMENTS_LOAD_FAIL',
    REMOVE: 'GROUPPAYMENTS_REMOVE',
    CLEAR: 'CLEAR'
}
const PAYMENT = {
    LOAD: 'PAYMENT_LOAD',
    LOAD_SUCCESS: 'PAYMENT_LOAD_SUCCESS',
    LOAD_FAIL: 'PAYMENT_LOAD_FAIL',
    // REMOVE: 'REMOVE',
    CLEAR: 'CLEAR',
    CREATE: 'CREATE'
}

const GROUPSPAYMENTS = {
    LOAD: 'GROUPSPAYMENTS_LOAD',
    LOAD_SUCCESS: 'GROUPSPAYMENTS_LOAD_SUCCESS',
    LOAD_FAIL: 'GROUPSPAYMENTS_LOAD_FAIL',
    CREATE: 'CREATE',
    CREATE_SUCCESS: 'CREATE_SUCCESS',
    CREATE_ERROR: 'CREATE_ERROR'
};
const PROPERTIES = {
    LOAD: 'PROPERTIES_LOAD',
    CLEAN: 'PROPERTIES_CLEAN',
    LOAD_SUCCESS: 'PROPERTIES_LOAD_SUCCESS',
    LOAD_FAIL: 'PROPERTIES_LOAD_FAIL',
    CHOOSE_ASSET: 'CHOOSE_ASSET'
};
const MY_PAYMENTS = {
    LOAD: 'MY_PAYMENTS_LOAD',
    LOAD_SUCCESS: 'MY_PAYMENTS_LOAD_SUCCESS',
    LOAD_FAIL: 'MY_PAYMENTS_LOAD_FAIL',
    PAY: 'PAY'
};
const PROPERTY = {
    ADD: 'PROPERTY_ADD',
    LOAD: 'PROPERTY_LOAD',
    LOAD_SUCCESS: 'PROPERTY_LOAD_SUCCESS',
    LOAD_FAIL: 'PROPERTY_LOAD_FAIL',
    REMOVE: 'PROPERTY_REMOVE',
    CLEAR: 'CLEAR',
    ADD_DOCUMENT: 'ADD_DOCUMENT',
    DELETE_DOCUMENT: 'DELETE_DOCUMENT'
};
const DOCUMENTS = {
    LOAD: 'DOCUMENTS_LOAD',
    LOAD_SUCCESS: 'DOCUMENTS_LOAD_SUCCESS',
    LOAD_FAIL: 'DOCUMENTS_LOAD_FAIL',
};
const CLIENT = {
    CLIENT_SET: "CLIENT_SET",
    CLIENT_UNSET: "CLIENT_UNSET",
    CLIENT_PARTIAL_UNSET: "CLIENT_PARTIAL_UNSET",
    SET_MODE: "SET_MODE",
    CLIENT_UPDATE: "CLIENT_UPDATE"

};
const USER = {
    LOAD_SUCCESS: "USER_LOAD_SUCCESS",
    LOAD: "USER_LOAD",
    LOAD_FAIL: "USER_LOAD_FAIL",
    CLEAR: "CLEAR",
    UPDATE_REQUESTING: "UPDATE_REQUESTING",
    UPDATE_SUCCESS: "UPDATE_SUCCESS",
    UPDATE_ERROR: "UPDATE_ERROR"

};
const SIGNUP = {
    SIGNUP_REQUESTING: "SIGNUP_REQUESTING",
    SIGNUP_SUCCESS: "SIGNUP_SUCCESS",
    SIGNUP_ERROR: "SIGNUP_ERROR",
};
const LOGIN = {
    LOGIN_REQUESTING: "LOGIN_REQUESTING",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_ERROR: "LOGIN_ERROR",
    LOGOUT: "LOGOUT",
    LOGOUT_NO_REDIRECT: "LOGOUT_NO_REDIRECT"
}
const FILEUPLOAD = {
    SET_FILES: 'SET_FILES',
    SET_EXISTED_FILES: 'SET_EXISTED_FILES',
    ADD_FILES: 'ADD_FILES',
    DELETE_FILES: 'DELETE_FILES',
};

export {
    RENTER,
    PROPERTIES,
    FILEUPLOAD,
    DOCUMENTS,
    CLIENT,
    SIGNUP,
    LOGIN,
    PROPERTY,
    GROUPSPAYMENTS,
    GROUPPAYMENTS,
    USER,
    PAYMENT,
    MY_PAYMENTS
};

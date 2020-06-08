const IMAGES = {
    LOAD: 'IMAGES_LOAD',
    LOAD_SUCCESS: 'IMAGES_LOAD_SUCCESS',
    LOAD_FAIL: 'IMAGES_LOAD_FAIL',
};
const PROPERTIES = {
    LOAD: 'PROPERTIES_LOAD',
    LOAD_SUCCESS: 'PROPERTIES_LOAD_SUCCESS',
    LOAD_FAIL: 'PROPERTIES_LOAD_FAIL',
};
const PROPERTY = {
    ADD: 'PROPERTY_ADD',
    LOAD: 'PROPERTY_LOAD',
    LOAD_SUCCESS: 'PROPERTY_LOAD_SUCCESS',
    LOAD_FAIL: 'PROPERTY_LOAD_FAIL',
    REMOVE:'REMOVE',
    CLEAR:'CLEAR',
};
const DOCUMENTS = {
    LOAD: 'DOCUMENTS_LOAD',
    LOAD_SUCCESS: 'DOCUMENTS_LOAD_SUCCESS',
    LOAD_FAIL: 'DOCUMENTS_LOAD_FAIL',
};
const CLIENT = {
     CLIENT_SET: "CLIENT_SET",
    CLIENT_UNSET: "CLIENT_UNSET"

};const SIGNUP = {
     SIGNUP_REQUESTING: "SIGNUP_REQUESTING",
     SIGNUP_SUCCESS: "SIGNUP_SUCCESS",
     SIGNUP_ERROR: "SIGNUP_ERROR",
};
const LOGIN = {
    LOGIN_REQUESTING: "LOGIN_REQUESTING",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_ERROR: "LOGIN_ERROR",
    LOGOUT: "LOGOUT"
}
const FILEUPLOAD = {
    SET_FILES: 'SET_FILES',
    SET_EXISTED_FILES: 'SET_EXISTED_FILES',
    ADD_FILES: 'ADD_FILES',
    DELETE_FILES: 'DELETE_FILES',
};

export { IMAGES , PROPERTIES, FILEUPLOAD, DOCUMENTS, CLIENT, SIGNUP, LOGIN, PROPERTY};

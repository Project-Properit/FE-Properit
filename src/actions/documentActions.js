import { DOCUMENTS } from '../constants';

const loadDocuments = (userId) => ({
    type: DOCUMENTS.LOAD,
    userId
});

const setDocuments = myDocuments => ({
    type: DOCUMENTS.LOAD_SUCCESS,
    myDocuments,
});

const setError = error => ({
    type: DOCUMENTS.LOAD_FAIL,
    error,
});

export {
    loadDocuments,
    setDocuments,
    setError,
};

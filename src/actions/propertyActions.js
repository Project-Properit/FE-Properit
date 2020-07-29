import { PROPERTY } from '../constants';
import { createFormAction } from 'redux-form-saga';

const loadProperty = (propertyId) => ({
    type: PROPERTY.LOAD,
    propertyId
});
const addNewProperty = (propertyObject) => ({
    type: PROPERTY.ADD,
    propertyObject
});
const removeProperty = (propertyId) => ({
    type: PROPERTY.REMOVE,
    propertyId
});
const clearProperty = () => ({
    type: PROPERTY.CLEAR,
});

const setProperty = myProperty => ({
    type: PROPERTY.LOAD_SUCCESS,
    myProperty,
});

const setError = error => ({
    type: PROPERTY.LOAD_FAIL,
    error,
});

const addDocument = document => ({
    type: PROPERTY.ADD_DOCUMENT,
    document
});

const deleteDocument = document => ({
    type: PROPERTY.DELETE_DOCUMENT,
    document
});

const updatePropertyFormAction = createFormAction('UpdateProperty');
const createPropertyFormAction = createFormAction('CreateProperty');
export {
    loadProperty,
    setProperty,
    setError,
    addDocument,
    deleteDocument,
    clearProperty,
    removeProperty,
    addNewProperty,
    updatePropertyFormAction,
    createPropertyFormAction,
};

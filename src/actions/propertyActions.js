import { PROPERTY } from '../constants';
import { createFormAction } from 'redux-form-saga';

const loadProperty = (propertyId) => ({
    type: PROPERTY.LOAD,
    propertyId
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

const updatePropertyFormAction = createFormAction('UpdateProperty');
export {
    loadProperty,
    setProperty,
    setError,
    clearProperty,
    removeProperty,
    updatePropertyFormAction
};

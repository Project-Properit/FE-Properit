import { PROPERTIES } from '../constants';

const loadProperties = (userId) => ({
    type: PROPERTIES.LOAD,
    userId
});

const setProperties = myProperties => ({
    type: PROPERTIES.LOAD_SUCCESS,
    myProperties,
});

const setError = error => ({
    type: PROPERTIES.LOAD_FAIL,
    error,
});

export {
    loadProperties,
    setProperties,
    setError,
};
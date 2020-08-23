import { MY_PAYMENTS, PROPERTIES } from '../constants';

const cleanProperties = () => ({
    type: PROPERTIES.CLEAN
});
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
const chooseAsset = (assetId) => ({
    type: PROPERTIES.CHOOSE_ASSET,
    assetId,
});

export {
    cleanProperties,
    loadProperties,
    setProperties,
    setError,
    chooseAsset
};

import { CLIENT } from '../constants'

const setClient = (token, userId, isOwner, isTenant, firstName, tenantAssetId) => ({
    type: CLIENT.CLIENT_SET,
    token,
    userId,
    isOwner,
    isTenant,
    firstName,
    tenantAssetId
});


const unsetClient = () => ({
type: CLIENT.CLIENT_UNSET,});

const setMode = (mode) => ({
    type: CLIENT.SET_MODE,
    mode
})

export {
    setClient,
    unsetClient,
    setMode
};

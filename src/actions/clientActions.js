import { CLIENT } from '../constants'

const setClient = (token, userId, isOwner, isTenant) => ({
    type: CLIENT.CLIENT_SET,
    token,
    userId,
    isOwner,
    isTenant
});


const unsetClient = () => ({
type: CLIENT.CLIENT_UNSET,});

export {
    setClient,
    unsetClient,
};

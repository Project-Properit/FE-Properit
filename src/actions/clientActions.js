import { CLIENT } from '../constants'

const setClient = (token, userId) => ({
    type: CLIENT.CLIENT_SET,
    token,
    userId
});



const unsetClient = () => ({
type: CLIENT.CLIENT_UNSET,});

export {
    setClient,
    unsetClient,
};

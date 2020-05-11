import { CLIENT } from '../constants'

const setClient = (token) => ({
    type: CLIENT.CLIENT_SET,
    token,
});



const unsetClient = () => ({
type: CLIENT.CLIENT_UNSET,});

export {
    setClient,
    unsetClient,
};

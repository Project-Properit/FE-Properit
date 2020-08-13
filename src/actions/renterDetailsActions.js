import { RENTER } from '../constants';

const getRenterDetails = (mail) => ({
    type: RENTER.LOAD_DETAILS,
    mail
});
const inviteRenter = (assetId,renterId) => ({
    type: RENTER.INVITE_RENTER,
    assetId, renterId
});
const setRenterDetails = (renterDetails) => ({
    type: RENTER.SET_DETAILS,
    renterDetails
});
const clearRenterDetails = () => ({
    type: RENTER.CLEAR_DETAILS,

});
const setNotFound = () => ({
    type: RENTER.NOT_FOUND,
});
const setExists = () => ({
    type: RENTER.EXISTS,
});


export {
    getRenterDetails,
    inviteRenter,
    setNotFound,
    clearRenterDetails,
    setRenterDetails,
    setExists
};

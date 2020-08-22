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
const loadInvites = (userId) => ({
    type: RENTER.LOAD_INVITES,
    userId
});
const approveInvite = (userId, assetId) => ({
    type: RENTER.APPROVE_INVITE,
    userId, assetId
});
const setRenterInvites = (renterInvites) => ({
    type: RENTER.SET_INVITES,
    renterInvites
});


export {
    getRenterDetails,
    inviteRenter,
    setNotFound,
    clearRenterDetails,
    setRenterDetails,
    setExists,
    loadInvites,
    setRenterInvites,
    approveInvite,
};

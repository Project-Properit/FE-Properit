import {  RENTER } from '../constants';

const renterInvitesReducer = (state = {my_invites:[]}, action) => {
    switch (action.type) {
        case RENTER.LOAD_INVITES: return {
            ...state,
            isLoading:true,
            my_invites:[],
        };
     case RENTER.SET_INVITES:
            return {
            ...state,
            isLoading: false,
            my_invites:action.renterInvites
            };
        default: return state

    }

};

export default renterInvitesReducer;

import {  RENTER } from '../constants';

const renterReducer = (state = {
    renterDetails:null,notFound:false,
    renterExists:false, renterExistsInOtherProperty:false, inviteSuccess:false}, action) => {
    switch (action.type) {
        case RENTER.LOAD_DETAILS: return {
            ...state,
            isLoading:true,
            renterDetails:null,
            notFound:false,
            renterExists:false,
            renterExistsInOtherProperty:false,
            inviteSuccess:false,
        };
        case RENTER.CLEAR_DETAILS: return {
            ...state,
            isLoading:false,
            renterDetails:null,
            notFound:false,
            renterExists:false,
            renterExistsInOtherProperty:false,
            inviteSuccess:false,
        };
         case RENTER.SET_DETAILS:
            return {
            ...state,
            isLoading: false,
            renterDetails:action.renterDetails[0],
            notFound:false,
            renterExists:false,
            renterExistsInOtherProperty:false,
            inviteSuccess:false,
            };
         case RENTER.NOT_FOUND:
            return {
            ...state,
            isLoading: false,
            notFound:true,
            renterExists:false,
            renterExistsInOtherProperty:false,
            inviteSuccess:false,
            }
        case RENTER.EXISTS:
            return {
            ...state,
            renterDetails:null,
            isLoading: false,
            notFound:false,
            renterExistsInOtherProperty:false,
            inviteSuccess:false,
            renterExists:true,
            }
        case RENTER.EXISTS_IN_OTHER_PROPERTY:
            return {
            ...state,
            renterDetails:null,
            isLoading: false,
            notFound:false,
            renterExists:false,
            inviteSuccess:false,
            renterExistsInOtherProperty:true,
            }
            case RENTER.INVITE_SUCCESS:
            return {
            ...state,
            renterDetails:null,
            isLoading: false,
            notFound:false,
            renterExists:false,
            renterExistsInOtherProperty:true,
            inviteSuccess:true
            }
        default: return state
    }
};

export default renterReducer;

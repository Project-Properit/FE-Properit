import {  RENTER } from '../constants';

const renterReducer = (state = {renterDetails:null,notFound:false,renterExists:false}, action) => {
    switch (action.type) {
        case RENTER.LOAD_DETAILS: return {
            ...state,
            isLoading:true,
            renterDetails:null,
            notFound:false,
            renterExists:false,
        };
        case RENTER.CLEAR_DETAILS: return {
            ...state,
            isLoading:false,
            renterDetails:null,
            notFound:false,
            renterExists:false,
        };
         case RENTER.SET_DETAILS:
            return {
            ...state,
            isLoading: false,
            renterDetails:action.renterDetails[0],
            notFound:false,
            renterExists:false,
            };
         case RENTER.NOT_FOUND:
            return {
            ...state,
            isLoading: false,
            notFound:true,
            renterExists:false,
            }
        case RENTER.EXISTS:
            return {
            ...state,
            isLoading: false,
            notFound:false,
            renterExists:true,
            }
        default: return state

    }

};

export default renterReducer;

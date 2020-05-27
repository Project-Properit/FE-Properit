import { GROUPSPAYMENTS } from '../constants';

const myGroupsPaymentsReducer = (state = {myGroupsPayments:[]}, action) => {
    switch (action.type) {
        case GROUPSPAYMENTS.LOAD: return {
            ...state,
            isLoading:true,
            myGroupsPayments:[]
        };
        case GROUPSPAYMENTS.LOAD_SUCCESS: return {
            ...state,
            isLoading:false,
            myGroupsPayments:action.myGroupsPayments
        };
        case GROUPSPAYMENTS.LOAD_FAIL: return {
            ...state,
            isLoading:false,
            error:action.error

        };
        default: return state

    }

};

export default myGroupsPaymentsReducer;

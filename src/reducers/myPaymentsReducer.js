import { MY_PAYMENTS } from '../constants';

const myPaymentsReducer = (state = {myPayments:[]}, action) => {
    switch (action.type) {
        case MY_PAYMENTS.LOAD: return {
            ...state,
            isLoading:true,
            myPayments:[]
        };
        case MY_PAYMENTS.LOAD_SUCCESS: return {
            ...state,
            isLoading:false,
            myPayments:action.myPayments
        };
        case MY_PAYMENTS.LOAD_FAIL: return {
            ...state,
            isLoading:false,
            error:action.error

        };
        default: return state

    }

};

export default myPaymentsReducer;

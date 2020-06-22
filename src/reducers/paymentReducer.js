import {PAYMENT} from '../constants';

const payment = (state = {allPayment: []}, action) => {
    switch (action.type) {
        case PAYMENT.LOAD:
            return {
                ...state,
                isLoading: true,
                allPayment: []
            };
        case PAYMENT.CLEAR:
            return {
                ...state,
                allPayment: [],
                payment: null
            };
        case PAYMENT.LOAD_SUCCESS:
            console.log(action.payment)
            let allPayments = [...state.allPayment, action.payment]
            return {
                ...state,
                isLoading: false,
                payment: action.payment,
                allPayment:allPayments
            };
        case PAYMENT.LOAD_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        default:
            return state

    }

};

export default payment;

import {GROUPPAYMENTS} from '../constants';

const myGroupPayments = (state = {myGroupPayments: {payments:[]}, allGroupPayments:[]}, action) => {
    switch (action.type) {
        case GROUPPAYMENTS.LOAD:
            return {
                ...state,
                isLoading: false,
                myGroupPayments: {payments:[]},
                allGroupPayments:[]
            };
        case GROUPPAYMENTS.CLEAR:
            return {
                ...state,
                myGroupPayments: null
            };
        case GROUPPAYMENTS.LOAD_SUCCESS:
            let newGroupPayment = [...state.allGroupPayments,action.myGroupPayments]
            return {
                ...state,
                allGroupPayments: newGroupPayment,
                isLoading: true,
                myGroupPayments: action.myGroupPayments
            };
        case GROUPPAYMENTS.LOAD_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        default:
            return state

    }

};

export default myGroupPayments;

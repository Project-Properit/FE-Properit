import {GROUPPAYMENTS} from '../constants';

const myGroupPayments = (state = {myGroupPayments: {payments:[]}, allGroupPayments:[]}, action) => {
    switch (action.type) {
        case GROUPPAYMENTS.LOAD:
            console.log(action)
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
            console.log("SUCCESS",action.myGroupPayments)
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

import {GROUPPAYMENTS} from '../constants';

const myGroupPaymentsReducer = (state = {myGroupPayments: null, initialValues: null}, action) => {
    switch (action.type) {
        case GROUPPAYMENTS.LOAD:
            return {
                ...state,
                isLoading: true,
                myGroupPayments: null,
                initialValues: null
            };
        case GROUPPAYMENTS.CLEAR:
            return {
                ...state,
                initialValues: null
            };
        case GROUPPAYMENTS.LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                myGroupPayments: action.myGroupPayments[0],
                initialValues: {
                    groupPaymentsId: action.myGroupPayments[0].id,
                    title: action.myGroupPayments[0].title,
                    description: action.myGroupPayments[0].description,
                    amount: action.myGroupPayments[0].amount,
                    payments: action.myGroupPayments[0].payments,
                    creation_date: action.myGroupPayments[0].creation_date,
                }
            };
        case GROUPPAYMENTS.LOAD_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.error,
                initialValues: null

            };
        default:
            return state

    }

};

export default myGroupPaymentsReducer;

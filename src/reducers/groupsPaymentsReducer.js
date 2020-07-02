import {GROUPSPAYMENTS} from '../constants';

const myGroupsPayments = (state = {
    myGroupsPayments: [], create: {
        requesting: false,
        successful: false,
        messages: [],
        errors: [],
    }
}, action) => {
    switch (action.type) {
        case GROUPSPAYMENTS.LOAD:
            return {
                ...state,
                isLoading: true,
                myGroupsPayments: []
            };
        case GROUPSPAYMENTS.LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                myGroupsPayments: action.myGroupsPayments
            };
        case GROUPSPAYMENTS.LOAD_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.error

            };
        case GROUPSPAYMENTS.CREATE:
            return {
                requesting: true,
                successful: false,
                messages: [{body: 'Create ...', time: new Date()}],
                errors: [],
            }
        case GROUPSPAYMENTS.CREATE_SUCCESS:
            return {
                errors: [],
                messages: [{
                    body: `Successfully created group payments`,
                    time: new Date(),
                }],
                requesting: false,
                successful: true,
            }

        case GROUPSPAYMENTS.CREATE_ERROR:
            return {
                errors: state.errors.concat([{
                    body: action.error.toString(),
                    time: new Date(),
                }]),
                messages: [],
                requesting: false,
                successful: false,
            }
        default:
            return state

    }


};

export default myGroupsPayments;

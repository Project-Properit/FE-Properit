import {GROUPSPAYMENTS} from '../constants';

const myGroupsPayments = (state = {
    isLoading: false,
    myGroupsPayments: [],
    create: {
        requesting: false,
        successful: false,
        messages: [],
        errors: {},
    }
}, action) => {
    switch (action.type) {
        case GROUPSPAYMENTS.LOAD:
            return {
                ...state,
                isLoading: true,
                myGroupsPayments: [],
                create: {
                    requesting: false,
                    successful: false,
                    messages: [],
                    errors: {},
                }
            };
        case GROUPSPAYMENTS.LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                myGroupsPayments: action.myGroupsPayments,
                create: {
                    requesting: false,
                    successful: false,
                    messages: [],
                    errors: {},
                }
            };
        case GROUPSPAYMENTS.LOAD_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.error

            };
        case GROUPSPAYMENTS.CREATE:
            return {
                isLoading: true,
                myGroupsPayments: [],
                create: {
                    requesting: true,
                    successful: false,
                    messages: [{body: 'Create ...', time: new Date()}],
                    errors: {},
                }
            }
        case GROUPSPAYMENTS.CREATE_SUCCESS:
            return {
                create: {
                    errors: [],
                    messages: [{
                        body: `Successfully created group payments`,
                        time: new Date(),
                    }],
                    requesting: false,
                    successful: true,
                }
            }

        case GROUPSPAYMENTS.CREATE_ERROR:
            return {
                create: {
                    errors: state.errors.concat([{
                        body: action.error.toString(),
                        time: new Date(),
                    }]),
                    messages: [],
                    requesting: false,
                    successful: false,
                }
            }
        default:
            return state

    }


};

export default myGroupsPayments;

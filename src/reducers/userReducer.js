import {SIGNUP, USER} from '../constants';

const userReducer = (state = {
    user: {
        payment_details: {
            card_owner: '',
            card_number: '',
            valid_date: '',
            cvc: ''
        },
        focus: '',
        first_name: '',
        last_name: '',
        phone: '',
        password: '',
        email: '',
        user_type: ''
    }, all_users_were_load: [],update:{
    requesting: false,
    successful: false,
    messages: [],
    errors: []}
}, action) => {
    switch (action.type) {
        case USER.LOAD:
            return {
                ...state,
                isLoaded: false,
                all_users_were_load: [],
                requesting: false,
                successful: false,
                messages: [],
                errors: []
            }

        case USER.LOAD_SUCCESS:
            state.all_users_were_load.push(action.userObject);
            let test = state.all_users_were_load.filter((v, i, a) => a.findIndex(t => (JSON.stringify(t) === JSON.stringify(v))) === i)
            return {
                ...state,
                user: action.userObject,
                all_users_were_load: test,
                isLoaded: true,
            }
        case USER.CLEAR:
            return {
                ...state,
                user: {
                        payment_details: {
                            card_owner: '',
                            card_number: '',
                            valid_date: '',
                            cvc: ''
                        },
                        focus: '',
                        first_name: '',
                        last_name: '',
                        phone: '',
                        password: '',
                        email: '',
                        user_type: ''
                    },
                all_users_were_load: []
            }
        case USER.UPDATE_REQUESTING:
            return {
                ...state,
                requesting: true,
                successful: false,
                messages: [{body: 'Updating...', time: new Date()}],
                errors: [],
            }
        case USER.UPDATE_SUCCESS:
            localStorage.setItem('firstName', action.first_name)
            localStorage.setItem('lastName', action.last_name)
            return {
                ...state,
                errors: [],
                messages: [{
                    body: `Successfully update account for user`,
                    time: new Date(),
                }],
                requesting: false,
                successful: true,
            }
        case USER.UPDATE_ERROR:
            return {
                ...state,
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

export default userReducer;

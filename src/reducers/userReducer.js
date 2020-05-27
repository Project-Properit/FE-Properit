import {USER} from '../constants';

const userReducer = (state = {user: null}, action) => {
    switch (action.type) {
        case USER.LOAD:
            return {
                ...state,
                user: null,
            }

        case USER.LOAD_SUCCESS:
            return {
                ...state,
                user: action.userObject
            }

        default:
            return state
    }

};

export default userReducer;

import {USER} from '../constants';

const userReducer = (state = {user: null, all_users_were_load: []}, action) => {
    switch (action.type) {
        case USER.LOAD:
            return {
                ...state,
                user: null,
                isLoaded:false,
                all_users_were_load: []
            }

        case USER.LOAD_SUCCESS:
            state.all_users_were_load.push(action.userObject);
            let test = state.all_users_were_load.filter((v,i,a)=>a.findIndex(t=>(JSON.stringify(t) === JSON.stringify(v)))===i)
            return {
                ...state,
                user: action.userObject,
                all_users_were_load : test,
                isLoaded:true,
            }
        case USER.CLEAR:
            return {
                ...state,
                user:null,
                all_users_were_load: []
            }
        default:
            return state
    }

};

export default userReducer;

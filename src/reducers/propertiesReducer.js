import { PROPERTIES } from '../constants';

const myPropertiesReducer = (state = {myProperties:[]}, action) => {
    switch (action.type) {
        case PROPERTIES.LOAD: return {
            ...state,
            isLoading:true,
            myProperties:[]
        };
        case PROPERTIES.LOAD_SUCCESS: return {
            ...state,
            isLoading:false,
            myProperties:action.myProperties
        };
        case PROPERTIES.LOAD_FAIL: return {
            ...state,
            isLoading:false,
            error:action.error

        };
        default: return state

    }

};

export default myPropertiesReducer;

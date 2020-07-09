import { PROPERTIES } from '../constants';

const myPropertiesReducer = (state = {myProperties:[],chosenAssetId:null}, action) => {
    switch (action.type) {
        case PROPERTIES.LOAD: return {
            ...state,
            isLoading:true,
            myProperties:[],
            error:null
        };
        case PROPERTIES.LOAD_SUCCESS: return {
            ...state,
            isLoading:false,
            myProperties:action.myProperties,
            error:null
        };
        case PROPERTIES.LOAD_FAIL: return {
            ...state,
            isLoading:false,
            error:action.error

        };
        case PROPERTIES.CHOOSE_ASSET: return {
            ...state,
            chosenAssetId :action.assetId

        };
        default: return state

    }

};

export default myPropertiesReducer;

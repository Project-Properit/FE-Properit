import { PROPERTIES, PROPERTY } from '../constants';
const initialSate = {
    myProperties: [],
    chosenAssetId: localStorage.getItem('chosenAssetId')  === 'null' ? null : localStorage.getItem('chosenAssetId')
}
const myPropertiesReducer = (state = initialSate, action) => {
    switch (action.type) {
        case PROPERTIES.CLEAN: return {
            ...state,
            myProperties:[],
            error:null,
            chosenAssetId:null
        };
        case PROPERTIES.LOAD: return {
            ...state,
            isLoading:true,
            myProperties:[],
            error:null,
            chosenAssetId:null
        };

        case PROPERTIES.LOAD_SUCCESS: return {
            ...state,
            isLoading:false,
            myProperties:action.myProperties,
            error:null,
        };
        case PROPERTIES.LOAD_FAIL: return {
            ...state,
            isLoading:false,
            error:action.error

            };
        case PROPERTIES.CHOOSE_ASSET:
            return {
                ...state,
                chosenAssetId: action.assetId
            };
        default:
            return state

    }

};

export default myPropertiesReducer;

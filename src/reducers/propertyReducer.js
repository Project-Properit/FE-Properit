import { PROPERTY} from '../constants';

const myPropertyReducer = (state = {myProperty:null, initialValues:{tenant_list:[]}}, action) => {
    switch (action.type) {
        case PROPERTY.LOAD: return {
            ...state,
            isLoading:true,
            myProperty:null,
            initialValues:{tenant_list:[]}
        };
        case PROPERTY.CLEAR: return {
            ...state,
            initialValues:null
        };
        case PROPERTY.LOAD_SUCCESS: return {
            ...state,
            isLoading:false,
            myProperty:action.myProperty[0],
            initialValues:{
                assetId:action.myProperty[0].id,
                address:action.myProperty[0].address,
                comments:action.myProperty[0].comments,
                rent_fee:action.myProperty[0].rent_fee,
                room_num:action.myProperty[0].room_num,
                asset_type:action.myProperty[0].asset_type,
                creation_date:action.myProperty[0].creation_date,
                tenant_list:action.myProperty[0].tenant_list,
            }
        };
        case PROPERTY.LOAD_FAIL: return {
            ...state,
            isLoading:false,
            error:action.error,
            initialValues:null

        };
        default: return state

    }

};

export default myPropertyReducer;

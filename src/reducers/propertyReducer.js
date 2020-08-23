import { PROPERTY} from '../constants';

const myPropertyReducer = (state = {myProperty:{tenant_list:[], pending_tenants:[]}, initialValues:{tenant_list:[]}}, action) => {
    switch (action.type) {
        case PROPERTY.LOAD: return {
            ...state,
            isLoading:true,
            myProperty:{tenant_list:[],pending_tenants:[]},
            initialValues:{tenant_list:[], pending_tenants:[]}
        };
        case PROPERTY.CLEAR: return {
            ...state,
            initialValues:null
        };
        case PROPERTY.LOAD_SUCCESS:
            return {
            ...state,
            isLoading: false,
            myProperty:action.myProperty[0],
            initialValues:{
                assetId:action.myProperty[0].id,
                ownerId:action.myProperty[0].owner_id,
                address:action.myProperty[0].address,
                comments:action.myProperty[0].comments,
                rent_fee:action.myProperty[0].rent_fee,
                room_num:action.myProperty[0].room_num,
                asset_type:action.myProperty[0].asset_type,
                creation_date:action.myProperty[0].creation_date,
                tenant_list:action.myProperty[0].tenant_list,
                pending_tenants:action.myProperty[0].pending_tenants,
            }
        };
        case PROPERTY.LOAD_FAIL: return {
            ...state,
            isLoading:false,
            error:action.error,
            initialValues:null

        };
        case PROPERTY.ADD_DOCUMENT:
            return {
                ...state,
                myProperty: {
                    ...state.myProperty,
                    documents: [...state.myProperty.documents, action.document]
                }
            }
        case PROPERTY.DELETE_DOCUMENT:
            return {
                ...state,
                myProperty: {
                    ...state.myProperty,
                    documents: state.myProperty.documents.filter(doc => doc.doc_id !== action.document.doc_id)
                }
            }
        default: return state

    }

};

export default myPropertyReducer;

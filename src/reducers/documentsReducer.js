import {DOCUMENTS} from '../constants';

const myDocumentsReducer = (state = {myDocuments: []}, action) => {
    switch (action.type) {
        case DOCUMENTS.LOAD:
            return {
                ...state,
                isLoading: true,
                myDocuments: []
            };
        case DOCUMENTS.LOAD_SUCCESS:
            console.log(action);
            return {
                ...state,
                isLoading: false,
                myDocuments: action.myDocuments
            };
        case DOCUMENTS.LOAD_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.error

            };
        default:
            return state

    }

};

export default myDocumentsReducer;

import {combineReducers} from "redux";
import imagesReducer from './imagesReducer';
import myPropertiesReducer from "./propertiesReducer";
import myDocumentsReducer from "./documentsReducer";

const rootReducer = combineReducers({
    images: imagesReducer,
    myProperties: myPropertiesReducer,
    myDocuments: myDocumentsReducer,

});
export default rootReducer
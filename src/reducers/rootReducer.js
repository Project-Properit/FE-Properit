import {combineReducers} from "redux";
import imagesReducer from './imagesReducer';
import myPropertiesReducer from "./propertiesReducer";
import myDocumentsReducer from "./documentsReducer";
import { reducer as form } from 'redux-form'
import clientReducer from "./clientReducer";
import signupReducer from "./signUpReducer";
import loginReducer from "./loginReducer";
import filesUploadReducer from "./fileUploadReducer";

const rootReducer = combineReducers({
    images: imagesReducer,
    myProperties: myPropertiesReducer,
    fileUpload: filesUploadReducer,
    myDocuments: myDocumentsReducer,
    clientReducer,
    signupReducer,
    loginReducer,
    form

});
export default rootReducer
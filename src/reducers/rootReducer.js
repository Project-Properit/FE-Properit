import {combineReducers} from "redux";
import myPropertiesReducer from "./propertiesReducer";
import myDocumentsReducer from "./documentsReducer";
import { reducer as form } from 'redux-form'
import clientReducer from "./clientReducer";
import signupReducer from "./signUpReducer";
import loginReducer from "./loginReducer";
import myPropertyReducer from "./propertyReducer";

const rootReducer = combineReducers({
    myProperties: myPropertiesReducer,
    myDocuments: myDocumentsReducer,
    clientReducer,
    signupReducer,
    loginReducer,
    myPropertyReducer,
    form

});
export default rootReducer
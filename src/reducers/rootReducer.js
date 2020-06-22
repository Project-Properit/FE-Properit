import {combineReducers} from "redux";
import myPropertiesReducer from "./propertiesReducer";
import myDocumentsReducer from "./documentsReducer";
import { reducer as form } from 'redux-form'
import clientReducer from "./clientReducer";
import signupReducer from "./signUpReducer";
import loginReducer from "./loginReducer";
import myPropertyReducer from "./propertyReducer";
import filesUploadReducer from "./fileUploadReducer";
import myGroupsPaymentsReducer from "./groupsPaymentsReducer"
import myGroupPaymentsReducer from "./groupPaymentsReducer"
import userReducer from "./userReducer";
import payment from "./paymentReducer";

const rootReducer = combineReducers({
    myProperties: myPropertiesReducer,
    myGroupsPayments: myGroupsPaymentsReducer,
    myGroupPayments: myGroupPaymentsReducer,
    fileUpload: filesUploadReducer,
    myDocuments: myDocumentsReducer,
    userReducer,
    clientReducer,
    signupReducer,
    loginReducer,
    myPropertyReducer,
    payment,
    form

});
export default rootReducer
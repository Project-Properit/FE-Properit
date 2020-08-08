import {combineReducers} from "redux";
import myPropertiesReducer from "./propertiesReducer";
import myDocumentsReducer from "./documentsReducer";
import { reducer as form } from 'redux-form'
import clientReducer from "./clientReducer";
import signupReducer from "./signUpReducer";
import loginReducer from "./loginReducer";
import myPropertyReducer from "./propertyReducer";
import filesUploadReducer from "./fileUploadReducer";
import myGroupsPayments from "./groupsPaymentsReducer"
import myGroupPaymentsReducer from "./groupPaymentsReducer"
import userReducer from "./userReducer";
import payment from "./paymentReducer";
import myPaymentsReducer from "./myPaymentsReducer";
import renterReducer from "./renterReducer";

const rootReducer = combineReducers({
    myProperties: myPropertiesReducer,
    myGroupsPayments,
    myGroupPayments: myGroupPaymentsReducer,
    fileUpload: filesUploadReducer,
    myDocuments: myDocumentsReducer,
    userReducer,
    clientReducer,
    signupReducer,
    loginReducer,
    myPropertyReducer,
    payment,
    myPaymentsReducer,
    renterReducer,
    form

});
export default rootReducer
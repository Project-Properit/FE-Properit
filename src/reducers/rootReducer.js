import {combineReducers} from "redux";
import imagesReducer from './imagesReducer';
import myPropertiesReducer from "./propertiesReducer";
import filesUploadReducer from "./fileUploadReducer";

const rootReducer = combineReducers({
    images: imagesReducer,
    myProperties: myPropertiesReducer,
    fileUpload: filesUploadReducer,

});
export default rootReducer
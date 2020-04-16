import {combineReducers} from "redux";
import imagesReducer from './imagesReducer';
import myPropertiesReducer from "./propertiesReducer";

const rootReducer = combineReducers({
    images: imagesReducer,
    myProperties: myPropertiesReducer,

});
export default rootReducer
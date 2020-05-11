import _ from 'lodash';
import { FILEUPLOAD } from '../constants';

const initialState = {
    files: [],
    existedFiles: []
}

const filesUploadReducer = (state = initialState, action) => {
    if (action.type === FILEUPLOAD.SET_FILES) {
        // const newFiles = _.concat(state.file, action.files)
        const newState = {
            ...state,
            files: action.files
        }
        console.log(newState);
        return newState;
    }if (action.type === FILEUPLOAD.SET_EXISTED_FILES) {
        return {
            ...state,
            existedFiles: action.existedFiles
        }
    }
    if (action.type === FILEUPLOAD.SET_FILES) {
        const newFiles = _.concat(state.file, action.files)
        const newState = {
            ...state,
            files: newFiles
        }
        console.log(newState);
        return newState;
    }
    console.log(state);
    return state;
};

export default filesUploadReducer;

import _ from 'lodash';
import { FILEUPLOAD } from '../constants';

const initialState = {
    files: [],
    existedFiles: []
}

const filesUploadReducer = (state = initialState, action) => {
    if (action.type === FILEUPLOAD.SET_EXISTED_FILES) {
        return {
            ...state,
            existedFiles: action.existedFiles
        }
    }
    if (action.type === FILEUPLOAD.SET_FILES) {
        const newState = {
            ...state,
            files: action.files
        }
        return newState;
    }

    if (action.type === FILEUPLOAD.ADD_FILES) {
        const newFiles = _.concat(state.files, action.files)
        const newState = {
            ...state,
            files: newFiles

        }
        return newState;
    }
    if (action.type === FILEUPLOAD.DELETE_FILES) {
        const newFiles = _.concat(state.files, action.files)
        const newState = {
            ...state,
            files: newFiles
        }
        return newState;
    }
    return state;
};

export default filesUploadReducer;

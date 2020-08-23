import { FILEUPLOAD } from "../constants";

const setFiles = (files) => ({
    type: FILEUPLOAD.SET_FILES,
    files,
})

const setExistedFiles = (existedFiles) => ({
    type: FILEUPLOAD.SET_EXISTED_FILES,
    existedFiles,
})

const addFiles = (files) => ({
    type: FILEUPLOAD.ADD_FILES,
    files,
})

const deleteFiles = (files) => ({
    type: FILEUPLOAD.DELETE_FILES,
    files,
})


export { setFiles, setExistedFiles, addFiles, deleteFiles };
import React, {useState} from "react";
import axios from 'axios';
import { AttachFile, Cancel} from "@material-ui/icons";
import {Typography, Button, Link} from "@material-ui/core";
import Files from "react-files";
import FilesList from "./filesList";
import "./filesUpload.css";
import {connect} from "react-redux";
import { setFiles, setExistedFiles, addFiles, deleteFiles } from "../../../actions/fielsUploadActions";

const ADD_FILES_TEXT = "הוספת קבצים";
const DRAG_AND_DROP_ZONE_TEXT = "לחץ או גרור לכאן את הקובץ שתרצה להעלות";
const DELETE_ALL_FILES_TEXT = "מחק הכל";


function FilesUpload (props) {

    const {addFiles, maxFiles, existedFiles, setExistedFiles } = props;

    const [files, setFiles] = useState([]);

    const setNewFiles = React.useCallback((newFiles) => {
        setFiles(newFiles);
        props.setFiles([...props.files, ...newFiles]);
        props.foo([...props.files, ...newFiles]);
    }, [props.foo, props.setFiles, props.files]);

    const filesRef = React.useRef();
    const onFilesChange = React.useCallback(newFiles => {
        newFiles[newFiles.length - 1].image = ''
        setNewFiles([...newFiles]);
        const formData = new FormData();
        formData.append("file", newFiles[newFiles.length - 1]);
        axios.post(`${window._env_.REACT_APP_API_URL}/assets/5ecd23e452a93c7170031c8e/documents`, formData, {
            headers: {
                'x-access-tokens':localStorage.getItem('token') || '',
                "Content-Type": "multipart/form-data"
            }
        }).then(response => {
            console.log("Done")
            console.log(response.data)
            newFiles[newFiles.length - 1].image = response.data.document_url || ''
            setNewFiles([...newFiles])
        }).catch((e) => {
            console.log(e)
        })
    }, [setNewFiles]);

    const deleteFile = React.useCallback(fileId => {
        const deletedFile = files.find(file => file.id.toString() === fileId.toString());

        if (deletedFile) {
            filesRef.current.removeFile(deletedFile);
            setNewFiles(files.filter(f => f.id.toString() !== deletedFile.id.toString()));
        }

        // axios.delete(`${window._env_.REACT_APP_API_URL}/assets/5ecd23e452a93c7170031c8e`, formData, {
        //     headers: {
        //         'x-access-tokens':localStorage.getItem('token') || '',
        //         "Content-Type": "multipart/form-data"
        //     }
        // }).then(() => {
        //     console.log("Done")
        // }).catch((e) => {
        //     console.log(e)
        // })

    }, [files, setNewFiles]);

    const deleteExistedFile = React.useCallback(fileId => {
        const deletedFile = existedFiles.find(file => file._id.toString() === fileId.toString());
        setExistedFiles(existedFiles.filter(f => f !== deletedFile));
    }, [existedFiles, setExistedFiles]);

    const deleteAllFiles = React.useCallback(() => {
        filesRef.current.removeFiles();
        setNewFiles([]);
        setExistedFiles([]);
    }, [setNewFiles, setExistedFiles]);

    return (
        <div className="App">
            <div className="filesUploadContainer">
            <Typography variant="button" display="block">
                {ADD_FILES_TEXT} ({maxFiles} מקסימום)
            </Typography>
            <Files
                ref={filesRef}
                className={`filesDropzone${maxFiles === files.length + existedFiles.length ? " hidden" : ""}`}
                onChange={onFilesChange}
                multiple={maxFiles > 1}
                maxFiles={maxFiles - existedFiles.length}
                accepts={['image/png', '.pdf']}
                maxFileSize={10000000}
                minFileSize={0}
                clickable
            >
                <AttachFile />
                <span>{DRAG_AND_DROP_ZONE_TEXT}</span>
            </Files>
            <FilesList
                files={files}
                existedFiles={existedFiles}
                deleteFileHandler={deleteFile}
                deleteExistedFileHandler={deleteExistedFile} />

            {/*{*/}
            {/*    files.length + existedFiles.length > 0 ?*/}
            {/*        <Button*/}
            {/*            id="deleteAllFiles"*/}
            {/*            color="secondary"*/}
            {/*            variant="contained"*/}
            {/*            onClick={deleteAllFiles}*/}
            {/*            startIcon={<Cancel />}*/}
            {/*        >*/}
            {/*            {DELETE_ALL_FILES_TEXT}*/}
            {/*        </Button> : ""*/}
            {/*}*/}
            </div>
        </div>);
};

FilesUpload.defaultProps = {
    maxFiles: 3,
    files: [],
    addFiles: () => {},
    existedFiles: [],
    setFiles: () => { },
    setExistedFiles: () => { },
    foo: () => {},
};

const mapStateToProps = (state) => {
    console.log(state);
    return ({
        properties: state.myProperties,
        // files: state.fileUpload.files,
        existedFiles: state.fileUpload.existedFiles
    });
}

const mapDispatchToProps = dispatch => ({
    setFiles: (files) => dispatch(setFiles(files)),
    setExistedFiles: (existedFiles) => dispatch(setExistedFiles(existedFiles)),
    addFiles: (files) => dispatch(addFiles(files)),
    deleteFiles: (files) => dispatch(deleteFiles(files))


});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(FilesUpload);
// export default FilesUpload;

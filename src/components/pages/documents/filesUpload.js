import React from "react";
import { AttachFile, Cancel } from "@material-ui/icons";
import { Typography, Button } from "@material-ui/core";
import Files from "react-files";
import FilesList from "./filesList";
import "./filesUpload.css";
import {connect} from "react-redux";
import { setFiles, setExistedFiles, addFiles } from "../../../actions/fielsUploadActions";


const ADD_FILES_TEXT = "הוספת קבצים";
const DRAG_AND_DROP_ZONE_TEXT = "לחץ או גרור לכאן את הקובץ שתרצה להעלות";
const DELETE_ALL_FILES_TEXT = "מחק הכל";

/*
    files - new files that the client uploaded from his computer (type: 'Files'), they containes the actuall
    contnet and stored in the request state until they uploaded to azure.

    existedFiles- the files that already uploaded to azure, and saved in the mission state as metaData of the files
    with id for the blob in azure. This props exist to be able to display the already exists files, and remove them.

    how to use?
        for files:
        when you want to upload the files, you need to add id to the file for uploadFiles api:
            use: files.map(file => ({id: `ID()_file.name', browserFile: file}))
            then use FileToDbModel from utils with the above object to create object that can be stored in mongo
            (the id is the reference to azure).

        for existed files:
            there is no need to upload them to azure, you can remove them and the backend is responsible to delete from azure
*/
//{ files, setFiles, maxFiles, existedFiles, setExistedFiles }
function FilesUpload (props) {

    const { files, setFiles, maxFiles, existedFiles, setExistedFiles } = props;

    const filesRef = React.useRef();

    const onFilesChange = React.useCallback(newFiles => {
        console.log(`hello: ${newFiles}`);
        setFiles(newFiles);
    }, [setFiles]);

    const deleteFile = React.useCallback(fileId => {
        const deletedFile = files.find(file => file.id.toString() === fileId.toString());

        if (deletedFile) {
            filesRef.current.removeFile(deletedFile);
            setFiles(files.filter(f => f !== deletedFile));
        }
    }, [files, setFiles]);

    const deleteExistedFile = React.useCallback(fileId => {
        const deletedFile = existedFiles.find(file => file._id.toString() === fileId.toString());
        setExistedFiles(existedFiles.filter(f => f !== deletedFile));
        // TODO: delete from azure
    }, [existedFiles, setExistedFiles]);

    const deleteAllFiles = React.useCallback(() => {
        filesRef.current.removeFiles();
        setFiles([]);
        setExistedFiles([]);
        // TODO: delete all the existedFiles from azure
    }, [setFiles, setExistedFiles]);


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
            {
                files.length + existedFiles.length > 0 ?
                    <Button
                        id="deleteAllFiles"
                        color="secondary"
                        variant="contained"
                        onClick={deleteAllFiles}
                        startIcon={<Cancel />}
                    >
                        {DELETE_ALL_FILES_TEXT}
                    </Button> : ""
            }
            </div>
        </div>);
};

FilesUpload.defaultProps = {
    maxFiles: 3,
    files: [],
    existedFiles: [],
    setFiles: () => { },
    setExistedFiles: () => { }
};

const mapStateToProps = ({ files, existedFiles }) => ({
    files,
    existedFiles
});

const mapDispatchToProps = dispatch => ({
    setFiles: (files) => dispatch(setFiles(files)),
    setExistedFiles: (existedFiles) => dispatch(setExistedFiles(existedFiles)),
    addFiles: (files) => dispatch(addFiles(files))


});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(FilesUpload);
// export default FilesUpload;

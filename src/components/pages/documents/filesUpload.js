import React, { useState } from "react";
import axios from 'axios';
import {uploadFile} from '../../../api.js';
import { AttachFile } from "@material-ui/icons";
import { Typography } from "@material-ui/core";
import Files from "react-files";
import FilesList from "./filesList";
import "./filesUpload.css";
import { connect } from "react-redux";
import { addFiles, deleteFiles, setExistedFiles, setFiles } from "../../../actions/fielsUploadActions";

const ADD_FILES_TEXT = "Add Files";
const DRAG_AND_DROP_ZONE_TEXT = "Click Here Or Drag Files";


function FilesUpload(props) {
	const {maxFiles, existedFiles, setExistedFiles} = props;

	const [files, setFiles] = useState([]);

	const setNewFiles = React.useCallback(newFiles => {
		setFiles(newFiles);
		props.setFiles([...props.files, ...newFiles]);
		props.foo([...props.files, ...newFiles]);
	}, [setFiles, props]);

	const filesRef = React.useRef();
	const onFilesChange = React.useCallback(newFiles => {
		if(newFiles && newFiles.length > 0) {
			newFiles[newFiles.length - 1].image = ''
			setNewFiles([...newFiles]);
		}
		// const formData = new FormData();
		// formData.append('fileName', newFiles[newFiles.length - 1]);
	}, [setNewFiles, process.env]);

	const onFilesError = React.useCallback(error => {
		if(error.code === 2) {
			alert('הקובץ שנבחר גדול מידי');
		} else {
			alert(error.message)
		}
	})

	const deleteFile = React.useCallback(fileId => {
		const deletedFile = files.find(file => file.id.toString() === fileId.toString());

		if (deletedFile) {
			filesRef.current.removeFile(deletedFile);
			setNewFiles(files.filter(f => f.id.toString() !== deletedFile.id.toString()));
		}


	}, [files, setNewFiles]);

	const deleteExistedFile = React.useCallback(fileId => {
		const deletedFile = existedFiles.find(file => file._id.toString() === fileId.toString());
		setExistedFiles(existedFiles.filter(f => f !== deletedFile));
	}, [existedFiles, setExistedFiles]);

	return (
		<div className="App">
			<div className="filesUploadContainer">
				<Typography variant="button" display="block">
					{ADD_FILES_TEXT} (Maximum {maxFiles} )
				</Typography>
				<Files
					ref={filesRef}
					className={`filesDropzone${maxFiles === files.length + existedFiles.length ? " hidden" : ""}`}
					onChange={onFilesChange}
					onError={onFilesError}
					multiple={maxFiles > 1}
					maxFiles={maxFiles - existedFiles.length}
					accepts={['image/png', '.pdf']}
					maxFileSize={10000000}
					minFileSize={0}
					clickable
				>
					<AttachFile/>
					<span>{DRAG_AND_DROP_ZONE_TEXT}</span>
				</Files>
				<FilesList
					files={files}
					existedFiles={existedFiles}
					deleteFileHandler={deleteFile}
					deleteExistedFileHandler={deleteExistedFile}/>
			</div>
		</div>);
};

FilesUpload.defaultProps = {
	maxFiles: 3,
	files: [],
	addFiles: () => {
	},
	existedFiles: [],
	setFiles: () => {
	},
	setExistedFiles: () => {
	},
	foo: () => {
	}
};

const mapStateToProps = (state) => {
	return ({
		properties: state.myProperties,
		existedFiles: state.fileUpload.existedFiles
	});
}

const mapDispatchToProps = dispatch => ({
	setFiles: (files) => dispatch(setFiles(files)),
	setExistedFiles: (existedFiles) => dispatch(setExistedFiles(existedFiles)),
	addFiles: (files) => dispatch(addFiles(files)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FilesUpload);

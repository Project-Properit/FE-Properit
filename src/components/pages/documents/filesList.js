import React from "react";
import { IconButton } from "@material-ui/core";
import { Cancel } from "@material-ui/icons";

function FilesList(props) {
    const deleteFile = React.useCallback(e => {
        props.deleteFileHandler(e.currentTarget.getAttribute("fileid"));
    }, [props.deleteFileHandler]);

    const deleteExistFile = React.useCallback(e => {
        props.deleteExistedFileHandler(e.currentTarget.getAttribute("fileid"));
    }, [props.deleteExistedFileHandler]);

    const allFiles = [...props.files
        .map(file => (
            { id: file.id,
                name: file.name,
                size: file.sizeReadable,
                image: file.image,
                onDelete: deleteFile })),
    ...props.existedFiles
        .map(existFile => (
            { id: existFile._id,
                name: existFile.name,
                size: existFile.size,
                image: existFile.image,
                onDelete: deleteExistFile }))];


    return <ol className="filesList">
        {
            allFiles.map(file => {
                const urlFile = file.image.substring(0, file.image.length - 6)
                return (<li key={file.id}>
                <div className="file">
                    <span className="fileName">{file.name}</span>
                    <span>({file.size})</span>
                    <IconButton color="secondary" onClick={file.onDelete} fileid={file.id}>
                        <Cancel />
                    </IconButton>
                    {urlFile.endsWith('.pdf') ?
                        <a href= {file.image}>{file.image}</a>
                    :
                        <img src={file.image}></img>
                    }
                </div>
            </li>)
            })
        }
    </ol>;
};

export default FilesList;
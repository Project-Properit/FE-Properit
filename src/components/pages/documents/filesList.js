import React from "react";

import { IconButton } from "@material-ui/core";
import { Cancel } from "@material-ui/icons";

const FilesList = ({ files, existedFiles, deleteFileHandler, deleteExistedFileHandler }) => {
    const deleteFile = React.useCallback(e => {
        deleteFileHandler(e.currentTarget.getAttribute("fileid"));
    }, [deleteFileHandler]);

    const deleteExistFile = React.useCallback(e => {
        deleteExistedFileHandler(e.currentTarget.getAttribute("fileid"));
    }, [deleteExistedFileHandler]);

    const allFiles = [...files
        .map(file => (
            { id: file.id,
                name: file.name,
                size: file.sizeReadable,
                onDelete: deleteFile })),
    ...existedFiles
        .map(existFile => (
            { id: existFile._id,
                name: existFile.name,
                size: existFile.size,
                onDelete: deleteExistFile }))];

    return <ol className="filesList">
        {
            allFiles.map(file => <li key={file.id}>
                <div className="file">
                    <span className="fileName">{file.name}</span>
                    <span>({file.size})</span>
                    <IconButton color="secondary" onClick={file.onDelete} fileid={file.id}>
                        <Cancel />
                    </IconButton>
                </div>
            </li>)
        }
    </ol>;
};

export default React.memo(FilesList);
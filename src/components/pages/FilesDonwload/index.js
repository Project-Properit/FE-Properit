import React, { useRef, useCallback } from "react";
import { getFileUrl } from "api/filesApi";
import { Link } from "@material-ui/core";
import { AttachFile } from "@material-ui/icons";
// import cogoToast from "cogo-toast";
import "./FilesDownload.css";

const FilesDownload = ({ files }) => {
    const refs = useRef({});

    const onDownload = useCallback(async e => {
        try {
            const fileId = e.target.attributes.file_id.value;
            const linkRef = refs.current[fileId];

            const fileUrl = await getFileUrl(fileId);
            linkRef.setAttribute("href", fileUrl);
            linkRef.click();
        } catch (err) {
            // cogoToast.error(<div> לא ניתן להוריד את הקובץ </div>);
            // console.log(err);
        }
    }, []);

    return (
        <ol>
            {files.map(file => (
                <li className="container" key={file._id}>
                    <AttachFile fontSize="inherit" />
                    <Link file_id={file._id} className="link" onClick={onDownload}>{file.name}</Link>
       ///             <a hidden ref={el => refs.current[file._id] = el} download />
                </li>
            ))}
        </ol>
    );
};

export default FilesDownload;
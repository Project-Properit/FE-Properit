import React, {useCallback, useState} from "react";

import { IconButton, Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
// import FilesDownload from "../FilesDonwload";
import SimpleValidationModal from "../Modal/SimpleValidationModal";

import moment from "moment";

const DocumentCard = ({ document, deleteHandler, loggedInUser }) => {
    const [deleteModalOpened, setDeleteModalOpened] = useState(false);

    const openModal = useCallback(() => {
        setDeleteModalOpened(true);
    }, []);

    const closeModal = useCallback(() => {
        setDeleteModalOpened(false);
    }, []);

    const deleteDocument = useCallback(() => {
        closeModal();
        deleteHandler(document._id);
    }, [document]);

    console.log(document);

    return <div key={document._id} className="documentCard">
        {
            deleteModalOpened ? <SimpleValidationModal open onApprove={deleteDocument} closeMe={closeModal} /> : ""
        }
        <div className="documentHeader">
            <Typography variant="h4" className="documentHeader">
                {document.name}
            </Typography>
            {
                <IconButton onClick={openModal}>
                    <Delete />
                </IconButton>
            }
        </div>
        <div className="documentData">
            <span>
                <b>נוצר ב:</b> {" "} {moment(document.creationTime).format("HH:mm DD/MM/YYYY")}
            </span>
            <div>
                <b>קבצים מצורפים: </b>
                { document.files.map(file => (
                    <a href= {file.image}>{file.image}</a>
                )) }

                {/*{urlFile.endsWith('.pdf') ?*/}
                {/*    <a href= {document.files.image}>{document.files}</a>*/}
                {/*    :*/}
                {/*    <img src={document.files}></img>*/}
                {/*}*/}
            </div>
        </div>
    </div>;
};

export default DocumentCard;
import React, { useCallback, useState } from "react";

import { IconButton, Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
// import FilesDownload from "../FilesDonwload";
import SimpleValidationModal from "../Modal/SimpleValidationModal";

import moment from "moment";

const DocumentCard = ({document, deleteHandler, loggedInUser}) => {
	const [deleteModalOpened, setDeleteModalOpened] = useState(false);

	const openModal = useCallback(() => {
		setDeleteModalOpened(true);
	}, []);

	const closeModal = useCallback(() => {
		setDeleteModalOpened(false);
	}, []);

	const deleteDocument = useCallback(() => {
		closeModal();
		deleteHandler(document.dbx_path);
	}, [closeModal, deleteHandler, document]);

	return <div className="documentCard">
		{
			deleteModalOpened ? <SimpleValidationModal open onApprove={deleteDocument} closeMe={closeModal}/>: ""
		}
		<div className="documentHeader">
			<Typography variant="h4" className="documentHeader">
				{document.doc_name}
			</Typography>
			{
				(localStorage.getItem('isOwner')) === 'true' ?
				<IconButton onClick={openModal}>
					<Delete/>
				</IconButton>:null
			}
		</div>
		<div className="documentData">
            <span>
                <b>Created: </b>{" "} {moment(document.creation_date).format("HH:mm DD/MM/YYYY")}
            </span>
			<div>
				<a href={document.url}><b>Your Files</b></a>
			</div>
		</div>
	</div>;
};

export default DocumentCard;
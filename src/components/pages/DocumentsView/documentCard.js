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
	}, [document]);

	return <div className="documentCard">
		{
			deleteModalOpened ? <SimpleValidationModal open onApprove={deleteDocument} closeMe={closeModal}/>: ""
		}
		<div className="documentHeader">
			<Typography variant="h4" className="documentHeader">
				{document.doc_name}
			</Typography>
			{
				<IconButton onClick={openModal}>
					<Delete/>
				</IconButton>
			}
		</div>
		<div className="documentData">
            <span>
                <b>נוצר ב:</b>{" "} {moment(document.creationTime).format("HH:mm DD/MM/YYYY")}
            </span>
			<div>
				<b>קבצים מצורפים: </b>
				<a href={document.url}>{document.url}</a>
			</div>
		</div>
	</div>;
};

export default DocumentCard;
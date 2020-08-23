import React, { useCallback, useState } from "react";

import { IconButton, Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
// import FilesDownload from "../FilesDonwload";
import SimpleValidationModal from "../Modal/SimpleValidationModal";
import FileViewer from 'react-file-viewer';
import { Document, Page } from 'react-pdf';
import {PDFtoIMG} from 'react-pdf-to-image';
import PDFViewer from 'pdf-viewer-reactjs'
import FilePreview from 'react-preview-file';

import moment from "moment";

import FilePdf from "../../../images/download.pdf"

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

	console.log((document.preview_url))
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);

	// const docType = document.dbx_path.substring(document.dbx_path.lastIndexOf(".") + 1).toLowerCase();
	// const docUrlTest = "https://content.dropboxapi.com/apitl/1/AgApqYi-wWVRplOP-Bxthnc1rCQIeVVBaTRua3O3fUX2MNmPMMj1aOC0ebjd0AmXo2ITqM1DBeG1fI4b3rYewN25Fjg9O6Zk5oRyudcB6FC4Qt4I6jhEh6X2S0NAMxjqG1QQ9PTSfFShsotpv2QqoaWA5lyJcMzrC9SdZG9h5DRa_Tuli6XQxJzYhwzDJoHChF0Ff9I21L3cw2sXGjHx8vnJF1PK7MBP57oyFHuEb3-_QJhNSagAm-C2zkrlK6nufeyHpUklKOkCpIBSt701Gy3m-JI7h0baf4hqwvmC98tCPuo3piiLBs135B-LX55YKsoJmbm8K3iovZDyYTdOe9nGUIY_XUi5LsvOEGGxt8hLvRckmoQT0pFEZpMx-cn0iHw"
	//
	// function onDocumentLoadSuccess({ numPages }) {
	// 	setNumPages(numPages);
	// }



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
				<IconButton onClick={openModal} style={{boxShadow: "none"}}>
					<Delete/>
				</IconButton>:null
			}
		</div>

		<div className="documentData">
			<FileViewer
				fileType={'pdf'}
				filePath={FilePdf}
				// fileType={docType}
				// filePath={(document.preview_url)}
			/>
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
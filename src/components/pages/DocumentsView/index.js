import React, { useCallback, useState } from "react";

import { Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import NewDocumentModal from "./newDocumentModal";
import DocumentCard from "./documentCard";
import "./documentsView.css";


const DocumentsView = (props) => {
	const [newDocumentModalOpened, setNewDocumentModalOpened] = useState(false);
	const [setDocuments] = useState([]);

	const openModal = useCallback(() => {
		setNewDocumentModalOpened(true);
	}, []);

	const closeModal = useCallback(() => {
		setNewDocumentModalOpened(false);
	}, []);
	const deleteDoc = (ii) => {
		console.log(ii)
	}


	return <div id="documentsContainer">
		{
			newDocumentModalOpened ?
				<NewDocumentModal closeHandler={closeModal}
					// createDocumentHandler={(document) => setDocuments([document])}
				/>
				: ""
		}
		{
			<Button variant="outlined" color="primary" className="createDocumentButton" onClick={openModal}>
				<Add/>
				הוסף מסמך
			</Button>
		}
		<div id="documentsList">
			{
				Object.keys(props.documents).map(function (key, index) {
					console.log('-----', props.documents[key])
					return (
						<DocumentCard
							key={index}
							document={props.documents[key]}
							deleteHandler={(ii) => deleteDoc(ii)}
						/>
					)
				})
			}
		</div>
	</div>;
};

export default DocumentsView;
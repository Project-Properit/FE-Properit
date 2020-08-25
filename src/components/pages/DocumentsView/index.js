import React, {useCallback, useState} from "react";

import {Button} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import NewDocumentModal from "./newDocumentModal";
import DocumentCard from "./documentCard";
import "./documentsView.css";
import {deleteDocument} from "../../../api";


const DocumentsView = (props) => {
    const [newDocumentModalOpened, setNewDocumentModalOpened] = useState(false);

    const openModal = useCallback(() => {
        setNewDocumentModalOpened(true);
    }, []);

    const closeModal = useCallback(() => {
        setNewDocumentModalOpened(false);
    }, []);
    const propId = window.location.pathname.replace('/properties/', '').replace('/documents', '');

    const deleteDoc = (document) => {
            deleteDocument(document.doc_id, propId).then(reponse => {
            alert('File Successfully Deleted');
            props.deleteDocument(document, propId);
        });

    }

    return <div id="documentsContainer">
        <h2>Documents</h2>
        {
                newDocumentModalOpened ?
                    <NewDocumentModal
                        tenants={props.tenants}
                        closeHandler={closeModal}
                        createDocumentHandler={props.createNewDocument}
                        loadDocuments={props.loadProperty}
                    />
                    : ""
        }
        {(localStorage.getItem('isOwner')) === 'true' ?
        <Button variant="outlined" color="primary" className="createDocumentButton" onClick={openModal}>
            <Add/>
            Add Document
        </Button>:null
        }
        <div id="documentsList">
            {props.documents &&
            Object.keys(props.documents).map(function (key, index) {
                return (
                    <DocumentCard
                        key={index}
                        document={props.documents[key]}
                        deleteHandler={() => deleteDoc(props.documents[key])}
                    />
                )
            })
            }
        </div>
    </div>;
};

export default DocumentsView;
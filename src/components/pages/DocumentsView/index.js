import React, { useState, useEffect, useCallback } from "react";

import { Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import NewDocumentModal from "./newDocumentModal";
import DocumentCard from "./documentCard";

// import { fetchUserDocuments, createDocument, deleteDocument } from "api/documentsApi";
// import { uploadFiles } from "api/filesApi";

// import useGlobalState from "state";
// import USER_TYPES from "utils/userTypes";
// import { ID } from "utils";
// import { fileToDbModel } from "utils/models";

import "./documentsView.css";

let canceled = false;

const DocumentsView = () => {
    const [newDocumentModalOpened, setNewDocumentModalOpened] = useState(false);
    const [documents, setDocuments] = useState([]);
    // const { loggedInUser, wrapWithLoading } = useGlobalState();

    // const reloadDocuments = () => {
    //     wrapWithLoading(async () => {
    //         try{
    //             const newDocuments = await fetchUserDocuments(loggedInUser._id);
    //             if (!canceled) {
    //                 setDocuments(newDocuments);
    //             }
    //         } catch (e) {
    //             console.log(e);
    //             // cogoToast.error("נכשלה קבלת המסמכים");
    //         }
    //     });
    // };

    // useEffect(() => {
    //     canceled = false;
    //     reloadDocuments();
    //     return () => canceled = true;
    // }, [loggedInUser._id]);

    const openModal = useCallback(() => {
        setNewDocumentModalOpened(true);
    }, []);

    const closeModal = useCallback(() => {
        setNewDocumentModalOpened(false);
    }, []);



    // const deleteDocumentHandler = useCallback(async documentId => {
    //     try {
    //         await deleteDocument(documentId);
    //         cogoToast.success("המסמך נמחק בהצלחה");
    //         reloadDocuments();
    //     } catch (e) {
    //         console.log(e);
    //         cogoToast.error("נכשלה מחיקת המסמך");
    //     }
    // });

    return <div id="documentsContainer">
        {
            newDocumentModalOpened ?
                <NewDocumentModal closeHandler={closeModal}
                                  createDocumentHandler={(document) => setDocuments([...documents, document])}
                />
                : ""
        }
        {
            // loggedInUser.type === USER_TYPES.ADMIN ?
                <Button variant="outlined" color="primary" className="createDocumentButton" onClick={openModal}>
                <Add />
                הוסף מסמך
            </Button>
            // : ""
        }
        <div id="documentsList">
            {
                documents.map(document => {
                    console.log(document);
                    return (
                        <DocumentCard
                            key={document._id}
                            // loggedInUser={loggedInUser}
                            // deleteHandler={deleteDocumentHandler}
                            document={document}
                        />
                    )
                })
            }
        </div>
    </div>;
};

export default DocumentsView;
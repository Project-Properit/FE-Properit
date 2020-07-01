import React, { useCallback, useState } from "react";
import { Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import NewPropertiesModal from "./newPropertiesModal";



const DocumentsView = (props) => {
    const [newPropertiesModalOpened, setNewPropertiesModalOpened] = useState(false);
    const [setDocuments] = useState([]);

    const openModal = useCallback(() => {
        setNewPropertiesModalOpened(true);
    }, []);

    const closeModal = useCallback(() => {
        setNewPropertiesModalOpened(false);
    }, []);

    return <div id="documentsContainer">
        {
            newPropertiesModalOpened ?
                <NewPropertiesModal closeHandler={closeModal}
                    // createDocumentHandler={(document) => setDocuments([document])}
                />
                : ""
        }
        {
            <Button variant="outlined" color="primary" className="createPropertiesButton" onClick={openModal}>
                <Add/>
                הוסף נכס
            </Button>
        }
    </div>;
};

export default DocumentsView;
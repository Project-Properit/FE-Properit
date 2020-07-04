import React, { useState, useCallback } from "react";

import MyModal from "../Modal/index";
import FilesUpload from "../documents/filesUpload";

import { TextField, RadioGroup, Radio, FormControlLabel, FormLabel, Button } from "@material-ui/core";


const validateDocument = (name, files) => ({
    isValid: (name !== null && name.length > 0) && files.length > 0,
    errors: {
        name: (name === null || name.length === 0),
        files: files.length === 0 ? "הכנס קבצים" : false
    }
});

const NewDocumentModal = ({ closeHandler, createDocumentHandler }) => {
    const [name, setName] = useState("");
    const [files, setFiles] = useState([]);
    const [errors, setErrors] = useState({});

    const reset = () => {
        setName("");
        setFiles([]);
    }

    const createDocument = useCallback(async () => {
        const trimmedName = name !== null ? name.trim() : name;
        const validation = validateDocument(trimmedName, files);
        if (validation.isValid) {
            // createDocumentHandler({ name: trimmedName, files});
            closeHandler();
            reset();
        } else {
            setErrors(validation.errors);
        }
    }, [name, files, setErrors, closeHandler]);

    return <MyModal open setOpen={closeHandler} closeMe={closeHandler} style={{ width: "30%" }}>
        <div style={{ padding: "24px", textAlign: "center" }}>
            <TextField
                value={name || ""}
                variant="outlined"
                label="שם"
                style={{ width: "100%", marginBottom: "24px" }}
                required
                error={errors.name}
                onChange={(event) => {
                    setName(event.target.value);
                }}
            />
            <br/>

            <br />
            <FilesUpload
                         files={files} foo={setFiles} maxFiles={1} name={name}
            />
            {
                errors.files ? <div style={{ marginTop: "10px", color: "red" }}>{errors.files}</div> : ""
            }
            <Button id="createButton" variant="outlined" onClick={createDocument} color="primary" style={{ marginTop: "10px" }}>
                צור מסמך
            </Button>
        </div>
    </MyModal>;
};

export default NewDocumentModal;
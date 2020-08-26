import React, { useState, useCallback } from "react";

import MyModal from "../Modal/index";
import FilesUpload from "../documents/filesUpload";

import { TextField, RadioGroup, Radio, FormControlLabel, FormLabel, Button } from "@material-ui/core";
import {uploadFile} from "../../../api";
import FormControl from "@material-ui/core/FormControl";

const validateDocument = (name, files) => ({
    isValid: (name !== null && name.length > 0) && files.length > 0,
    errors: {
        name: (name === null || name.length === 0),
        files: files.length === 0 ? "הכנס קבצים" : false
    }
});

const NewDocumentModal = ({loadDocuments, closeHandler, createDocumentHandler, tenants}) => {
    const [name, setName] = useState("");
    const [files, setFiles] = useState([]);
    const [errors, setErrors] = useState({});
    const [checked, setChecked] = useState("everyone");

    const reset = () => {
        setName("");
        setFiles([]);
    }

    const createDocument = useCallback(async () => {
        const trimmedName = name !== null ? name.trim() : name;
        const validation = validateDocument(trimmedName, files);
        if (validation.isValid) {
            const propId = window.location.pathname.replace('/properties/', '').replace('/documents', '');
            const formData = new FormData();
            formData.append(trimmedName, files[0]);
            formData.append('permission', checked)
            uploadFile(formData, propId).then(response => {
                createDocumentHandler(response.data[0]);
                alert('File Successfully uploaded')
                loadDocuments(propId)
            }).catch((e) => {
            })
            closeHandler()
            reset();
        } else {
            setErrors(validation.errors);
        }
    }, [name, files, checked, setErrors, closeHandler]);

    return (
        <MyModal open setOpen={closeHandler} closeMe={closeHandler} style={{width: "30%"}}>
            <div style={{padding: "24px", textAlign: "center"}}>
                <TextField
                    value={name || ""}
                    variant="outlined"
                    label="Name"
                    style={{width: "100%", marginBottom: "24px"}}
                    required
                    error={errors.name}
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                />
                <FormControl component="fieldset">
                    <FormLabel>Choose Who can see:</FormLabel>
                    <RadioGroup value={checked} onChange={(event => setChecked(event.target.value))}>
                        <FormControlLabel
                            control={<Radio/>}
                            label="Everyone"
                            value="everyone"
                        />
                        {tenants.map(tenant => (
                            <FormControlLabel
                                control={<Radio/>}
                                label={tenant.first_name + ' ' + tenant.last_name}
                                value={tenant.id}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
                <FilesUpload files={files} foo={setFiles} maxFiles={1} name={name}/>
                {
                    errors.files ? <div style={{marginTop: "10px", color: "red"}}>{errors.files}</div> : ""
                }
                <Button id="createButton" variant="outlined" onClick={createDocument} color="primary"
                        style={{marginTop: "10px"}}>
                    Create Document
                </Button>
            </div>
        </MyModal>
    )
};

export default NewDocumentModal;
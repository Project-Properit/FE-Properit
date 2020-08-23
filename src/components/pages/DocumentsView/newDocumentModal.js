import React, { useState, useCallback } from "react";

import MyModal from "../Modal/index";
import FilesUpload from "../documents/filesUpload";

import { TextField, RadioGroup, Radio, FormControlLabel, FormLabel, Button } from "@material-ui/core";
import {uploadFile} from "../../../api";

// const ALLOW_TO = {
//     EVERYONE: {
//         apiValue: ["owner", "tenant1"],
//         value: "EVERYONE",
//         text: "כולם"
//     },
//     TENANT1: {
//         apiValue: ["admin", "desk"],
//         value: "TENANT1",
//         text: "שוהם יעקב בלבד"
//     },
//     TENANT2: {
//         apiValue: ["admin", "desk"],
//         value: "TENANT2",
//         text: "רון ארביב בלבד"
//     },
// };

const validateDocument = (name, files) => ({
    isValid: (name !== null && name.length > 0) && files.length > 0,
    errors: {
        name: (name === null || name.length === 0),
        files: files.length === 0 ? "הכנס קבצים" : false
    }
});

const NewDocumentModal = ({ closeHandler, createDocumentHandler, propId }) => {
    const [name, setName] = useState("");
    const [files, setFiles] = useState([]);
    const [errors, setErrors] = useState({});
    // const [allowTo, setAllowTo] = useState(ALLOW_TO.EVERYONE.value);

    // const onAllowToChange = useCallback(e => {
    //     setAllowTo(e.target.value);
    // }, [setAllowTo]);

    const reset = () => {
        setName("");
        setFiles([]);
    }

    const createDocument = useCallback(async () => {
        const trimmedName = name !== null ? name.trim() : name;
        const validation = validateDocument(trimmedName, files);
        if (validation.isValid) {
            const propId = window.location.pathname.replace('/properties/','').replace('/documents','');
            const formData = new FormData();
            formData.append(trimmedName, files[0]);
            uploadFile(formData, propId).then(response => {
                createDocumentHandler(response.data[0]);
                alert('File Successfully uploaded')
            }).catch((e) => {
            })
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
                label="Name"
                style={{ width: "100%", marginBottom: "24px" }}
                required
                error={errors.name}
                onChange={(event) => {
                    setName(event.target.value);
                }}
            />
            <br/>
            {/*<div className="allowTo">*/}
            {/*    <FormLabel>מי רשאי לראות?</FormLabel>*/}
            {/*    <RadioGroup value={allowTo} onChange={onAllowToChange}>*/}
            {/*        {Object.values(ALLOW_TO).map(option => (*/}
            {/*            <FormControlLabel*/}
            {/*                key={option.value}*/}
            {/*                value={option.value}*/}
            {/*                label={option.text}*/}
            {/*                onChange={setAllowTo}*/}
            {/*                control={<Radio />}*/}
            {/*            />*/}
            {/*        ))*/}
            {/*        }*/}
            {/*    </RadioGroup>*/}
            {/*</div>*/}
            <br />
            <FilesUpload
                         files={files} foo={setFiles} maxFiles={1} name={name}
            />
            {
                errors.files ? <div style={{ marginTop: "10px", color: "red" }}>{errors.files}</div> : ""
            }
            <Button id="createButton" variant="outlined" onClick={createDocument} color="primary" style={{ marginTop: "10px" }}>
                Create Document
            </Button>
        </div>
    </MyModal>;
};

export default NewDocumentModal;
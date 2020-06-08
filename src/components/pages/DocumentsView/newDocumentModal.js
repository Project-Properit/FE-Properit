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
            createDocumentHandler({ name: trimmedName, files});
            closeHandler();
            reset();
        } else {
            setErrors(validation.errors);
        }
    }, [name, files, setErrors, closeHandler, createDocumentHandler]);


    //----
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         numPages: null,
    //         pageNumber: 1,
    //         browserFiles: [],
    //     }
    // }

    // addBrowserFiles = (newFiles) => {
    //     this.setState((prevState) => {
    //         const files = [...prevState.browserFiles, newFiles];
    //         return {browserFiles: files};
    //     })
    // }
    // const [browserFiles, setBrowserFiles] = useState([]);

    // componentDidMount() {
    //
    //
    //     console.log(React.version);
    //     const {userId} = this.props.match.params;
    //     this.props.loadDocuments(userId);
    // }
    // onDocumentLoadSuccess = ({ numPages }) => {
    //     this.setState({ numPages });
    // }
    //----

    React.useEffect(() => {
        console.log(files)
    }, [files]);

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
                    console.log(event.target.value);
                    setName(event.target.value);
                }}
            />
            <br/>

            <br />
            <FilesUpload
                         // file={doc.doc_location}
                         // onLoadSuccess={this.onDocumentLoadSuccess}
                         // files={this.state.browserFiles} setFiles={this.addBrowserFiles} maxFiles={3}
                         files={files} foo={setFiles} maxFiles={2}
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
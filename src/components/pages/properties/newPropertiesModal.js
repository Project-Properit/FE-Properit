import React, { useState, useCallback } from "react";

import MyModal from "../Modal/index";

import { TextField, RadioGroup, Radio, FormControlLabel, FormLabel, Button } from "@material-ui/core";


const validateProperties = (comment, address, room, rental ) => ({
    isValid: (comment !== null && comment.length > 0) &&
             (address !== null && address.length > 0) &&
             (room !== null && room.length > 0) &&
             (rental !== null && rental.length > 0),
    errors: {
        comment: (comment === null || comment.length === 0),
        address: (address === null || address.length === 0),
        room: (room === null || room.length === 0),
        rental: (rental === null || rental.length === 0)

            ? "הכנס ערכים" : false
    }
});

const NewPropertiesModal = ({ closeHandler, createProperiesHandler }) => {
    const [comment, setComment] = useState("");
    const [address, setAddress] = useState("");
    const [room, setRoom] = useState("");
    const [rental, setRental] = useState("");
    const [errors, setErrors] = useState({});

    const reset = () => {
        setComment("");
        setAddress("");
        setRoom("");
        setRental("");
    }

    const createProperties = useCallback(async () => {
        const trimmedComment = comment !== null ? comment.trim() : comment;
        const trimmedAddress = address !== null ? address.trim() : address;
        const trimmedRoom = room !== null ? room.trim() : room;
        const trimmedRental = rental !== null ? rental.trim() : rental;

        const validation = validateProperties(trimmedComment, trimmedAddress, trimmedRoom, trimmedRental);
        if (validation.isValid) {
            closeHandler();
            reset();
        } else {
            setErrors(validation.errors);
        }
    }, [comment, address, room, rental, setErrors, closeHandler]);

    return <MyModal open setOpen={closeHandler} closeMe={closeHandler} style={{ width: "30%" }}>
        <div style={{ padding: "24px", textAlign: "center" }}>
            <TextField
                value={address || ""}
                variant="outlined"
                label="Address"
                style={{ width: "100%", marginBottom: "24px" }}
                required
                error={errors.address}
                onChange={(event) => {
                    setAddress(event.target.value);
                }}
            />
            <br/>

            <br />
            <TextField
                value={room || ""}
                variant="outlined"
                error={errors.room}
                onChange={(event) => {
                    setRoom(event.target.value);
                }}
                type="number"
                label="מספר חדרים"
                required
                style={{ width: "100%", marginBottom: "24px" }}
            />
            <br/>

            <br />
            <TextField
                value={rental || ""}
                variant="outlined"
                error={errors.rental}
                onChange={(event) => {
                    setRental(event.target.value);
                }}
                type="number"
                label="סכום השכירות הכולל"
                required
                style={{ width: "100%", marginBottom: "24px" }}
            />
            <br/>

            <br />
            <TextField
                value={comment || ""}
                variant="outlined"
                label="הערה"
                style={{ width: "100%", marginBottom: "24px" }}
                required
                error={errors.comment}
                onChange={(event) => {
                    setComment(event.target.value);
                }}
            />
            <br/>

            <br />
            <Button id="createButton" variant="outlined" onClick={createProperties} color="primary" style={{ marginTop: "10px" }}>
              Create Property
            </Button>
        </div>
    </MyModal>;
};

export default NewPropertiesModal;
import React from "react";
import MyModal from "./index";
import { Button } from "@material-ui/core";

export default function SimpleValidationModal(props) {
    const { message, onApprove, color } = props;
    return (
        <MyModal
            {...props}
        >
            <div style={{
                padding: "24px",
                width: "300px",
                display: "flex",
                alignItems: "center",
                flexDirection: "column"
            }}
            >
                <div>
                    {message || "Are You Sure?"}
                </div>
                <br />
                <Button
                    variant="contained"
                    style={{ fontWeight: "bold", marginRight: "16px", backgroundColor: color || "#0a7ab0", color: "white" }}
                    onClick={onApprove}
                >
                    Yes
                </Button>
            </div>
        </MyModal>
    );
}
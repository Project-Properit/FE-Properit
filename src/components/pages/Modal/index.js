import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles(theme => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    }
}));

export default function MyModal(props) {
    const classes = useStyles();
    const { open, setOpen, children, closeMe, style } = props;

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            disableAutoFocus
            disableEnforceFocus
            open={open}
            onClose={closeMe ? closeMe : handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500
            }}
        >
            <Fade in={open}>
                <div
                    style={{
                        backgroundColor: "white",
                         borderRadius: "8px",
                        maxHeight: "78vh",
                        overflowY: "auto",
                        ...style
                    }}
                >
                    {open && children}
                </div>
            </Fade>
        </Modal>
    );
}

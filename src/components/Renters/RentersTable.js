import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});


function Row(props) {
    const {row} = props;
    const [open, setOpen] = React.useState(false);
    const [payModalOpened, setPayModalOpened] = useState(false);

    // const openModal = useCallback(() => {
    //     setPayModalOpened(true);
    // }, []);
    //
    // const closeModal = useCallback(() => {
    //     setPayModalOpened(false);
    // }, []);
    //
    // const handlePay = () => {
    //     let payObject = {paymentId:row.my_payment.payment_id, assetId:props.propId, userId:props.userId}
    //     props.payMethod(payObject)
    //     closeModal()
    // }

    const classes = useRowStyles();
    return (
        <React.Fragment>
            {/*{payModalOpened ?*/}
            {/*    <SimpleValidationModal open onApprove={handlePay} closeMe={closeModal}/>*/}
            {/*    : null}*/}
            <TableRow className={classes.root}>
                <TableCell component="th" scope="row">
                    {row.title}
                </TableCell>
                <TableCell align="center">{row.first_name}</TableCell>
                <TableCell align="center">{row.last_name}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">{row.status}
                    {/*{row.my_payment.is_open ?*/}
                    {/* <Button color="primary">*/}
                    {/*     Pay*/}
                    {/* </Button> : `Paid at ${row.my_payment.when_payed}`}*/}
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function CollapsibleTable(props) {
    return (
        <TableContainer component={Paper} style={{
            boxShadow: "2px 2px 13px darkgrey",
            width: "70%",
            marginTop: "50px",
            borderRadius: "10px"
        }}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow style={{backgroundColor: "rgba(211, 203, 195, 0.42)"}}>
                        <TableCell/>
                        <TableCell align="center">First Name </TableCell>
                        <TableCell align="center">Last Name</TableCell>
                        <TableCell align="center">Mail</TableCell>
                        <TableCell align="center">Phone</TableCell>
                        <TableCell align="center">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.renters.map((renter) => (
                        <Row key={renter.id} row={renter}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

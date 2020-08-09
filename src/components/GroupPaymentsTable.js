import React, {useCallback, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Button from "@material-ui/core/Button";
import {payApi} from "../api";
import SimpleValidationModal from "./pages/Modal/SimpleValidationModal";
import EventIcon from "@material-ui/icons/Event";
import PublicIcon from '@material-ui/icons/Public';

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

    const openModal = useCallback(() => {
        setPayModalOpened(true);
    }, []);

    const closeModal = useCallback(() => {
        setPayModalOpened(false);
    }, []);

    const handlePay = () => {
        let payObject = {paymentId: row.my_payment.payment_id, assetId: props.propId, userId: props.userId}
        props.payMethod(payObject)
        closeModal()
    }

    const classes = useRowStyles();
    return (
        <React.Fragment>
            {payModalOpened ?
                <SimpleValidationModal open onApprove={handlePay} closeMe={closeModal}/>
                : null}
            <TableRow className={classes.root}>
                <TableCell>
                    {row.is_public && row.participants.length > 0 &&
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>}
                </TableCell>
                <TableCell align="center">
                    {row.participants.length > 0 ? (<div><PublicIcon/><p>Public</p></div>) : row.is_periodic ?
                        <div><EventIcon/><p>Monthly</p></div> : null}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.title}
                </TableCell>
                <TableCell align="center">{row.owner.first_name + ' ' + row.owner.last_name}</TableCell>
                <TableCell align="center">{row.my_payment.amount}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.creation_date}</TableCell>
                <TableCell align="center">{row.my_payment.is_open ?
                    <Button onClick={openModal} color="primary">
                        {row.is_periodic ? "Pay all payments" : "Pay"}
                    </Button> : `Paid at ${row.my_payment.when_payed}`}</TableCell>
            </TableRow>
            {row.participants.length > 0 ?
                <TableRow>
                    <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={7}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Participants
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Name</TableCell>
                                            <TableCell align="center">Amount</TableCell>
                                            <TableCell align="center">Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.participants.map((historyRow) => (
                                            <TableRow key={historyRow.id}>
                                                <TableCell align="center" component="th" scope="row">
                                                    {historyRow.first_name + ' ' + historyRow.last_name}
                                                </TableCell>
                                                <TableCell align="center">{historyRow.amount}</TableCell>
                                                <TableCell
                                                    align="center">{historyRow.is_open ? 'Open' : 'Closed'}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow> : row.is_periodic ?
                    <TableRow>
                        <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={7}>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <Box margin={1}>
                                    <Typography variant="h6" gutterBottom component="div">
                                        Payments
                                    </Typography>
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">Date</TableCell>
                                                <TableCell align="center">Amount</TableCell>
                                                <TableCell align="center">Status</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {row.participants.map((historyRow) => (
                                                <TableRow key={historyRow.id}>
                                                    <TableCell align="center" component="th" scope="row">
                                                        {historyRow.date}
                                                    </TableCell>
                                                    <TableCell align="center">{historyRow.amount}</TableCell>
                                                    <TableCell
                                                        align="center">{historyRow.is_open ? 'Open' : 'Closed'}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow> : null
            }
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
                        <TableCell align="center">Type </TableCell>
                        <TableCell align="center">Name </TableCell>
                        <TableCell align="center">Collector</TableCell>
                        <TableCell align="center">Amount</TableCell>
                        <TableCell align="center">description</TableCell>
                        <TableCell align="center">Creation Time</TableCell>
                        <TableCell align="center">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.groupPayments.map((groupPayment) => (
                        <Row key={groupPayment.id} row={groupPayment} loadPayments={props.loadPayments}
                             payMethod={props.payMethod} propId={props.propId} userId={props.userId}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

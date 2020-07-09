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
        payApi(row.my_payment.payment_id)
        closeModal()
        props.loadPayments(props.propId, props.userId)
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
                <TableCell component="th" scope="row">
                    {row.title}
                </TableCell>
                <TableCell align="right">{row.owner.first_name + ' ' + row.owner.last_name}</TableCell>
                <TableCell align="right">{row.my_payment.amount}</TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.creation_date}</TableCell>
                <TableCell align="right">{row.my_payment.is_open ?
                    <Button onClick={openModal} color="primary">
                        Pay
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
                                            <TableCell>Name</TableCell>
                                            <TableCell>Amount</TableCell>
                                            <TableCell align="right">Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.participants.map((historyRow) => (
                                            <TableRow key={historyRow.id}>
                                                <TableCell component="th" scope="row">
                                                    {historyRow.first_name + ' ' + historyRow.last_name}
                                                </TableCell>
                                                <TableCell>{historyRow.amount}</TableCell>
                                                <TableCell
                                                    align="right">{historyRow.is_open ? 'Open' : 'Closed'}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow> : null}
        </React.Fragment>
    );
}

export default function CollapsibleTable(props) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell>Name </TableCell>
                        <TableCell align="right">Collector</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">description</TableCell>
                        <TableCell align="right">Creation Time</TableCell>
                        <TableCell align="right">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.groupPayments.map((groupPayment) => (
                        <Row key={groupPayment.id} row={groupPayment} loadPayments={props.loadPayments}
                             propId={props.propId} userId={props.userId}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

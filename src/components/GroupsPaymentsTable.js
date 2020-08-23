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
import EventIcon from '@material-ui/icons/Event';
import PeopleIcon from '@material-ui/icons/People';
import {Delete} from "@material-ui/icons";
import SimpleValidationModal from "./pages/Modal/SimpleValidationModal";
import Tooltip from "@material-ui/core/Tooltip";

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});


function GroupRow(props) {
    const {row} = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const [deleteModalOpened, setDeleteModalOpened] = useState(false);

    const openModal = useCallback(() => {
        setDeleteModalOpened(true);
    }, []);

    const closeModal = useCallback(() => {
        setDeleteModalOpened(false);
    }, []);

    const deleteDocument = () => {
        closeModal();
        props.deleteMethod(props.userId, props.propId, row.id)
    };
    const isClosed = (payment) => {
        return !payment.is_open
    }
    const isDeletable = () => {
        return row.participants.some(isClosed)
    }
    return (
        <React.Fragment>{deleteModalOpened ?
            <SimpleValidationModal open onApprove={deleteDocument} closeMe={closeModal}/> : null}
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell align="center">
                    {row.is_periodic ? <div><EventIcon/><p>Monthly</p></div>: <div><PeopleIcon/><p>Group</p></div>}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                    {row.title}
                </TableCell>
                <TableCell align="center">{row.owner.first_name + ' ' + row.owner.last_name}</TableCell>
                <TableCell align="center">{row.amount}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.creation_date}</TableCell>
                <TableCell align="center">
                    <Tooltip title={isDeletable() ? "At least one payment paid" : "Delete"}>
                        <div>
                            <IconButton disabled={isDeletable()} onClick={openModal} style={{boxShadow: "none"}}>
                                <Delete/>
                            </IconButton>
                        </div>
                    </Tooltip>
                </TableCell>
            </TableRow>
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
                                        {row.is_periodic? <TableCell align="center">Info</TableCell>:null}
                                        <TableCell align="center">Paid at</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>{row.participants.map((historyRow) => (
                                    <TableRow key={historyRow.id}>
                                        <TableCell align="center" component="th" scope="row">
                                            {historyRow.first_name + ' ' + historyRow.last_name}
                                        </TableCell>
                                        <TableCell align="center">{historyRow.amount}</TableCell>
                                        <TableCell align="center">{historyRow.is_open ? 'Open' : 'Close'}
                                        </TableCell>
                                        {row.is_periodic? <TableCell align="center">
                                            {row.payments.indexOf(historyRow.payment_id) + 1} payment of {row.payments.length} </TableCell>:null}
                                        <TableCell align="center">{historyRow.when_payed}</TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function GroupsCollapsibleTable(props) {
    const [groupsPayments] = useState([]);
    let groups = props.groupsPayments ? props.groupsPayments : groupsPayments
    return (
        <TableContainer component={Paper} style={{
            boxShadow: "2px 2px 13px darkgrey",
            width: "70%",
            marginTop: "25px",
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
                        <TableCell align="center">
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {groups.map((groupPayment, id) => (
                        <GroupRow key={id} userId={props.userId} propId={props.propId} deleteMethod={props.deleteMethod}
                                  isOwner={props.userId === groupPayment.owner} row={groupPayment}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

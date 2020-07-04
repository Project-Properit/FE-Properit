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
import {Delete} from "@material-ui/icons";
import SimpleValidationModal from "./pages/Modal/SimpleValidationModal";

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
        console.log(row.title + "-" + row.id + " deleted in asset " + props.propId)
        props.deleteMethod(props.userId, props.propId, row.id)
    };
    return (
        <React.Fragment>{deleteModalOpened?<SimpleValidationModal open onApprove={deleteDocument} closeMe={closeModal}/>:null}
            <TableRow className={classes.root}>
                <TableCell>{row.is_public || props.isOwner?<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open?<KeyboardArrowUpIcon/>:<KeyboardArrowDownIcon/>}
                    </IconButton>:null}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.title}
                </TableCell>
                <TableCell align="right">{row.owner.first_name + ' ' + row.owner.last_name}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.creation_date}</TableCell>
                <TableCell>
                    <IconButton onClick={openModal}>
                        <Delete/>
                    </IconButton>
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
                                        <TableCell>Name</TableCell>
                                        <TableCell>Amount</TableCell>
                                        <TableCell align="right">Status</TableCell>
                                        <TableCell>Paid at</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>{row.participants.map((historyRow) => (
                                    <TableRow key={historyRow.id}>
                                        <TableCell component="th" scope="row">
                                            {historyRow.first_name + ' ' + historyRow.last_name}
                                        </TableCell>
                                        <TableCell>{historyRow.amount}</TableCell>
                                        <TableCell align="right">{historyRow.is_open ? 'Open' : 'Closed'}</TableCell>
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
    const [groupsPayments, setgroupsPayments] = useState([]);
    let groups = props.groupsPayments ? props.groupsPayments : groupsPayments
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
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {groups.map((groupPayment, id) => (
                        <GroupRow key={id} userId={props.userId} propId={props.propId} deleteMethod={props.deleteMethod}
                                  isOwner={props.isOwner} row={groupPayment}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

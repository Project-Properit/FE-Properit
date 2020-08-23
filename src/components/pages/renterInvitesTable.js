import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";

const useRowStyles = makeStyles({
	root: {
		'& > *': {
			borderBottom: 'unset'
		}
	}
});


function Row(props) {
	const {row, onApprove} = props;
	const classes = useRowStyles();
	return (
		<React.Fragment>
			<TableRow className={classes.root}>
				<TableCell component="th" scope="row">
					{row.title}
				</TableCell>
				<TableCell align="center">{row.asset_address}</TableCell>
				<TableCell align="center">{row.asset_owner.first_name +' ' +row.asset_owner.last_name}</TableCell>
				<TableCell align="center">{row.asset_owner.phone}</TableCell>
				<TableCell align="center">{row.asset_owner.email}</TableCell>
				<TableCell align="center"><Button onClick={()=>onApprove(row.asset_id)}>Approve</Button>
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
						<TableCell align="center">Address </TableCell>
						<TableCell align="center">Owner Name</TableCell>
						<TableCell align="center">Owner Phone</TableCell>
						<TableCell align="center">Owner Email</TableCell>
						<TableCell align="center">Take An Action</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.invites.map((invite) => (
						<Row key={invite.asset_id} row={invite} onApprove={(i)=>props.onApprove(i)}/>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

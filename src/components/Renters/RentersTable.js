import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useRowStyles = makeStyles({
	root: {
		'& > *': {
			borderBottom: 'unset'
		}
	}
});


function Row(props) {
	const {row} = props;
	const classes = useRowStyles();
	return (
		<React.Fragment>

			<TableRow className={classes.root}>
				<TableCell component="th" scope="row">
					{row.title}
				</TableCell>
				<TableCell align="center">{row.first_name}</TableCell>
				<TableCell align="center">{row.last_name}</TableCell>
				<TableCell align="center">{row.email}</TableCell>
				<TableCell align="center">{row.phone}</TableCell>
				<TableCell align="center">{row.pending ? 'Pending' : 'Approved'}
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

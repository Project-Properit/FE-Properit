import React, { useState, useRef } from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Button } from "@material-ui/core";
import {
	AccountCircle,
	ArrowDropDown,
	ArrowDropUp,
} from "@material-ui/icons";

export default function SimpleListMenu(props) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [selectedIndex, setSelectedIndex] = React.useState(1);
	const logoutRef = useRef(null);
	const [expanded, setExpanded] = useState(false);

	const handleClickListItem = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuItemClick = (event, index) => {
		setSelectedIndex(index);
		setAnchorEl(null);
		props.choosenFunc(index);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		// <div>
		//
		// 	<Button
		// 		// ref={logoutRef}
		// 		dir="rtl"
		// 		style={{
		// 			padding: 0,
		// 			color: "white",
		// 			fontWeight: "bold",
		// 			fontSize: "22px",
		// 			display: "flex",
		// 			alignItems: "center",
		// 			justifyContent: "space-between",
		// 			position: "relative",
		// 			minWidth: "182px"
		// 		}}
		// 		onClick={handleClickListItem}
		// 	>
		// 		<AccountCircle />
		// 		<div style={{marginRight: "8px", marginLeft: "8px", whiteSpace: "nowrap"}}>
		// 			{props.options[selectedIndex]}}
		// 		</div>
		// 		{!expanded ? <ArrowDropDown /> : <ArrowDropUp />}
		// 		{expanded && (
		// 			<Menu
		// 					id="lock-menu"
		// 					anchorEl={anchorEl}
		// 					keepMounted
		// 					open={Boolean(anchorEl)}
		// 					onClose={handleClose}
		// 				>
		// 					{props.options.map((option, index) => (
		// 						<MenuItem
		// 							key={option}
		// 							// disabled={index === 0}
		// 							selected={index === selectedIndex}
		// 							onClick={(event) => handleMenuItemClick(event, index)}
		// 						>
		// 							{option}
		// 						</MenuItem>
		// 					))}
		// 				</Menu>
		// 		)}
		//
		// 			</Button>
		// 			</div>

		<div>
			<Button
				ref={logoutRef}
				dir="rtl"
				style={{
					padding: 0,
					color: "white",
					fontWeight: "bold",
					fontSize: "22px",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					position: "relative",
					minWidth: "182px"
				}}
				onClick={
				handleClickListItem
					// setExpanded(!expanded)


				}
			>
				<div style={{marginRight: "8px", marginLeft: "8px", whiteSpace: "nowrap"}}>
					{props.options[selectedIndex]}
				</div>
			</Button>
	<List component="nav" aria-label="Device settings">
		<ListItem
			button
			aria-haspopup="true"
			aria-controls="lock-menu"
			aria-label="when device is locked"
			onClick={handleClickListItem}
			style={{
				padding: 0,
				color: "white",
				fontWeight: "bold",
				fontSize: "22px",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				position: "relative",
				minWidth: "182px"
			}}
		>
			<ListItemText primary="Choose Address" secondary={props.options[selectedIndex]}/>
		</ListItem>
	</List>
	<Menu
		id="lock-menu"
		anchorEl={anchorEl}
		keepMounted
		open={Boolean(anchorEl)}
		onClose={handleClose}
	>
		{props.options.map((option, index) => (
			<MenuItem
				key={option}
				// disabled={index === 0}
				selected={index === selectedIndex}
				onClick={(event) => handleMenuItemClick(event, index)}
			>
				{option}
			</MenuItem>
		))}
	</Menu>
</div>

	);
}



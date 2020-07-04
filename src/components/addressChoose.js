import React, { useState, useRef } from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Button } from "@material-ui/core";
import {
	PersonPinCircle,
	ArrowDropDown,
	ArrowDropUp,
} from "@material-ui/icons";

import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';

export default function SimpleListMenu(props) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [selectedIndex, setSelectedIndex] = React.useState(1);
	const logoutRef = useRef(null);
	const [expanded, setExpanded] = useState(false);

	const handleClickListItem = (event, expanded) => {
		setAnchorEl(event.currentTarget);
		setExpanded(!expanded);
	};

	// const handleClickAddress = (expanded) => {
	// 	setExpanded(!expanded);
	//
	// };


	const handleMenuItemClick = (event, index) => {
		setSelectedIndex(index);
		setAnchorEl(null);
		props.choosenFunc(index);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
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
				onClick={ event =>
					handleClickListItem( event,expanded)
				}
			>
				<PersonPinCircle/>
				<div style={{marginRight: "8px", marginLeft: "8px", whiteSpace: "nowrap"}}>
					{props.options[selectedIndex]}
				</div>
				{!expanded ? <ArrowDropDown /> : <ArrowDropUp />}
				{expanded && (
					<div
						style={{
							position: "absolute",
							top: "54px",
							left: "10px",
							width: "100%",
							zIndex: 100000000000
						}}
					>

						{/*<Menu*/}
						{/*	id="lock-menu"*/}
						{/*	anchorEl={anchorEl}*/}
						{/*	keepMounted*/}
						{/*	open={Boolean(anchorEl)}*/}
						{/*	onClose={handleClose}*/}
						{/*>*/}
							<Paper>
								<ClickAwayListener onClickAway={handleClose}>
									<MenuList autoFocusItem={Boolean(anchorEl)} id="menu-list-grow" >

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
									</MenuList>
								</ClickAwayListener>
							</Paper>

						{/*</Menu>*/}
					</div>
				)}
			</Button>
	);
}





{/*<List component="nav" aria-label="Device settings">*/}
{/*	<ListItem*/}
{/*		button*/}
{/*		aria-haspopup="true"*/}
{/*		aria-controls="lock-menu"*/}
{/*		aria-label="when device is locked"*/}
{/*		onClick={handleClickListItem}*/}
{/*		style={{*/}
{/*			padding: 0,*/}
{/*			color: "white",*/}
{/*			fontWeight: "bold",*/}
{/*			fontSize: "22px",*/}
{/*			display: "flex",*/}
{/*			alignItems: "center",*/}
{/*			justifyContent: "space-between",*/}
{/*			position: "relative",*/}
{/*			minWidth: "182px"*/}
{/*		}}*/}
{/*	>*/}
{/*		<ListItemText primary="Choose Address" secondary={props.options[selectedIndex]}/>*/}
{/*	</ListItem>*/}
{/*</List>*/}
{/*<Menu*/}
{/*	id="lock-menu"*/}
{/*	anchorEl={anchorEl}*/}
{/*	keepMounted*/}
{/*	open={Boolean(anchorEl)}*/}
{/*	onClose={handleClose}*/}
{/*>*/}
{/*	{props.options.map((option, index) => (*/}
{/*		<MenuItem*/}
{/*			key={option}*/}
{/*			// disabled={index === 0}*/}
{/*			selected={index === selectedIndex}*/}
{/*			onClick={(event) => handleMenuItemClick(event, index)}*/}
{/*		>*/}
{/*			{option}*/}
{/*		</MenuItem>*/}
{/*	))}*/}
{/*</Menu>*/}
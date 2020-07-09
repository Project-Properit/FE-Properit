import React, { useRef, useState } from "react";
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from "@material-ui/core";
import { ArrowDropDown, ArrowDropUp, PersonPinCircle } from "@material-ui/icons";

import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';

export default function SimpleListMenu(props) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [selectedIndex, setSelectedIndex] = React.useState();
	console.log('selectedIndex',selectedIndex)
	const logoutRef = useRef(null);
	const [expanded, setExpanded] = useState(false);
	const opt = props.options;
	const chosen = props.choosenIndex;
	console.log('choosen',chosen )
	if (chosen && !selectedIndex)
		setSelectedIndex(chosen);
	const handleClickListItem = (event, expanded) => {
		setAnchorEl(event.currentTarget);
		setExpanded(!expanded);
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
			onClick={event =>
				handleClickListItem(event, expanded)
			}
		>
			<PersonPinCircle/>
			<div style={{marginRight: "8px", marginLeft: "8px", whiteSpace: "nowrap"}}>
				{opt[selectedIndex]}
			</div>
			{!expanded ? <ArrowDropDown/> : <ArrowDropUp/>}
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
					<Paper>
						<ClickAwayListener onClickAway={handleClose}>
							<MenuList autoFocusItem={Boolean(anchorEl)} id="menu-list-grow">

								{opt.map((option, index) => (
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
				</div>
			)}
		</Button>
	);
}
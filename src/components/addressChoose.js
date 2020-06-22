import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';


export default function SimpleListMenu(props) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [selectedIndex, setSelectedIndex] = React.useState(1);

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
		<div>
			<List component="nav" aria-label="Device settings">
				<ListItem
					button
					aria-haspopup="true"
					aria-controls="lock-menu"
					aria-label="when device is locked"
					onClick={handleClickListItem}
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

import Icon from '@mui/material/Icon';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import ConfirmationDialog from './ConfirmationDialog';

function AccountsMultiSelectMenu(props) {
	const dispatch = useDispatch();
	const { selectedAccountIds } = props;

	const [anchorEl, setAnchorEl] = useState(null);

	const [open, setOpen] = useState(false);
	const [value, setValue] = useState('Deactivate Users');

	const handleClickListItem = (newTitle) => {
		newTitle && setValue(newTitle);
		setOpen(true);
	};

	const handleClose = (newValue) => {
		setOpen(false);

		if (newValue) {
			setValue(newValue);
		}
	};

	function openSelectedAccountMenu(event) {
		setAnchorEl(event.currentTarget);
	}

	function closeSelectedAccountsMenu() {
		setAnchorEl(null);
	}

	return (
		<>

			<Button
				color="primary"
				aria-owns={anchorEl ? 'selectedAccountsMenu' : null}
				aria-haspopup="true"
				disabled={!selectedAccountIds.length}
				onClick={openSelectedAccountMenu}
				variant="contained"
			>
				Action Menu
			</Button>
			<Menu
				id="selectedAccountsMenu"
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={closeSelectedAccountsMenu}
			>
				<MenuList>
					<MenuItem
						onClick={() => {
							handleClickListItem('Deactivate Users');
							closeSelectedAccountsMenu();
						}}
					>
						<ListItemIcon className="min-w-40">
							<Icon>delete</Icon>
						</ListItemIcon>
						<ListItemText primary="Deactivate Users" />
					</MenuItem>
					<MenuItem
						onClick={() => {
							handleClickListItem('Add Users To Projects');
							closeSelectedAccountsMenu();
						}}
					>
						<ListItemIcon className="min-w-40">
							<Icon>movie</Icon>
						</ListItemIcon>
						<ListItemText primary="Add Users To Projects" />
					</MenuItem>
					<MenuItem
						onClick={() => {
							handleClickListItem('Remove Users From Projects');
							closeSelectedAccountsMenu();
						}}
					>
						<ListItemIcon className="min-w-40">
							<Icon>movie</Icon>
						</ListItemIcon>
						<ListItemText primary="Remove Users To Projects" />
					</MenuItem>
					<MenuItem
						onClick={() => {
							handleClickListItem('Add Users To Groups');
							closeSelectedAccountsMenu();
						}}
					>
						<ListItemIcon className="min-w-40">
							<Icon>group</Icon>
						</ListItemIcon>
						<ListItemText primary="Add Users To Groups" />
					</MenuItem>
					<MenuItem
						onClick={() => {
							handleClickListItem('Remove Users From Groups');
							closeSelectedAccountsMenu();
						}}
					>
						<ListItemIcon className="min-w-40">
							<Icon>group</Icon>
						</ListItemIcon>
						<ListItemText primary="Remove Users From Groups" />
					</MenuItem>
				</MenuList>
			</Menu>
			<ConfirmationDialog
				id="action-menu"
				keepMounted
				open={open}
				onClose={handleClose}
				value={value}
				selectedAccountIds={selectedAccountIds}
			/>
			
		</>
	);
}

export default AccountsMultiSelectMenu;

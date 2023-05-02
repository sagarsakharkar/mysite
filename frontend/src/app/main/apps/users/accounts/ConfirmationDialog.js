import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes, { object } from 'prop-types';

import { addAccountToProjects, addAccountToGroups, removeAccounts, removeAccountFromGroups, removeAccountFromProjects } from './store/accountsSlice';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: 'auto',
	},
	cardHeader: {
		padding: theme.spacing(1, 2),
	},
	list: {
		width: 400,
		height: 200,
		backgroundColor: theme.palette.background.paper,
		overflow: 'auto',
	},
	button: {
		margin: theme.spacing(0.5, 0),
	},
}));

function not(a, b) {
	return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
	return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
	return [...a, ...not(b, a)];
}

function ConfirmationDialog(props) {
	const dispatch = useDispatch();
	const classes = useStyles();
	const { onClose, value: valueProp, open, selectedAccountIds, ...other } = props;
	const projects = [];
	// const projects = useSelector(({ auth }) => auth.user.projects);
	const accounts = useSelector(({ accountsApp }) => accountsApp.accounts.entities);
	const groups = useSelector(({ accountsApp }) => accountsApp.groups.entities);
	const role_entities = useSelector(({ accountsApp }) => accountsApp.roles.entities);
	const roles = role_entities && Object.values(role_entities).map((item) => item.name) || []
	const [items, setItems] = useState([]);
	const [checked, setChecked] = useState([]);
	const [action, setAction] = useState(null)
	const [entity, setEntity] = useState(null)

	useEffect(() => {
		if (open && selectedAccountIds) {
			if (valueProp == 'Deactivate Users') {
				const users = selectedAccountIds.map(item => accounts[item].username)
				setItems(users)
				setChecked(users);
				setEntity('Users')
			} else if (['Add Users To Projects', 'Remove Users From Projects'].includes(valueProp)) {
				const project_ids = projects.map(item => item.code)
				setItems(project_ids)
				setEntity('Projects')
			} else if (['Add Users To Groups', 'Remove Users From Groups'].includes(valueProp)) {
				const group_ids = Object.values(groups).filter(item => !roles.includes(item.name)).map(item => item.name)
				setItems(group_ids)
				setEntity('Groups')
			}
			setAction(valueProp.startsWith("Deactivate") ? 'Deactivate' : valueProp.startsWith("Add") ? 'Add' : 'Remove')
		}
	}, [valueProp, open, selectedAccountIds]);

	const handleCancel = () => {
		onClose();
		setChecked([]);
	};

	function canBeSubmitted() {
		return (
			checked.length > 0
		);
	}

	const handleToggleAll = (items) => () => {
		if (numberOfChecked(items) === items.length) {
			setChecked(not(checked, items));
		} else {
			setChecked(union(checked, items));
		}
	};

	const numberOfChecked = (items) => intersection(checked, items).length;

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	function handleSubmit(event) {
		event.preventDefault();

		if (valueProp === 'Deactivate Users') {
			const changeValues = Object.values(accounts).filter(item => checked.includes(item.username)).map(item => item.id)
			dispatch(removeAccounts(changeValues))
		} else if (valueProp === 'Add Users To Projects') {
			const changeValues = projects.filter(item => checked.includes(item.code)).map(item => item.uid)
			const data = {
				projects: changeValues,
				users: selectedAccountIds
			}
			dispatch(addAccountToProjects(data))
		} else if (valueProp === 'Remove Users From Projects') {
			const changeValues = projects.filter(item => checked.includes(item.code)).map(item => item.uid)
			const data = {
				projects: changeValues,
				users: selectedAccountIds
			}
			dispatch(removeAccountFromProjects(data))
		} else if (valueProp === 'Add Users To Groups') {
			const changeValues = Object.values(groups).filter(item => checked.includes(item.name)).map(item => item.id)
			const data = {
				groups: changeValues,
				users: selectedAccountIds
			}
			dispatch(addAccountToGroups(data))
		} else if (valueProp === 'Remove Users From Groups') {
			const changeValues = Object.values(groups).filter(item => checked.includes(item.name)).map(item => item.id)
			const data = {
				groups: changeValues,
				users: selectedAccountIds
			}
			dispatch(removeAccountFromGroups(data))
		} 
		handleCancel();
	}

	return (
		<Dialog
			classes={{
				paper: 'm-24 rounded-16'
			}}
			open={open}
			{...other}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{valueProp}
					</Typography>
				</Toolbar>
			</AppBar>
			<form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
				<DialogContent classes={{ root: 'p-24' }}>
						<div className="flex flex-1 justify-between">
							<Card>
								<CardHeader
									className={classes.cardHeader}
									avatar={
										<Checkbox
											onClick={handleToggleAll(items)}
											checked={numberOfChecked(items) === items.length && items.length !== 0}
											indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
											disabled={items.length === 0}
											inputProps={{ 'aria-label': 'all items selected' }}
										/>
									}
									title={`${entity} (${numberOfChecked(items)}/${items.length} selected)`}
									subheader={
										<p>{checked.join(', ')}</p>
									}
								/>
								<Divider />
								<List className={classes.list} dense component="div" role="list">
									{items.map((value) => {
										const labelId = `transfer-list-all-item-${value}-label`;

										return (
											<ListItem key={value} role="listitem" onClick={handleToggle(value)}>
												<ListItemIcon>
													<Checkbox
														checked={checked.indexOf(value) !== -1}
														tabIndex={-1}
														disableRipple
														inputProps={{ 'aria-labelledby': labelId }}
													/>
												</ListItemIcon>
												<ListItemText id={labelId} primary={value} />
											</ListItem>
										);
									})}
									<ListItem />
								</List>
							</Card>
						</div>
				</DialogContent>

				<DialogActions className="justify-between pl-16">

					<Button
						variant="contained"
						color="primary"
						onClick={handleSubmit}
						type="submit"
						disabled={!canBeSubmitted()}
					>
						{action}
					</Button>

					<IconButton
						onClick={handleCancel}
					>
						<Icon>close</Icon>
					</IconButton>
				</DialogActions>
			</form>
		</Dialog>
	);
}
ConfirmationDialog.propTypes = {
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	value: PropTypes.string.isRequired,
};
export default ConfirmationDialog;

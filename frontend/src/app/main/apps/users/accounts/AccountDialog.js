import { useForm } from '@fuse/hooks';
import AppBar from '@mui/material/AppBar';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useCallback, useEffect, useState } from 'react';
import diff from 'object-diff';
import { useDispatch, useSelector } from 'react-redux';
import {
	removeAccount,
	updateAccount,
	addAccount,
	closeNewAccountDialog,
	closeEditAccountDialog,
	closeChangePasswordDialog
} from './store/accountsSlice';

const defaultFormState = {
	username: '',
	first_name: '',
	last_name: '',
	email: '',
	is_staff: true,
	role: null,
	is_active: true,
	password: 'Welcome@2022',
	re_password: 'Welcome@2022',
};

function AccountDialog(props) {
	const dispatch = useDispatch();
	const accountDialog = useSelector(({ accountsApp }) => accountsApp.accounts.accountDialog);
	const roles = useSelector(({ accountsApp }) => accountsApp.roles.entities) || {};

	const { control, form, handleChange, setForm, setInForm } = useForm(defaultFormState);
	console.info(form.role)

	const initDialog = useCallback(() => {
		if (accountDialog.type === 'edit' && accountDialog.data) {
			setForm({ ...accountDialog.data });
		}

		if (accountDialog.type === 'change' && accountDialog.data) {
			setForm({ ...accountDialog.data, ...{ password: defaultFormState.password } });
		}

		if (accountDialog.type === 'new') {
			setForm({
				...defaultFormState,
				...accountDialog.data,
			});
		}
	}, [accountDialog.data, accountDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (accountDialog.props.open) {
			initDialog();
		}
	}, [accountDialog.props.open, initDialog]);

	function closeComposeDialog() {
		accountDialog.type === 'edit'
			? dispatch(closeEditAccountDialog())
			: accountDialog.type === 'new'
				? dispatch(closeNewAccountDialog())
				: dispatch(closeChangePasswordDialog())
	}

	function canBeSubmitted() {
		if (accountDialog.type == 'change' && !form.password) {
			return false
		} else {
			return (
				form.username.length > 0
			);
		}
	}

	function handleSubmit(event) {
		event.preventDefault();

		if (accountDialog.type === 'new') {
			dispatch(addAccount(form));
		} else if (accountDialog.type === 'change') {
			const changedValues = {
				id: form.id,
				password: defaultFormState.password
			}
			dispatch(updateAccount(changedValues));
		} else {

			const changedValues = diff(accountDialog.data, form)
			if (changedValues) {
				changedValues.id = form.id
				if (changedValues.role) {
					if (roles[changedValues.role].name === 'Admin') {
						changedValues.is_superuser = true
					} else {
						changedValues.is_superuser = false
					}
				}
				dispatch(updateAccount(changedValues));
			}
		}
		closeComposeDialog();
	}

	function handleRemove() {
		dispatch(removeAccount(form.id));
		closeComposeDialog();
	}

	return (
		<Dialog
			classes={{
				paper: 'm-24 rounded-8'
			}}
			{...accountDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{accountDialog.type === 'new' ? 'New Account' : accountDialog.type === 'change' ? 'Change Password' : 'Edit Account'}
					</Typography>
				</Toolbar>
			</AppBar>
			<form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
				<DialogContent classes={{ root: 'p-24' }}>
					{accountDialog.type === 'new' && (

						<div className="flex">
							<TextField
								className="mb-24"
								label="User Name"
								autoFocus
								id="username"
								name="username"
								value={form.username}
								onChange={handleChange}
								variant="outlined"
								required
								fullWidth
							/>
						</div>

					)}
					{['new', 'change'].includes(accountDialog.type) && (
						<div className="flex">
							<TextField
								className="mb-24"
								label="Password"
								id="password"
								name="password"
								value={form.password}
								onChange={handleChange}
								variant="outlined"
								fullWidth
								disabled
							/>
						</div>
					)}

					{['new', 'edit'].includes(accountDialog.type) && (
						<>
							<div className="flex">
								<TextField
									className="mb-24"
									label="First Name"
									id="first_name"
									name="first_name"
									value={form.first_name}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>
							</div>

							<div className="flex">
								<TextField
									className="mb-24"
									label="Last Name"
									id="last_name"
									name="last_name"
									value={form.last_name}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>
							</div>
							<div className="mb-24">
								<Autocomplete
									value={form.role && roles[form.role?.id || form.role]}
									onChange={(event, newValue) => {
										setInForm('role', newValue.id)
									}}
									disableClearable
									getOptionLabel={option => option.name}
									id="role"
									options={Object.values(roles)}
									renderInput={(params) => <TextField {...params} label="Role" required variant="outlined" />}
									sx={{
										// display: 'inline-block',
										// position: 'absolute',
										'& input': {
										  width: 200,
										  bgcolor: 'background.paper',
										  color: (theme) =>
											theme.palette.getContrastText(theme.palette.background.paper),
										},
									  }}
								/>
								

								
							</div>
							<div className="flex">
								<TextField
									className="mb-24"
									label="Email"
									id="email"
									name="email"
									value={form.email}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>
							</div>

							<div className="mb-24">
								<FormControlLabel label="Is Active" labelPlacement="start"
									control={<Switch checked={form.is_active} onChange={(event, newValue) => {
										setInForm('is_active', newValue)
									}} name="Is Active" />}
								/>
							</div>

						</>
					)}
				</DialogContent>

				<DialogActions className="justify-between pl-16">

					<Button
						variant="contained"
						color="primary"
						onClick={handleSubmit}
						type="submit"
						disabled={!canBeSubmitted()}
					>
						{accountDialog.type === 'new' ? 'Add' : accountDialog.type === 'change' ? 'Change' : 'Save'}
					</Button>

					<IconButton
						onClick={closeComposeDialog}
					>
						<Icon>close</Icon>
					</IconButton>
				</DialogActions>
			</form>
		</Dialog>
	);
}

export default AccountDialog;

import { useForm } from '@fuse/hooks';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useCallback, useEffect } from 'react';
import diff from 'object-diff';
import { useDispatch, useSelector } from 'react-redux';
import {
	updateRole,
	addRole,
	closeNewRoleDialog,
	closeEditRoleDialog,
} from './store/rolesSlice';

const defaultFormState = {
	name: '',
	description: '',
};

function RoleDialog(props) {
	const dispatch = useDispatch();
	const roleDialog = useSelector(({ rolesApp }) => rolesApp.roles.roleDialog);

	const { form, handleChange, setForm, setInForm } = useForm(defaultFormState);

	const initDialog = useCallback(() => {
		if (roleDialog.type === 'edit' && roleDialog.data) {
			setForm({ ...roleDialog.data });
		}

		if (roleDialog.type === 'new') {
			setForm({
				...defaultFormState,
				...roleDialog.data,
			});
		}
	}, [roleDialog.data, roleDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (roleDialog.props.open) {
			initDialog();
		}
	}, [roleDialog.props.open, initDialog]);

	function closeComposeDialog() {
		roleDialog.type === 'edit'
			? dispatch(closeEditRoleDialog())
			: dispatch(closeNewRoleDialog())
	}

	function canBeSubmitted() {
		return (
			form.name.length >= 4
		);
	}

	function handleSubmit(event) {
		event.preventDefault();

		if (roleDialog.type === 'new') {
			dispatch(addRole(form));
		} else {
			const changedValues = diff(roleDialog.data, form)
			changedValues.id = form.id
			dispatch(updateRole(changedValues));
		}
		closeComposeDialog();
	}

	return (
		<Dialog
			classes={{
				paper: 'm-24 rounded-8'
			}}
			{...roleDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{roleDialog.type === 'new' ? 'New Role' : 'Edit Role'}
					</Typography>
				</Toolbar>
			</AppBar>
			<form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
				<DialogContent classes={{ root: 'p-24' }}>
					<>
						<div className="flex">
							<TextField
								className="mb-24"
								label="Name"
								autoFocus
								id="name"
								name="name"
								value={form.name}
								onChange={handleChange}
								variant="outlined"
								required
								fullWidth
							/>
						</div>

						<div className="flex">
							<TextField
								className="mb-24"
								label="Decription"
								id="description"
								name="description"
								value={form.description}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
						</div>
					</>


				</DialogContent>

				<DialogActions className="justify-between pl-16">

					<Button
						variant="contained"
						color="primary"
						onClick={handleSubmit}
						type="submit"
						disabled={!canBeSubmitted()}
					>
						{roleDialog.type === 'new' ? 'Add' : 'Save'}
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

export default RoleDialog;

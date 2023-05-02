import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/utils/FuseUtils';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
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
import React, { useCallback, useEffect } from 'react';
import diff from 'object-diff';
import { useDispatch, useSelector } from 'react-redux';
import {
	updateProfile,
	closeEditProfileDialog,
	closeChangePasswordDialog
} from './store/profileSlice';

const defaultFormState = {
	first_name: '',
	last_name: '',
	email: '',
	password: '',
	re_password: '',
};

function ProfileDialog(props) {
	const dispatch = useDispatch();

	// useEffect(() =>{
	// 	dispatch(closeEditProfileDialog());
	// },[])

	const profileDialog = useSelector(({ profileApp }) => profileApp.profile.profileDialog);

	const { form, handleChange, setForm, setInForm } = useForm(defaultFormState);

	const initDialog = useCallback(() => {

		setForm({ ...profileDialog.data });

	}, [profileDialog.data, profileDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (profileDialog.props.open) {
			initDialog();
		}
	}, [profileDialog.props.open, initDialog]);

	function closeComposeDialog() {
		profileDialog.type === 'edit'
			? dispatch(closeEditProfileDialog())
			: dispatch(closeChangePasswordDialog())
	}

	function canBeSubmitted() {
		if (profileDialog.type == 'change' && (!form.password || form.password !== form.re_password)) {
			return false
		} else if (profileDialog.type == 'edit') {
			return (
				form.email.length > 0
			);
		}
		return true
	}

	function handleSubmit(event) {
		event.preventDefault();
		const changedValues = diff(profileDialog.data, form)
		changedValues.id = form.id
		dispatch(updateProfile(changedValues));

		closeComposeDialog();
	}

	return (
		<Dialog
			classes={{
				paper: 'm-24 rounded-8'
			}}
			{...profileDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{profileDialog.type === 'change' ? 'Change Password' : 'Edit Profile'}
					</Typography>
				</Toolbar>
			</AppBar>
			<form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
				<DialogContent classes={{ root: 'p-24' }}>
					{['change'].includes(profileDialog.type) && (
						<>
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
								/>
							</div>
							<div className="flex">
								<TextField
									className="mb-24"
									label="Confirm Password"
									id="re_password"
									name="re_password"									
									value={form.re_password}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>
							</div>
						</>
					)}

					{['edit'].includes(profileDialog.type) && (
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
						{profileDialog.type === 'change' ? 'Change' : 'Save'}
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

export default ProfileDialog;

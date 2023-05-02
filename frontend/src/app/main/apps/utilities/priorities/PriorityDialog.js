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
import InputColor from 'react-input-color';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useCallback, useEffect } from 'react';
import diff from 'object-diff';
import { useDispatch, useSelector } from 'react-redux';
import {
	removePriority,
	updatePriority,
	addPriority,
	closeNewPriorityDialog,
	closeEditPriorityDialog,
} from './store/prioritiesSlice';

const defaultFormState = {
	name: '',
	color: '',
};

function PriorityDialog(props) {
	const dispatch = useDispatch();
	const priorityDialog = useSelector(({ prioritiesApp }) => prioritiesApp.priorities.priorityDialog);
	const { form, handleChange, setForm, setInForm } = useForm(defaultFormState);

	const initDialog = useCallback(() => {
		if (priorityDialog.type === 'edit' && priorityDialog.data) {
			setForm({ ...priorityDialog.data });
		}

		if (priorityDialog.type === 'new') {
			setForm({
				...defaultFormState,
				...priorityDialog.data,
			});
		}
	}, [priorityDialog.data, priorityDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (priorityDialog.props.open) {
			initDialog();
		}
	}, [priorityDialog.props.open, initDialog]);

	function closeComposeDialog() {
		priorityDialog.type === 'edit'
			? dispatch(closeEditPriorityDialog())
			: dispatch(closeNewPriorityDialog())
	}

	function canBeSubmitted() {
		return (
			form.name.length > 2
		);
	}

	function handleSubmit(event) {
		event.preventDefault();

		if (priorityDialog.type === 'new') {
			dispatch(addPriority(form));
		} else {
			const changedValues = diff(priorityDialog.data, form)
			changedValues.id = form.id
			dispatch(updatePriority(changedValues));
		}
		closeComposeDialog();
	}

	return (
		<Dialog
			classes={{
				paper: 'm-24 rounded-8'
			}}
			{...priorityDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{priorityDialog.type === 'new' ? 'New Priority' : 'Edit Priority'}
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
								<InputColor
									initialValue={form.color}
									color={form.color}
        							onChange={ (color) => {setInForm("color", color.hex)} }
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
						{priorityDialog.type === 'new' ? 'Add' : 'Save'}
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

export default PriorityDialog;

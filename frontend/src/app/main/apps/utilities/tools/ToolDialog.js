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
	removeTool,
	updateTool,
	addTool,
	closeNewToolDialog,
	closeEditToolDialog,
} from './store/toolsSlice';

const defaultFormState = {
	name: '',
	description: '',
};

function ToolDialog(props) {
	const dispatch = useDispatch();
	const toolDialog = useSelector(({ toolsApp }) => toolsApp.tools.toolDialog);

	const { form, handleChange, setForm, setInForm } = useForm(defaultFormState);

	const initDialog = useCallback(() => {
		if (toolDialog.type === 'edit' && toolDialog.data) {
			setForm({ ...toolDialog.data });
		}

		if (toolDialog.type === 'new') {
			setForm({
				...defaultFormState,
				...toolDialog.data,
			});
		}
	}, [toolDialog.data, toolDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (toolDialog.props.open) {
			initDialog();
		}
	}, [toolDialog.props.open, initDialog]);

	function closeComposeDialog() {
		toolDialog.type === 'edit'
			? dispatch(closeEditToolDialog())
			: dispatch(closeNewToolDialog())
	}

	function canBeSubmitted() {
		return (
			form.name.length > 4
		);
	}

	function handleSubmit(event) {
		event.preventDefault();

		if (toolDialog.type === 'new') {
			dispatch(addTool(form));
		} else {
			const changedValues = diff(toolDialog.data, form)
			changedValues.id = form.id
			dispatch(updateTool(changedValues));
		}
		closeComposeDialog();
	}

	return (
		<Dialog
			classes={{
				paper: 'm-24 rounded-8'
			}}
			{...toolDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{toolDialog.type === 'new' ? 'New Tool' : 'Edit Tool'}
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
						{toolDialog.type === 'new' ? 'Add' : 'Save'}
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

export default ToolDialog;

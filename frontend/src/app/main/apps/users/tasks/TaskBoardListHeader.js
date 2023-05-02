import { useForm } from '@fuse/hooks';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { darken } from '@mui/material/styles';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function TaskBoardListHeader(props) {
	const [anchorEl, setAnchorEl] = useState(null);
	const [formOpen, setFormOpen] = useState(false);
	const { form, handleChange, resetForm, setForm } = useForm({
		title: props.list.name
	});


	useEffect(() => {
		if (!formOpen) {
			resetForm();
		}
	}, [formOpen, resetForm]);

	useEffect(() => {
		if (formOpen && anchorEl) {
			setAnchorEl(null);
		}
	}, [anchorEl, formOpen]);

	useEffect(() => {
		setForm({ title: props.list.name });
	}, [props.list.name, setForm]);

	function handleMenuClick(event) {
		setAnchorEl(event.currentTarget);
	}

	function handleMenuClose() {
		setAnchorEl(null);
	}

	function handleOpenForm(ev) {
		ev.stopPropagation();
		setFormOpen(true);
	}

	function handleCloseForm() {
		setFormOpen(false);
	}

	function isFormInvalid() {
		return form.title !== '';
	}

	function handleSubmit(ev) {
		ev.preventDefault();
		if (!isFormInvalid()) {
			return;
		}
		handleCloseForm();
	}

	return (
		<div {...props.handleProps}>
			<div className="flex items-center justify-between h-64 px-8">
				<div className="flex items-center min-w-0 px-12">
					{formOpen ? (
						<ClickAwayListener onClickAway={handleCloseForm}>
							<form className="flex w-full" onSubmit={handleSubmit}>
								<TextField
									name="title"
									value={form.title}
									onChange={handleChange}
									variant="outlined"
									margin="none"
									autoFocus
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton type="submit" disabled={!isFormInvalid()}>
													<Icon>check</Icon>
												</IconButton>
											</InputAdornment>
										)
									}}
								/>
							</form>
						</ClickAwayListener>
					) : (
						<Typography className="text-16 font-600 cursor-pointer" onClick={handleOpenForm}>
							{props.list.name}
						</Typography>
					)}
				</div>
				<div className="flex items-center">
					<Box
						className="flex items-center justify-center min-w-24 h-24 mx-4 text-sm font-semibold leading-24 rounded-full"
						sx={{
							backgroundColor: (theme) =>
								darken(
									theme.palette.background.default,
									theme.palette.mode === 'light' ? 0.1 : 0.3
								),
							color: 'text.secondary',
						}}
					>
						{props.list.idCards.length}
					</Box>

				</div>
			</div>
		</div>
	);
}

export default TaskBoardListHeader;

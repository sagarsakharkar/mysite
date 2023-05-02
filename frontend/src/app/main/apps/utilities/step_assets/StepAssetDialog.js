import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/utils/FuseUtils';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useCallback, useEffect } from 'react';
import diff from 'object-diff';
import { useDispatch, useSelector } from 'react-redux';
import {
	updateStepAsset,
	addStepAsset,
	closeNewStepAssetDialog,
	closeEditStepAssetDialog,
} from './store/stepAssetSlice';

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

const defaultFormState = {
	name: '',
	short_name: '',
	components: [],
};

function not(a, b) {
	return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
	return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
	return [...a, ...not(b, a)];
}

function StepAssetDialog(props) {
	const dispatch = useDispatch();
	const classes = useStyles();
	const stepAssetDialog = useSelector(({ stepAssetApp }) => stepAssetApp.stepAsset.stepAssetDialog);

	const { form, handleChange, setForm, setInForm } = useForm(defaultFormState);
	const items = [
		'pxy', 'gcha', 'review_mov', 'exr', 'tif', 'tex', 'png', 'abc', 'hi', 'ass', 'abc_source', 
		'review_img', 'scalp', 'dpx', 'xgen', 'mov', 'gpu', 'wav', 'geom', 'rigcrv', 'right', 'atom', 
		'fbx', 'psd', 'bhvr', 'gmo', '8bit', 'standin', 'jpg', 'package', 'source', 'navmesh', 'cache', 'left', 'proxy']

	const initDialog = useCallback(() => {
		if (stepAssetDialog.type === 'edit' && stepAssetDialog.data) {
			setForm({ ...stepAssetDialog.data });
		}

		if (stepAssetDialog.type === 'new') {
			setForm({
				...defaultFormState,
				...stepAssetDialog.data,
			});
		}
	}, [stepAssetDialog.data, stepAssetDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (stepAssetDialog.props.open) {
			initDialog();
		}
	}, [stepAssetDialog.props.open, initDialog]);

	function closeComposeDialog() {
		stepAssetDialog.type === 'edit'
			? dispatch(closeEditStepAssetDialog())
			: dispatch(closeNewStepAssetDialog())
	}

	function canBeSubmitted() {
		return (
			form.name.length > 1
		);
	}

	const handleToggleAll = (items) => () => {
		if (numberOfChecked(items) === items.length) {
			setInForm("components", not(form.components, items));
		} else {
			setInForm("components", union(form.components, items));
		}
	};

	const numberOfChecked = (items) => intersection(form.components, items).length;

	const handleToggle = (value) => () => {
		const currentIndex = form.components.indexOf(value);
		const newChecked = [...form.components];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setInForm("components", newChecked);
	};

	function handleSubmit(event) {
		event.preventDefault();

		if (stepAssetDialog.type === 'new') {
			dispatch(addStepAsset(form));
		} else {
			const changedValues = diff(stepAssetDialog.data, form)
			changedValues.id = form.id
			dispatch(updateStepAsset(changedValues));
		}
		closeComposeDialog();
	}

	return (
		<Dialog
			classes={{
				paper: 'm-24 rounded-8'
			}}
			{...stepAssetDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{stepAssetDialog.type === 'new' ? 'New StepAsset' : 'Edit StepAsset'}
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
								label="Short Name"
								id="short_name"
								name="short_name"
								value={form.short_name}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
						</div>

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
									title={`Components (${numberOfChecked(items)}/${items.length} selected)`}
									subheader={
										<p>{form.components.join(', ')}</p>
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
														checked={form.components.indexOf(value) !== -1}
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
						{stepAssetDialog.type === 'new' ? 'Add' : 'Save'}
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

export default StepAssetDialog;
